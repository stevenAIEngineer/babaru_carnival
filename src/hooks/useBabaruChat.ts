import { useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { sendMessageToBabaru, getUserId, getContextFromPath } from '../services/babaruApi'
import { useAudioVisualizer } from './useAudioVisualizer'

interface Message {
    role: 'user' | 'babaru'
    content: string
    timestamp: Date
}

interface UseBabaruChatReturn {
    // State
    messages: Message[]
    isLoading: boolean
    error: string | null
    isMuted: boolean

    // Audio
    isPlaying: boolean
    amplitude: number

    // Actions
    sendMessage: (message: string) => Promise<void>
    clearMessages: () => void
    toggleMute: () => void
}

/**
 * Hook for managing Babaru chat state and audio
 */
export function useBabaruChat(): UseBabaruChatReturn {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isMuted, setIsMuted] = useState(() => {
        // Persist mute preference in localStorage
        return localStorage.getItem('babaru-muted') === 'true'
    })

    const location = useLocation()
    const { isPlaying, amplitude, playAudio, stopAudio } = useAudioVisualizer()

    const toggleMute = useCallback(() => {
        setIsMuted(prev => {
            const newValue = !prev
            localStorage.setItem('babaru-muted', String(newValue))
            if (newValue && isPlaying) {
                stopAudio()
            }
            return newValue
        })
    }, [isPlaying, stopAudio])

    const sendMessage = useCallback(async (message: string) => {
        if (!message.trim() || isLoading) return

        setIsLoading(true)
        setError(null)

        // Add user message
        const userMessage: Message = {
            role: 'user',
            content: message,
            timestamp: new Date(),
        }
        setMessages(prev => [...prev, userMessage])

        try {
            const userId = getUserId()
            const context = getContextFromPath(location.pathname)

            const response = await sendMessageToBabaru(userId, message, context)

            // Add Babaru's response
            const babaruMessage: Message = {
                role: 'babaru',
                content: response.response,
                timestamp: new Date(),
            }
            setMessages(prev => [...prev, babaruMessage])

            // Play audio if available and not muted
            if (response.audio_base64 && !isMuted) {
                await playAudio(response.audio_base64)
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to reach Babaru'
            setError(errorMessage)

            // Add error message from Babaru
            const errorResponse: Message = {
                role: 'babaru',
                content: "Oops! My brain is taking a coffee break. Try again? ☕",
                timestamp: new Date(),
            }
            setMessages(prev => [...prev, errorResponse])
        } finally {
            setIsLoading(false)
        }
    }, [isLoading, isMuted, location.pathname, playAudio])

    const clearMessages = useCallback(() => {
        setMessages([])
        setError(null)
    }, [])

    return {
        messages,
        isLoading,
        error,
        isMuted,
        isPlaying,
        amplitude,
        sendMessage,
        clearMessages,
        toggleMute,
    }
}
