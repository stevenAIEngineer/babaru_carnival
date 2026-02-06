import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { getUserId } from './babaruApi'

type EventType =
    | 'page_view'
    | 'comic_view'
    | 'comic_play'
    | 'comic_complete'
    | 'chat_message'
    | 'easter_egg_found'
    | 'mute_toggle'
    | 'share'

interface TrackEventOptions {
    eventType: EventType
    comicId?: string
    metadata?: Record<string, unknown>
}

/**
 * Track an analytics event
 * Silently fails if Supabase is not configured
 */
export async function trackEvent({ eventType, comicId, metadata = {} }: TrackEventOptions): Promise<void> {
    if (!isSupabaseConfigured()) {
        // Log to console in dev mode
        if (import.meta.env.DEV) {
            console.log('📊 Analytics (mock):', eventType, { comicId, metadata })
        }
        return
    }

    try {
        const userId = getUserId()

        await supabase.from('analytics_events').insert({
            event_type: eventType,
            comic_id: comicId || null,
            user_id: userId,
            metadata: {
                ...metadata,
                url: window.location.pathname,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
            } as Record<string, string>,
        })
    } catch (error) {
        // Silently fail - analytics should never break the app
        console.warn('Analytics error:', error)
    }
}

/**
 * Track a page view
 */
export function trackPageView(pageName: string): void {
    trackEvent({
        eventType: 'page_view',
        metadata: { page: pageName },
    })
}

/**
 * Track comic interaction
 */
export function trackComicView(comicId: string, title: string): void {
    trackEvent({
        eventType: 'comic_view',
        comicId,
        metadata: { title },
    })
}

/**
 * Track comic playback
 */
export function trackComicPlay(comicId: string, title: string): void {
    trackEvent({
        eventType: 'comic_play',
        comicId,
        metadata: { title },
    })
}

/**
 * Track easter egg discovery
 */
export function trackEasterEgg(eggId: string, eggName: string): void {
    trackEvent({
        eventType: 'easter_egg_found',
        metadata: { eggId, eggName },
    })
}

/**
 * Track chat message sent
 */
export function trackChatMessage(): void {
    trackEvent({
        eventType: 'chat_message',
    })
}
