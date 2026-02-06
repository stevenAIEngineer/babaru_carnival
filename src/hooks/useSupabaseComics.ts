import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Comic, ComicRow as DBComicRow } from '../lib/database.types'
import { comics as mockComics, comicRows as mockComicRows, type Comic as MockComic, type ComicRow as MockComicRow } from '../data/comics'

interface ComicRowWithComics extends DBComicRow {
    comics: Comic[]
}

interface UseSupabaseComicsReturn {
    comics: Comic[] | MockComic[]
    comicRows: ComicRowWithComics[] | MockComicRow[]
    isLoading: boolean
    error: string | null
    refetch: () => Promise<void>
    isUsingMockData: boolean
}

/**
 * Hook for fetching comics from Supabase
 * Falls back to mock data if Supabase is not configured
 */
export function useSupabaseComics(): UseSupabaseComicsReturn {
    const [comics, setComics] = useState<Comic[] | MockComic[]>([])
    const [comicRows, setComicRows] = useState<ComicRowWithComics[] | MockComicRow[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isUsingMockData, setIsUsingMockData] = useState(!isSupabaseConfigured())

    const fetchFromSupabase = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            // Fetch all comics
            const { data: comicsData, error: comicsError } = await supabase
                .from('comics')
                .select('*')
                .order('created_at', { ascending: false })

            if (comicsError) throw comicsError

            // Fetch comic rows with their items
            const { data: rowsData, error: rowsError } = await supabase
                .from('comic_rows')
                .select(`
          *,
          comic_row_items (
            comic_id,
            order
          )
        `)
                .order('order', { ascending: true })

            if (rowsError) throw rowsError

            // Map rows to include full comic objects
            const rowsWithComics: ComicRowWithComics[] = (rowsData || []).map(row => ({
                ...row,
                comics: (row.comic_row_items || [])
                    .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
                    .map((item: { comic_id: string }) =>
                        comicsData?.find(c => c.id === item.comic_id)
                    )
                    .filter(Boolean) as Comic[]
            }))

            setComics(comicsData || [])
            setComicRows(rowsWithComics)
            setIsUsingMockData(false)

        } catch (err) {
            console.error('Supabase fetch error:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch comics')
            // Fall back to mock data on error
            useMockData()
        } finally {
            setIsLoading(false)
        }
    }, [])

    const useMockData = useCallback(() => {
        setComics(mockComics)
        setComicRows(mockComicRows)
        setIsUsingMockData(true)
        setIsLoading(false)
    }, [])

    const refetch = useCallback(async () => {
        if (isSupabaseConfigured()) {
            await fetchFromSupabase()
        } else {
            useMockData()
        }
    }, [fetchFromSupabase, useMockData])

    useEffect(() => {
        if (isSupabaseConfigured()) {
            fetchFromSupabase()
        } else {
            console.log('📦 Supabase not configured, using mock data')
            useMockData()
        }
    }, [fetchFromSupabase, useMockData])

    return {
        comics,
        comicRows,
        isLoading,
        error,
        refetch,
        isUsingMockData,
    }
}

/**
 * Hook for fetching a single comic by slug
 */
export function useComic(slug: string) {
    const [comic, setComic] = useState<Comic | MockComic | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true)

            if (!isSupabaseConfigured()) {
                const found = mockComics.find(c => c.id === slug || c.title.toLowerCase().replace(/\s+/g, '-') === slug)
                setComic(found || null)
                setIsLoading(false)
                return
            }

            try {
                const { data, error: fetchError } = await supabase
                    .from('comics')
                    .select('*')
                    .eq('slug', slug)
                    .single()

                if (fetchError) throw fetchError
                setComic(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Comic not found')
            } finally {
                setIsLoading(false)
            }
        }

        fetch()
    }, [slug])

    return { comic, isLoading, error }
}
