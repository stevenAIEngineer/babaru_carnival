import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Comic } from '../../data/comics'
import { getProductionComment } from '../../data/babaruComments'

interface ComicCardProps {
    comic: Comic
    onClick: () => void
}

export default function ComicCard({ comic, onClick }: ComicCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [hoverComment] = useState(() => getProductionComment())

    const statusColors = {
        IN_PRODUCTION: 'bg-amber-400 text-vintage-ink',
        COMING_SOON: 'bg-babaru-purple text-white',
        RELEASED: 'bg-emerald-500 text-white',
    }

    const statusLabels = {
        IN_PRODUCTION: '🔨 In Production',
        COMING_SOON: '🎬 Coming Soon',
        RELEASED: '▶️ Watch Now',
    }

    return (
        <motion.div
            className="relative w-64 md:w-72 cursor-pointer group"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
            whileHover={{ scale: 1.05, y: -8, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            {/* Card Frame */}
            <div className="bg-vintage-paper rounded-vintage-lg border-4 border-vintage-ink 
                      shadow-vintage-lg overflow-hidden relative">
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={comic.thumbnailUrl}
                        alt={comic.title}
                        className="w-full h-full object-cover transition-transform duration-300
                       group-hover:scale-110"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-vintage-ink/80 via-transparent to-transparent" />

                    {/* Grain texture */}
                    <div
                        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                        <motion.span
                            className={`inline-flex items-center px-3 py-1 rounded-full 
                         font-display font-bold text-xs border-2 border-vintage-ink
                         ${statusColors[comic.status]}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                        >
                            {statusLabels[comic.status]}
                        </motion.span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-3 right-3">
                        <span className="bg-vintage-ink/80 text-white px-2 py-1 rounded-full 
                           text-xs font-bold flex items-center gap-1">
                            ⭐ {comic.rating}
                        </span>
                    </div>

                    {/* Genre Tags */}
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                        {comic.genre.slice(0, 2).map((genre) => (
                            <span
                                key={genre}
                                className="bg-babaru-pink/90 text-vintage-ink px-2 py-0.5 rounded-full 
                         text-xs font-semibold"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-display font-bold text-lg text-vintage-ink line-clamp-1">
                        {comic.title}
                    </h3>
                    <p className="text-vintage-sepia text-sm mt-1 line-clamp-2">
                        {comic.description}
                    </p>

                    {/* Series info if applicable */}
                    {comic.series && (
                        <p className="text-babaru-purple text-xs font-semibold mt-2">
                            Season {comic.series.seasonNumber} • Episode {comic.series.episodeNumber}/{comic.series.totalEpisodes}
                        </p>
                    )}
                </div>
            </div>

            {/* Hover Popup - Babaru's Comment */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-20
                       bg-white rounded-vintage-lg border-3 border-vintage-ink shadow-vintage
                       px-4 py-3 max-w-xs"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    >
                        <p className="text-sm text-vintage-ink font-body">
                            {comic.productionNotes || hoverComment}
                        </p>
                        {/* Tail */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2
                          w-0 h-0 border-l-8 border-r-8 border-t-8
                          border-l-transparent border-r-transparent border-t-vintage-ink" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
