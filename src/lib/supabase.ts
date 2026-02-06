/**
 * Supabase Client Configuration
 * @author Steven Lansangan
 */
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase credentials not configured. Using mock data.')
}

export const supabase = createClient<Database>(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
)

/**
 * Check if Supabase is properly configured
 */
export const isSupabaseConfigured = () => {
    return !!(supabaseUrl && supabaseAnonKey)
}

/**
 * Get public URL for a storage file
 */
export const getStorageUrl = (bucket: string, path: string) => {
    if (!isSupabaseConfigured()) return null
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
}

/**
 * Storage bucket names
 */
export const STORAGE_BUCKETS = {
    ASSETS: 'babaru-assets',
    VIDEOS: 'comic-videos',
    THUMBNAILS: 'comic-thumbnails',
    USER_UPLOADS: 'user-uploads',
} as const
