import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const navLinks = [
    { path: '/', label: '🏠 Home' },
    { path: '/comics', label: '📺 Comics' },
    { path: '/about', label: '🎭 About' },
    { path: '/community', label: '🎪 Community' },
]

export default function Navbar() {
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 bg-vintage-paper/95 backdrop-blur-sm border-b-4 border-vintage-ink">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.div
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-babaru-blue border-4 border-vintage-ink shadow-vintage flex items-center justify-center overflow-hidden"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-xl md:text-2xl">🎪</span>
                        </motion.div>
                        <div className="hidden sm:block">
                            <h1 className="font-display font-bold text-xl md:text-2xl text-vintage-ink">
                                Babaru
                            </h1>
                            <p className="text-xs text-vintage-sepia -mt-1">Comic Hub</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path
                            return (
                                <Link key={link.path} to={link.path}>
                                    <motion.button
                                        className={`px-4 py-2 rounded-vintage font-display font-semibold text-sm
                      border-3 border-vintage-ink transition-colors
                      ${isActive
                                                ? 'bg-babaru-purple text-white shadow-vintage'
                                                : 'bg-white text-vintage-ink hover:bg-babaru-pink/30'
                                            }`}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {link.label}
                                    </motion.button>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden p-2 rounded-vintage border-3 border-vintage-ink bg-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        className="md:hidden pb-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <motion.div
                                            className={`px-4 py-3 rounded-vintage font-display font-semibold
                        border-3 border-vintage-ink transition-colors
                        ${isActive
                                                    ? 'bg-babaru-purple text-white'
                                                    : 'bg-white text-vintage-ink'
                                                }`}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {link.label}
                                        </motion.div>
                                    </Link>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    )
}
