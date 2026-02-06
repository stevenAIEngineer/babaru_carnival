import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface VintageTVFrameProps {
    children: ReactNode
    showDials?: boolean
}

export default function VintageTVFrame({ children, showDials = true }: VintageTVFrameProps) {
    return (
        <div className="relative">
            {/* TV Frame */}
            <motion.div
                className="relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 
                   rounded-vintage-xl p-4 md:p-6 border-8 border-vintage-ink shadow-vintage-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                {/* Screen bezel */}
                <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-vintage-lg p-3 md:p-4">
                    {/* Actual screen */}
                    <div className="bg-gradient-to-br from-babaru-cream to-babaru-cream-dark rounded-vintage 
                          overflow-hidden border-4 border-vintage-ink relative">
                        {/* Scan lines effect */}
                        <div
                            className="absolute inset-0 pointer-events-none z-10 opacity-10"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                            }}
                        />

                        {/* Vignette effect */}
                        <div
                            className="absolute inset-0 pointer-events-none z-10"
                            style={{
                                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
                            }}
                        />

                        {/* Content */}
                        <div className="relative z-0 p-4 md:p-6 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                            {children}
                        </div>
                    </div>
                </div>

                {/* TV Controls */}
                {showDials && (
                    <div className="flex items-center justify-center gap-4 mt-4">
                        {/* Channel dial */}
                        <motion.button
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 
                         border-4 border-gray-700 shadow-lg cursor-pointer
                         flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 30 }}
                            whileTap={{ scale: 0.95, rotate: 90 }}
                            title="Channel dial"
                        >
                            <div className="w-1 h-4 bg-gray-800 rounded-full transform -translate-y-1" />
                        </motion.button>

                        {/* Power indicator */}
                        <motion.div
                            className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-gray-700"
                            animate={{
                                boxShadow: ['0 0 10px #10B981', '0 0 20px #10B981', '0 0 10px #10B981'],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Volume dial */}
                        <motion.button
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 
                         border-4 border-gray-700 shadow-lg cursor-pointer
                         flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: -30 }}
                            whileTap={{ scale: 0.95, rotate: -90 }}
                            title="Volume dial"
                        >
                            <div className="w-1 h-4 bg-gray-800 rounded-full" />
                        </motion.button>
                    </div>
                )}

                {/* Brand label */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    <motion.span
                        className="text-xs font-display font-bold text-gray-400 tracking-widest"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        BABARU-VISION
                    </motion.span>
                </div>
            </motion.div>

            {/* TV Stand/Legs */}
            <div className="flex justify-center gap-16 -mt-1">
                <div className="w-4 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg border-2 border-t-0 border-vintage-ink" />
                <div className="w-4 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg border-2 border-t-0 border-vintage-ink" />
            </div>
        </div>
    )
}
