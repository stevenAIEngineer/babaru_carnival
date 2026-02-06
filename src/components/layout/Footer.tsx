import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEasterEggs } from '../../hooks/useEasterEggs'

export default function Footer() {
    const { foundCount, totalEggs } = useEasterEggs()

    return (
        <footer className="bg-vintage-ink text-vintage-paper py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-babaru-blue border-4 border-vintage-paper flex items-center justify-center">
                                <span className="text-2xl">🎪</span>
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-2xl">Babaru</h3>
                                <p className="text-vintage-paper/70 text-sm">Comic Hub</p>
                            </div>
                        </div>
                        <p className="text-vintage-paper/80 max-w-md leading-relaxed">
                            "I'm 8 inches tall and I'm still right." — Babaru, probably
                        </p>
                        <p className="text-vintage-paper/60 text-sm mt-2">
                            Your new favorite chaos agent. Memory. Personality. Accountability. Daily.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display font-bold text-lg mb-4 text-babaru-pink">
                            Explore
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/comics" className="text-vintage-paper/80 hover:text-babaru-pink transition-colors">
                                    📺 Watch Comics
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-vintage-paper/80 hover:text-babaru-pink transition-colors">
                                    🎭 Meet Babaru
                                </Link>
                            </li>
                            <li>
                                <Link to="/community" className="text-vintage-paper/80 hover:text-babaru-pink transition-colors">
                                    🎪 The Carnival
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Easter Egg Progress */}
                    <div>
                        <h4 className="font-display font-bold text-lg mb-4 text-babaru-pink">
                            🔍 Secrets Found
                        </h4>
                        <div className="bg-vintage-paper/10 rounded-vintage p-4 border-2 border-vintage-paper/30">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">🥚</span>
                                <div>
                                    <p className="font-display font-bold text-2xl">
                                        {foundCount}/{totalEggs}
                                    </p>
                                    <p className="text-vintage-paper/60 text-sm">Easter Eggs</p>
                                </div>
                            </div>
                            <div className="w-full bg-vintage-paper/20 rounded-full h-2">
                                <motion.div
                                    className="bg-babaru-purple h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(foundCount / totalEggs) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            {foundCount === 0 && (
                                <p className="text-vintage-paper/50 text-xs mt-2 italic">
                                    "Keep looking... 👀" — Babaru
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-vintage-paper/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-vintage-paper/60 text-sm">
                        © 2026 Babaru. All rights reserved (and some wrongs, too).
                    </p>
                    <div className="flex items-center gap-4">
                        <motion.a
                            href="https://twitter.com/therealbabaru"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-vintage-paper/80 hover:text-babaru-pink transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🐦 @therealbabaru
                        </motion.a>
                        <motion.a
                            href="https://instagram.com/therealbabaru"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-vintage-paper/80 hover:text-babaru-pink transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            📸 @therealbabaru
                        </motion.a>
                        <motion.a
                            href="https://discord.gg/therealbabaru"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-vintage-paper/80 hover:text-babaru-pink transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            💬 Discord
                        </motion.a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
