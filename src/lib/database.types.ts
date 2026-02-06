/**
 * Supabase Database Types
 * @author Steven Lansangan
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type ComicStatus = 'RELEASED' | 'PRODUCTION' | 'COMING_SOON' | 'PLANNED'

export interface Database {
    public: {
        Tables: {
            comics: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    description: string
                    tagline: string | null
                    status: ComicStatus
                    thumbnail_url: string | null
                    video_url: string | null
                    duration: number | null
                    genres: string[]
                    rating: number
                    release_date: string | null
                    production_note: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    title: string
                    slug: string
                    description?: string
                    tagline?: string | null
                    status?: ComicStatus
                    thumbnail_url?: string | null
                    video_url?: string | null
                    duration?: number | null
                    genres?: string[]
                    rating?: number
                    release_date?: string | null
                    production_note?: string | null
                }
                Update: {
                    title?: string
                    slug?: string
                    description?: string
                    tagline?: string | null
                    status?: ComicStatus
                    thumbnail_url?: string | null
                    video_url?: string | null
                    duration?: number | null
                    genres?: string[]
                    rating?: number
                    release_date?: string | null
                    production_note?: string | null
                }
                Relationships: []
            }
            comic_rows: {
                Row: {
                    id: string
                    title: string
                    emoji: string
                    subtitle: string
                    order: number
                    created_at: string
                }
                Insert: {
                    title: string
                    emoji?: string
                    subtitle?: string
                    order?: number
                }
                Update: {
                    title?: string
                    emoji?: string
                    subtitle?: string
                    order?: number
                }
                Relationships: []
            }
            comic_row_items: {
                Row: {
                    id: string
                    row_id: string
                    comic_id: string
                    order: number
                }
                Insert: {
                    row_id: string
                    comic_id: string
                    order?: number
                }
                Update: {
                    row_id?: string
                    comic_id?: string
                    order?: number
                }
                Relationships: []
            }
            analytics_events: {
                Row: {
                    id: string
                    event_type: string
                    comic_id: string | null
                    user_id: string | null
                    metadata: Json
                    created_at: string
                }
                Insert: {
                    event_type: string
                    comic_id?: string | null
                    user_id?: string | null
                    metadata?: Json
                }
                Update: {
                    event_type?: string
                    comic_id?: string | null
                    user_id?: string | null
                    metadata?: Json
                }
                Relationships: []
            }
            assets: {
                Row: {
                    id: string
                    name: string
                    bucket: string
                    path: string
                    public_url: string
                    mime_type: string | null
                    size_bytes: number | null
                    created_at: string
                }
                Insert: {
                    name: string
                    bucket: string
                    path: string
                    public_url: string
                    mime_type?: string | null
                    size_bytes?: number | null
                }
                Update: {
                    name?: string
                    bucket?: string
                    path?: string
                    public_url?: string
                    mime_type?: string | null
                    size_bytes?: number | null
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

// Convenience types
export type Comic = Database['public']['Tables']['comics']['Row']
export type ComicRow = Database['public']['Tables']['comic_rows']['Row']
export type ComicRowItem = Database['public']['Tables']['comic_row_items']['Row']
export type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Row']
export type Asset = Database['public']['Tables']['assets']['Row']
