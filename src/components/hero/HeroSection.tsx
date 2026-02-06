import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import BabaruMascot from '../mascot/BabaruMascot'
import VintageTVFrame from './VintageTVFrame'

const headlines = [
    { text: "Meet Your New Favorite Chaos Agent!", emoji: "🎪" },
    { text: "50% Toy, 50% Attitude, 100% Questionable Math!", emoji: "🤡" },
    { text: "Warning: May Cause Spontaneous Joy!", emoji: "⚠️" },
    { text: "The Ringmaster of Your Personal Carnival!", emoji: "🎭" },
    { text: "Memory. Personality. Accountability. Daily.", emoji: "✨" },
]

const valueProps = [
    { icon: "📺", title: "Animated Comics", desc: "That Actually Move! (Like magic, but coding!)" },
    { icon: "🎭", title: "Real Personality", desc: "Not your average AI. (I have opinions.)" },
    { icon: "🧠", title: "Remembers You", desc: "I know who you are. (Creepy? Maybe. Useful? Definitely.)" },
    { icon: "🎪", title: "Easter Eggs Galore", desc: "We hid SO many things. Good luck!" },
]

export default function HeroSection() {
    const [currentHeadline, setCurrentHeadline] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeadline(prev => (prev + 1) % headlines.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative py-12 md:py-20 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-babaru-pink/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-babaru-blue/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-babaru-purple/20 rounded-full blur-2xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-center lg:text-left"
                    >
                        {/* Animated Headline */}
                        <motion.div
                            key={currentHeadline}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            <span className="text-5xl mb-2 inline-block">
                                {headlines[currentHeadline].emoji}
                            </span>
                            <h1 className="font-display text-display-lg md:text-display-xl text-vintage-ink leading-tight">
                                {headlines[currentHeadline].text}
                            </h1>
                        </motion.div>

                        <p className="text-lg md:text-xl text-vintage-sepia mb-8 max-w-xl mx-auto lg:mx-0">
                            Welcome to Babaru Comic Hub! Your destination for animated chaos,
                            questionable life advice, and comics that actually move.
                            <span className="text-babaru-purple font-semibold"> (You're welcome.)</span>
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <motion.a
                                href="/comics"
                                className="btn-primary text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                📺 Watch Comics
                            </motion.a>
                            <motion.a
                                href="/about"
                                className="btn-secondary text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                🎭 Meet Babaru
                            </motion.a>
                        </div>

                        {/* Value Props */}
                        <div className="grid grid-cols-2 gap-4 mt-10">
                            {valueProps.map((prop, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="bg-white/60 backdrop-blur-sm rounded-vintage p-3 border-2 border-vintage-ink/20"
                                >
                                    <span className="text-2xl">{prop.icon}</span>
                                    <h3 className="font-display font-bold text-sm text-vintage-ink mt-1">
                                        {prop.title}
                                    </h3>
                                    <p className="text-xs text-vintage-sepia">{prop.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Babaru + TV Frame */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <VintageTVFrame>
                            <BabaruMascot variant="hero" size="xl" />
                        </VintageTVFrame>

                        {/* Interactive Dials hint */}
                        <motion.p
                            className="mt-4 text-vintage-sepia text-sm italic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            👆 Click me! I'm interactive! (Really!)
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
