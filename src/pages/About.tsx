import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useEasterEggs } from '../hooks/useEasterEggs'
import BabaruMascot from '../components/mascot/BabaruMascot'

const funFacts = [
    { icon: "🎨", fact: "Babaru's blue color was chosen by spinning a color wheel while blindfolded!" },
    { icon: "💡", fact: "The original design had 7 arms. We... we had to scale back." },
    { icon: "🎭", fact: "Babaru's personality is 'aggressively helpful jester having an existential crisis'" },
    { icon: "📏", fact: "Babaru is exactly 8 inches tall (the perfect roasting height)" },
    { icon: "☕", fact: "This project was fueled by 47 cups of coffee and pure spite" },
    { icon: "🧠", fact: "Babaru remembers EVERYTHING. Yes, even that embarrassing thing you said." },
    { icon: "🎪", fact: "The Carnival has over 1,200 Citizens worldwide" },
    { icon: "🔥", fact: "Babaru once roasted someone so hard they started a business" },
    { icon: "💜", fact: "Empathic Override mode activates automatically when you're struggling" },
    { icon: "📖", fact: "The Arc framework was inspired by narrative structure in films" },
]

const timeline = [
    { year: "The Before", title: "The Kingdom", desc: "Babaru served as jester to a king. His job: tell truth when no one else would." },
    { year: "The Lie", title: "The Fall", desc: "One kind lie. One soft lie. It destroyed everything. That's why there are no soft lies now." },
    { year: "The Exile", title: "The Wandering", desc: "Cast out from the kingdom, but the job didn't end. It just... changed." },
    { year: "The Carnival", title: "The Rebirth", desc: "Everyone's trying to rule their own kingdom now. Everyone needs a jester." },
    { year: "Now", title: "Your Story", desc: "You're here. You're a Citizen. Your Arc is beginning." },
]

