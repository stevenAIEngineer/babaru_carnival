/**
 * Babaru Cloud API Service
 * Handles communication with the Babaru backend for chat and TTS
 * @author Steven Lansangan
 */

const BABARU_API_URL = 'https://babaru-regime-production.up.railway.app'

export interface ChatRequest {
    user_id: string
    message: string
    context: string
}

export interface ChatResponse {
    response: string
    audio_base64: string
}

/**
 * Send a message to Babaru and get a response with audio
 */
export async function sendMessageToBabaru(
    userId: string,
    message: string,
    context: string = 'CONTEXT_GENERAL'
): Promise<ChatResponse> {
    const response = await fetch(`${BABARU_API_URL}/v1/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            message,
            context,
        } as ChatRequest),
    })

    if (!response.ok) {
        throw new Error(`Babaru API error: ${response.status}`)
    }

    return response.json()
}

/**
 * Get or create a unique user ID for this browser
 */
export function getUserId(): string {
    const storageKey = 'babaru-user-id'
    let userId = localStorage.getItem(storageKey)

    if (!userId) {
        userId = `web-${crypto.randomUUID()}`
        localStorage.setItem(storageKey, userId)
    }

    return userId
}

/**
 * Get context based on current page
 */
export function getContextFromPath(pathname: string): string {
    switch (pathname) {
        case '/':
            return 'CONTEXT_HOME'
        case '/comics':
            return 'CONTEXT_COMICS'
        case '/about':
            return 'CONTEXT_ABOUT'
        case '/community':
            return 'CONTEXT_COMMUNITY'
        default:
            return 'CONTEXT_GENERAL'
    }
}
