import { motion } from 'framer-motion'
import HeroSection from '../components/hero/HeroSection'
import ComicRow from '../components/comics/ComicRow'
import PlayerModal from '../components/comics/PlayerModal'
import { comicRows, Comic } from '../data/comics'
import { useState, useEffect } from 'react'
import { useEasterEggs } from '../hooks/useEasterEggs'

export default function Home() {
    const [selectedComic, setSelectedComic] = useState<Comic | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { unlockEgg } = useEasterEggs()

    // Track page visits for easter egg (session-only)
    useEffect(() => {
        const visitedPages = JSON.parse(sessionStorage.getItem('babaru-visited-pages') || '[]')
        if (!visitedPages.includes('home')) {
            visitedPages.push('home')
            sessionStorage.setItem('babaru-visited-pages', JSON.stringify(visitedPages))
        }

        // Check if all pages visited
        if (visitedPages.length >= 4) {
            unlockEgg('explorer')
        }
    }, [unlockEgg])

    // Keyboard handler for modal
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
        >
            {/* Hero Section */}
            <HeroSection />

            {/* Featured Comic Rows */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-vintage-ink mb-2">
                            📺 Now Showing
                        </h2>
                        <p className="text-vintage-sepia">
                            "The chaos never stops! (Neither does the artist's caffeine intake.)" — Babaru
                        </p>
                    </motion.div>
                </div>

                {/* Show first 3 rows on home page */}
                {comicRows.slice(0, 3).map((row, index) => (
                    <motion.div
                        key={row.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                    >
                        <ComicRow row={row} onComicClick={handleComicClick} />
                    </motion.div>
                ))}

                {/* View All CTA */}
                <div className="flex justify-center mt-8">
                    <motion.a
                        href="/comics"
                        className="btn-purple"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        📺 View All Comics →
                    </motion.a>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-gradient-to-br from-babaru-purple/10 to-babaru-pink/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-6xl mb-4 inline-block">🎪</span>
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-vintage-ink mb-4">
                            Join the Carnival!
                        </h2>
                        <p className="text-vintage-sepia text-lg mb-8 max-w-2xl mx-auto">
                            "You're not just watching. You're becoming a Citizen.
                            That means accountability, inside jokes, and occasional existential wisdom.
                            Welcome to the chaos." — Babaru
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="/about"
                                className="btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                🎭 Learn More About Babaru
                            </motion.a>
                            <motion.a
                                href="/community"
                                className="btn-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                🎪 Explore the Carnival
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Player Modal */}
            <PlayerModal
                comic={selectedComic}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </motion.div>
    )
}
