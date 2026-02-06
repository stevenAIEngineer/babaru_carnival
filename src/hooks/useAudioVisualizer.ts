import { useState, useRef, useCallback, useEffect } from 'react'

interface AudioVisualizerState {
    isPlaying: boolean
    amplitude: number // 0-1 normalized amplitude
}

/**
 * Hook for playing audio and extracting real-time amplitude for animations
 */
export function useAudioVisualizer() {
    const [state, setState] = useState<AudioVisualizerState>({
        isPlaying: false,
        amplitude: 0,
    })

    const audioContextRef = useRef<AudioContext | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const sourceRef = useRef<AudioBufferSourceNode | null>(null)
    const animationFrameRef = useRef<number>(0)
    const dataArrayRef = useRef<Uint8Array | null>(null)

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
            if (audioContextRef.current) {
                audioContextRef.current.close()
            }
        }
    }, [])

    /**
     * Analyze amplitude at 60fps and update state
     */
    const analyzeAmplitude = useCallback(() => {
        if (!analyserRef.current || !dataArrayRef.current) return

        analyserRef.current.getByteTimeDomainData(dataArrayRef.current)

        // Calculate RMS amplitude
        let sum = 0
        for (let i = 0; i < dataArrayRef.current.length; i++) {
            const value = (dataArrayRef.current[i] - 128) / 128
            sum += value * value
        }
        const rms = Math.sqrt(sum / dataArrayRef.current.length)

        // Normalize and smooth (0-1 range, boosted for visibility)
        const normalized = Math.min(1, rms * 3)

        setState(prev => ({
            ...prev,
            amplitude: normalized,
        }))

        animationFrameRef.current = requestAnimationFrame(analyzeAmplitude)
    }, [])

    /**
     * Play audio from base64 string and analyze for animation
     */
    const playAudio = useCallback(async (base64Audio: string) => {
        try {
            // Create audio context if needed
            if (!audioContextRef.current) {
                audioContextRef.current = new AudioContext()
            }

            const audioContext = audioContextRef.current

            // Resume if suspended (browser autoplay policy)
            if (audioContext.state === 'suspended') {
                await audioContext.resume()
            }

            // Decode base64 to ArrayBuffer
            const binaryString = atob(base64Audio)
            const bytes = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i)
            }

            // Create a proper ArrayBuffer copy to satisfy TypeScript
            const arrayBuffer = bytes.buffer.slice(0) as ArrayBuffer

            // Decode audio data
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

            // Stop any currently playing audio
            if (sourceRef.current) {
                sourceRef.current.stop()
            }

            // Create source and analyser
            const source = audioContext.createBufferSource()
            source.buffer = audioBuffer

            const analyser = audioContext.createAnalyser()
            analyser.fftSize = 256
            analyser.smoothingTimeConstant = 0.8

            analyserRef.current = analyser
            sourceRef.current = source
            dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)

            // Connect: source → analyser → destination
            source.connect(analyser)
            analyser.connect(audioContext.destination)

            // Start playback
            setState(prev => ({ ...prev, isPlaying: true }))
            source.start(0)

            // Start amplitude analysis
            analyzeAmplitude()

            // Cleanup when finished
            source.onended = () => {
                setState({ isPlaying: false, amplitude: 0 })
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current)
                }
            }

        } catch (error) {
            console.error('Audio playback error:', error)
            setState({ isPlaying: false, amplitude: 0 })
        }
    }, [analyzeAmplitude])

    /**
     * Stop audio playback
     */
    const stopAudio = useCallback(() => {
        if (sourceRef.current) {
            sourceRef.current.stop()
        }
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
        }
        setState({ isPlaying: false, amplitude: 0 })
    }, [])

    return {
        isPlaying: state.isPlaying,
        amplitude: state.amplitude,
        playAudio,
        stopAudio,
    }
}
