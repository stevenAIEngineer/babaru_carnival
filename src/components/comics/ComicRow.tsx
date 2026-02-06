import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Comic, ComicRow as ComicRowType } from '../../data/comics'
import ComicCard from './ComicCard'

interface ComicRowProps {
    row: ComicRowType
    onComicClick: (comic: Comic) => void
}

export default function ComicRow({ row, onComicClick }: ComicRowProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            })
        }
    }

    return (
        <section className="py-6">
            {/* Row Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl">{row.emoji}</span>
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-vintage-ink">
                        {row.title}
                    </h2>
                </div>
                <p className="text-vintage-sepia mt-1 italic">
                    "{row.subtitle}"
                </p>
            </div>

            {/* Scrollable Row */}
            <div className="relative group">
                {/* Left Arrow */}
                {canScrollLeft && (
                    <motion.button
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                       w-12 h-12 rounded-full bg-vintage-ink/80 text-white
                       flex items-center justify-center
                       opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => scroll('left')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        ←
                    </motion.button>
                )}

                {/* Right Arrow */}
                {canScrollRight && (
                    <motion.button
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                       w-12 h-12 rounded-full bg-vintage-ink/80 text-white
                       flex items-center justify-center
                       opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => scroll('right')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        →
                    </motion.button>
                )}

                {/* Cards Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4
                     scroll-smooth snap-x snap-mandatory"
                    onScroll={checkScroll}
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {row.comics.map((comic, index) => (
                        <motion.div
                            key={comic.id}
                            className="flex-shrink-0 snap-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ComicCard comic={comic} onClick={() => onComicClick(comic)} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