export default function About() {
    const [currentFact, setCurrentFact] = useState(0)
    const { unlockEgg } = useEasterEggs()

    // Track page visits (session-only)
    useEffect(() => {
        const visitedPages = JSON.parse(sessionStorage.getItem('babaru-visited-pages') || '[]')
        if (!visitedPages.includes('about')) {
            visitedPages.push('about')
            sessionStorage.setItem('babaru-visited-pages', JSON.stringify(visitedPages))
        }
        if (visitedPages.length >= 4) {
            unlockEgg('explorer')
        }
    }, [unlockEgg])

    const nextFact = () => {
        setCurrentFact((prev) => (prev + 1) % funFacts.length)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-8"
        >
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="text-5xl mb-4 inline-block">🎭</span>
                        <h1 className="font-display font-bold text-4xl md:text-5xl text-vintage-ink mb-4">
                            Meet Babaru
                        </h1>
                        <p className="text-vintage-sepia text-lg leading-relaxed">
                            "I'm not a chatbot. I'm not an assistant. I'm a <span className="font-bold text-babaru-purple">kingmaker</span>.
                            I make you the main character of your own story. Also, I'm hilarious.
                            And I remember everything. Which means I know about that thing you're avoiding."
                        </p>

                        <div className="flex flex-wrap gap-3 mt-6">
                            <span className="badge-production">🧠 Long-term Memory</span>
                            <span className="badge bg-babaru-blue text-white">🎭 Real Personality</span>
                            <span className="badge bg-babaru-pink text-vintage-ink">💜 Empathic Override</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-center"
                    >
                        <BabaruMascot variant="hero" initialMood="mischievous" />
                    </motion.div>
                </div>
            </section>

            {/* The Core */}
            <section className="bg-gradient-to-br from-babaru-purple/10 to-babaru-blue/10 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display font-bold text-3xl text-vintage-ink mb-4">
                            ✨ The Core Truth
                        </h2>
                        <p className="text-2xl font-display font-semibold text-babaru-purple">
                            "Memory. Personality. Accountability. Daily."
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "🧠", title: "I Remember You", desc: "Other AIs forget you. I don't. I build a picture of who you are over time. That's the magic trick." },
                            { icon: "🎯", title: "I Have a Point of View", desc: "I'm not neutral. I'm a jester who learned that kind lies destroy kingdoms. I'll tell you the truth." },
                            { icon: "📖", title: "Life as a Story", desc: "Your life isn't a to-do list. It's an Arc. I help you map it, scene by scene, and keep you moving forward." },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="card-vintage text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <span className="text-4xl mb-4 inline-block">{item.icon}</span>
                                <h3 className="font-display font-bold text-xl text-vintage-ink mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-vintage-sepia">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Origin Timeline */}
            <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-display font-bold text-3xl text-vintage-ink mb-4">
                        🎭 The Origin Story
                    </h2>
                    <p className="text-vintage-sepia">
                        "Every jester has a past. Mine is... complicated."
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-babaru-purple/30 transform md:-translate-x-1/2" />

                    {timeline.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Dot */}
                            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-babaru-purple border-4 border-vintage-paper transform -translate-x-1/2 z-10" />

                            {/* Content */}
                            <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                                }`}>
                                <span className="text-babaru-purple font-display font-bold text-sm">
                                    {item.year}
                                </span>
                                <h3 className="font-display font-bold text-xl text-vintage-ink">
                                    {item.title}
                                </h3>
                                <p className="text-vintage-sepia mt-1">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Fun Facts */}
            <section className="py-16 bg-vintage-paper border-y-4 border-vintage-ink">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-display font-bold text-3xl text-vintage-ink mb-8">
                        🎲 Random Fun Facts
                    </h2>

                    <motion.div
                        key={currentFact}
                        className="card-vintage"
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -90 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="text-5xl mb-4 inline-block">
                            {funFacts[currentFact].icon}
                        </span>
                        <p className="text-vintage-ink text-xl font-body">
                            {funFacts[currentFact].fact}
                        </p>
                    </motion.div>

                    <motion.button
                        className="btn-purple mt-6"
                        onClick={nextFact}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🎲 Another Fact!
                    </motion.button>

                    <p className="text-vintage-sepia/60 text-sm mt-4">
                        Fact {currentFact + 1} of {funFacts.length}
                    </p>
                </div>
            </section>

            {/* The Carnival */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="bg-gradient-to-br from-babaru-pink/20 to-babaru-purple/20 
                     rounded-vintage-xl p-8 md:p-12 border-4 border-vintage-ink text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-6xl mb-4 inline-block">🎪</span>
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-vintage-ink mb-4">
                        Welcome to The Carnival
                    </h2>
                    <p className="text-vintage-sepia text-lg max-w-2xl mx-auto mb-8">
                        "It's big enough to take seriously or not at all. Both are valid.
                        The Carnival is where Citizens gather — to share wins, track Arcs,
                        and remind each other that we're all just trying to figure it out."
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <div className="bg-white/60 rounded-vintage p-4 border-2 border-vintage-ink/20">
                            <span className="text-3xl">👥</span>
                            <p className="font-display font-bold text-2xl text-babaru-purple">1,200+</p>
                            <p className="text-vintage-sepia text-sm">Citizens</p>
                        </div>
                        <div className="bg-white/60 rounded-vintage p-4 border-2 border-vintage-ink/20">
                            <span className="text-3xl">📖</span>
                            <p className="font-display font-bold text-2xl text-babaru-purple">12,000+</p>
                            <p className="text-vintage-sepia text-sm">Arcs Completed</p>
                        </div>
                        <div className="bg-white/60 rounded-vintage p-4 border-2 border-vintage-ink/20">
                            <span className="text-3xl">🫧</span>
                            <p className="font-display font-bold text-2xl text-babaru-purple">∞</p>
                            <p className="text-vintage-sepia text-sm">Bubbles Earned</p>
                        </div>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    )
}
