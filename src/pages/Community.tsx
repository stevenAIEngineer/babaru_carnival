import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useEasterEggs } from '../hooks/useEasterEggs'

export default function Community() {
    const { unlockEgg } = useEasterEggs()

    // Track page visits (session-only)
    useEffect(() => {
        const visitedPages = JSON.parse(sessionStorage.getItem('babaru-visited-pages') || '[]')
        if (!visitedPages.includes('community')) {
            visitedPages.push('community')
            sessionStorage.setItem('babaru-visited-pages', JSON.stringify(visitedPages))
        }
        if (visitedPages.length >= 4) {
            unlockEgg('explorer')
        }
    }, [unlockEgg])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-8"
        >
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <span className="text-6xl mb-4 inline-block">🎪</span>
                    <h1 className="font-display font-bold text-4xl md:text-5xl text-vintage-ink mb-4">
                        The Carnival
                    </h1>
                    <p className="text-vintage-sepia text-lg max-w-2xl mx-auto">
                        "Welcome, Citizen. You're part of something now.
                        I know that sounds vaguely cult-like, but I promise it's the fun kind." — Babaru
                    </p>
                </motion.div>
            </div>

            {/* Coming Soon Notice */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <motion.div
                    className="card-vintage text-center py-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <motion.div
                        animate={{ rotate: [-5, 5, -5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-6xl inline-block">🔨</span>
                    </motion.div>

                    <h2 className="font-display font-bold text-2xl text-vintage-ink mt-4 mb-2">
                        Community Features Coming Soon!
                    </h2>
                    <p className="text-vintage-sepia max-w-md mx-auto">
                        "We're building something special here. The Carnival is growing, and soon you'll
                        be able to connect with other Citizens, share your Arcs, and maybe even earn some Bubbles."
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        <span className="badge bg-babaru-pink text-vintage-ink">👥 Citizen Profiles</span>
                        <span className="badge bg-babaru-blue text-white">📊 Arc Sharing</span>
                        <span className="badge bg-babaru-purple text-white">🫧 Bubble Economy</span>
                        <span className="badge bg-amber-400 text-vintage-ink">🏆 Spotlights</span>
                    </div>
                </motion.div>
            </section>

            {/* What's Coming */}
            <section className="py-16 bg-gradient-to-br from-babaru-purple/10 to-babaru-pink/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        className="font-display font-bold text-3xl text-vintage-ink text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        🎯 What's Coming to The Carnival
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "👤",
                                title: "Citizen Profiles",
                                desc: "Your own space in the Carnival. Track your Arcs, display your achievements, show off your Citizen number.",
                                status: "In Development"
                            },
                            {
                                icon: "📖",
                                title: "Arc Sharing",
                                desc: "Share your completed Arcs with the community. Inspire others. Get inspired. It's a whole thing.",
                                status: "Planned"
                            },
                            {
                                icon: "🫧",
                                title: "Bubble Economy",
                                desc: "Earn Bubbles for completing Arcs, daily check-ins, and community participation. Spend them on... things.",
                                status: "In Development"
                            },
                            {
                                icon: "🏆",
                                title: "Citizen Spotlights",
                                desc: "Get featured for your Arc completions. Babaru celebrates you. It's kind of a big deal.",
                                status: "Planned"
                            },
                            {
                                icon: "💬",
                                title: "Community Chat",
                                desc: "Connect with other Citizens. Share wins. Commiserate on stuck Scenes. Find your people.",
                                status: "Future"
                            },
                            {
                                icon: "🎨",
                                title: "Fan Content",
                                desc: "Submit your own Babaru art, comics, and creations. The best ones get featured.",
                                status: "Future"
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="card-vintage"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <span className="text-4xl">{feature.icon}</span>
                                <h3 className="font-display font-bold text-xl text-vintage-ink mt-3 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-vintage-sepia text-sm mb-4">{feature.desc}</p>
                                <span className={`badge text-xs ${feature.status === 'In Development'
                                    ? 'bg-amber-400 text-vintage-ink'
                                    : feature.status === 'Planned'
                                        ? 'bg-babaru-blue text-white'
                                        : 'bg-gray-300 text-gray-600'
                                    }`}>
                                    {feature.status}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="card-vintage text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-4xl">✉️</span>
                    <h2 className="font-display font-bold text-2xl text-vintage-ink mt-4 mb-2">
                        Get Carnival Updates
                    </h2>
                    <p className="text-vintage-sepia mb-6">
                        "I promise not to spam. Much. Okay, a little. But it's quality spam."
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email (I promise not to sell it)"
                            className="input-vintage flex-1"
                        />
                        <motion.button
                            className="btn-purple whitespace-nowrap"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Join! →
                        </motion.button>
                    </div>

                    <p className="text-vintage-sepia/60 text-xs mt-4">
                        By joining, you become a Carnival Citizen. It's a whole identity now. You're welcome.
                    </p>
                </motion.div>
            </section>

            {/* Social Links */}
            <section className="py-16 bg-vintage-paper border-t-4 border-vintage-ink">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-display font-bold text-2xl text-vintage-ink mb-6">
                        Find The Carnival
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { icon: "🐦", name: "Twitter", handle: "@therealbabaru" },
                            { icon: "📸", name: "Instagram", handle: "@therealbabaru" },
                            { icon: "💬", name: "Discord", handle: "@therealbabaru" },
                            { icon: "📺", name: "YouTube", handle: "@therealbabaru" },
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                className="card-vintage flex items-center gap-3 px-6 py-4"
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-2xl">{social.icon}</span>
                                <div className="text-left">
                                    <p className="font-display font-bold text-vintage-ink">{social.name}</p>
                                    <p className="text-vintage-sepia text-sm">{social.handle}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    )
}
