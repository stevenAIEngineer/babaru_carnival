import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ComicRow from '../components/comics/ComicRow'
import PlayerModal from '../components/comics/PlayerModal'
import { comicRows, Comic } from '../data/comics'
import { useEasterEggs } from '../hooks/useEasterEggs'

export default function Comics() {
    const [selectedComic, setSelectedComic] = useState<Comic | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { unlockEgg } = useEasterEggs()

    // Track page visits (session-only)
    useEffect(() => {
        const visitedPages = JSON.parse(sessionStorage.getItem('babaru-visited-pages') || '[]')
        if (!visitedPages.includes('comics')) {
            visitedPages.push('comics')
            sessionStorage.setItem('babaru-visited-pages', JSON.stringify(visitedPages))
        }
        if (visitedPages.length >= 4) {
            unlockEgg('explorer')
        }
    }, [unlockEgg])

    // Keyboard handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isModalOpen) {
                setIsModalOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isModalOpen])

    const handleComicClick = (comic: Comic) => {
        setSelectedComic(comic)
        setIsModalOpen(true)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-8"
        >
            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl">📺</span>
                        <div>
                            <h1 className="font-display font-bold text-4xl md:text-5xl text-vintage-ink">
                                Comics
                            </h1>
                            <p className="text-vintage-sepia text-lg">
                                "My entire library of chaos. You're welcome." — Babaru
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        <div className="bg-white/60 backdrop-blur-sm rounded-vintage px-4 py-2 border-2 border-vintage-ink/20">
                            <span className="font-display font-bold text-babaru-purple">
                                {comicRows.reduce((acc, row) => acc + row.comics.length, 0)}
                            </span>
                            <span className="text-vintage-sepia ml-2">Total Comics</span>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-vintage px-4 py-2 border-2 border-vintage-ink/20">
                            <span className="font-display font-bold text-amber-500">
                                {comicRows.find(r => r.id === 'on-air')?.comics.length || 0}
                            </span>
                            <span className="text-vintage-sepia ml-2">In Production</span>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-vintage px-4 py-2 border-2 border-vintage-ink/20">
                            <span className="font-display font-bold text-babaru-blue">
                                {comicRows.length}
                            </span>
                            <span className="text-vintage-sepia ml-2">Categories</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* All Comic Rows */}
            {comicRows.map((row, index) => (
                <motion.div
                    key={row.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <ComicRow row={row} onComicClick={handleComicClick} />
                </motion.div>
            ))}

            {/* Bottom CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <motion.div
                    className="bg-gradient-to-br from-babaru-purple/20 to-babaru-pink/20 
                     rounded-vintage-xl p-8 border-4 border-vintage-ink/20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-4xl">🎬</span>
                    <h3 className="font-display font-bold text-2xl text-vintage-ink mt-4">
                        More Coming Soon!
                    </h3>
                    <p className="text-vintage-sepia mt-2 max-w-md mx-auto">
                        "The artist needs sleep sometimes. Allegedly. I'm pushing for 24/7 production
                        but they keep talking about 'boundaries' and 'human limits.' Weak."
                    </p>
                </motion.div>
            </div>

            {/* Player Modal */}
            <PlayerModal
                comic={selectedComic}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </motion.div>
    )
}
