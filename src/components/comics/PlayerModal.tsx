import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Player } from '@remotion/player'
import { Comic } from '../../data/comics'
import { BabaruIntro } from '../../remotion/Intro/BabaruIntro'

interface PlayerModalProps {
    comic: Comic | null
    isOpen: boolean
    onClose: () => void
}

export default function PlayerModal({ comic, isOpen, onClose }: PlayerModalProps) {
    const [isPlaying, setIsPlaying] = useState(false)

    if (!comic) return null

    const isIntroComic = comic.fullCompositionId === 'BabaruIntro'

    const statusMessages = {
        IN_PRODUCTION: "🔨 This comic is currently in production! Check back soon for the full experience!",
        COMING_SOON: "🎬 Coming soon! We're working hard to bring this to you!",
        RELEASED: "▶️ Enjoy the show!",
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-vintage-ink/90 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 
                       rounded-vintage-xl p-6 md:p-8 border-8 border-vintage-ink shadow-vintage-xl
                       max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        {/* Close Button */}
                        <motion.button
                            className="absolute top-4 right-4 w-10 h-10 rounded-full 
                         bg-vintage-paper border-3 border-vintage-ink shadow-vintage
                         flex items-center justify-center font-bold text-xl
                         hover:bg-babaru-pink transition-colors z-10"
                            onClick={onClose}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ✕
                        </motion.button>

                        {/* Player Area */}
                        <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-vintage-lg p-4">
                            <div className="rounded-vintage overflow-hidden border-4 border-vintage-ink relative aspect-video">
                                {/* Scan lines */}
                                <div
                                    className="absolute inset-0 pointer-events-none z-10 opacity-10"
                                    style={{
                                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                                    }}
                                />

                                {/* Content */}
                                {isIntroComic ? (
                                    <Player
                                        component={BabaruIntro}
                                        compositionWidth={1920}
                                        compositionHeight={1080}
                                        durationInFrames={210}
                                        fps={30}
                                        autoPlay={true}
                                        loop={false}
                                        controls={true}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                ) : comic.status !== 'RELEASED' ? (
                                    <div className="relative z-0 w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-babaru-cream to-babaru-cream-dark">
                                        <img
                                            src={comic.thumbnailUrl}
                                            alt={comic.title}
                                            className="w-32 h-32 rounded-vintage-lg border-4 border-vintage-ink mb-4 object-cover"
                                        />
                                        <motion.div
                                            className="bg-amber-400 text-vintage-ink px-6 py-3 rounded-vintage
                                   border-4 border-vintage-ink shadow-vintage font-display font-bold text-xl mb-4"
                                            animate={{ rotate: [-2, 2, -2] }}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                        >
                                            {comic.status === 'IN_PRODUCTION' ? '🔨 IN PRODUCTION' : '🎬 COMING SOON'}
                                        </motion.div>
                                        <p className="text-vintage-sepia max-w-md">
                                            {statusMessages[comic.status]}
                                        </p>
                                        <p className="text-vintage-sepia/70 text-sm mt-4 italic">
                                            {comic.productionNotes}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="relative z-0 w-full h-full flex flex-col items-center justify-center p-8 text-center bg-black">
                                        <motion.button
                                            className="bg-babaru-purple text-white px-8 py-4 rounded-vintage
                                 border-4 border-vintage-ink shadow-vintage font-display font-bold text-xl"
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                                        </motion.button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <motion.button
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 
                           border-4 border-gray-700 shadow-lg"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            />
                            <motion.div
                                className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-gray-700"
                                animate={{
                                    boxShadow: ['0 0 10px #10B981', '0 0 20px #10B981', '0 0 10px #10B981'],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.button
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 
                           border-4 border-gray-700 shadow-lg"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            />
                        </div>

                        {/* Comic Info */}
                        <div className="mt-6 p-4 bg-vintage-paper rounded-vintage-lg border-3 border-vintage-ink">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <h2 className="font-display font-bold text-2xl text-vintage-ink">
                                        {comic.title}
                                    </h2>
                                    <p className="text-vintage-sepia mt-2">{comic.description}</p>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {comic.genre.map((genre) => (
                                            <span
                                                key={genre}
                                                className="bg-babaru-blue/20 text-babaru-blue-dark px-3 py-1 
                                 rounded-full text-sm font-semibold"
                                            >
                                                {genre}
                                            </span>
                                        ))}
                                        {comic.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-babaru-pink/20 text-vintage-ink px-3 py-1 
                                 rounded-full text-sm"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-2xl">
                                        ⭐ <span className="font-display font-bold">{comic.rating}</span>
                                    </div>
                                    <p className="text-vintage-sepia text-sm">by {comic.author}</p>
                                </div>
                            </div>
                        </div>

                        {/* Keyboard hint */}
                        <p className="text-center text-gray-400 text-sm mt-4">
                            Press <kbd className="bg-gray-600 px-2 py-1 rounded">ESC</kbd> to close
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

