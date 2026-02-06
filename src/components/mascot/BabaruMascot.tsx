import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useEasterEggs } from '../../hooks/useEasterEggs'
import SpeechBubble from './SpeechBubble'
import { getRandomComment, BabaruMood } from '../../data/babaruComments'

// Import Babaru images
import babaruHappy from '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.13.jpeg'
import babaruExcited from '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.13 (1).jpeg'
import babaruWink from '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.28 (1).jpeg'
import babaruConfused from '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.28.jpeg'
import babaruShocked from '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.27 (1).jpeg'
import babaruSmug from '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.27.jpeg'

const moodImages: Record<BabaruMood, string> = {
    happy: babaruHappy,
    excited: babaruExcited,
    mischievous: babaruWink,
    confused: babaruConfused,
    shocked: babaruShocked,
    proud: babaruSmug,
    sad: babaruConfused,
    tired: babaruConfused,
}

interface BabaruMascotProps {
    variant?: 'hero' | 'floating' | 'inline'
    initialMood?: BabaruMood
    showSpeechBubble?: boolean
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function BabaruMascot({
    variant = 'floating',
    initialMood = 'happy',
    showSpeechBubble = true,
    size = 'md'
}: BabaruMascotProps) {
    const [mood, setMood] = useState<BabaruMood>(initialMood)
    const [comment, setComment] = useState<string | null>(null)
    const [clickCount, setClickCount] = useState(0)
    const [isIdle, setIsIdle] = useState(false)
    const clickTimeoutRef = useRef<NodeJS.Timeout>()
    const idleTimeoutRef = useRef<NodeJS.Timeout>()
    const controls = useAnimation()

    const { unlockEgg, konamiActive } = useEasterEggs()

    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32',
        xl: 'w-48 h-48',
    }

    // Handle rapid clicks for easter egg
    const handleClick = () => {
        setClickCount(prev => prev + 1)

        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current)
        }

        clickTimeoutRef.current = setTimeout(() => {
            setClickCount(0)
        }, 2000)

        if (clickCount >= 9) {
            unlockEgg('click10')
            setMood('shocked')
            setComment("OKAY OKAY I GET IT! 😵‍💫")
            controls.start({
                rotate: [0, 360, 720, 1080],
                transition: { duration: 1, ease: "easeInOut" }
            })
            setTimeout(() => {
                setMood('happy')
                setComment(null)
            }, 3000)
        } else {
            // Random reaction on click
            const reactions: { mood: BabaruMood; comment: string }[] = [
                { mood: 'excited', comment: "That tickles! 😄" },
                { mood: 'mischievous', comment: "Poking me, huh? Bold move!" },
                { mood: 'happy', comment: "Hi! 👋 Need something?" },
                { mood: 'proud', comment: "I know, I'm adorable." },
            ]
            const reaction = reactions[Math.floor(Math.random() * reactions.length)]
            setMood(reaction.mood)
            setComment(reaction.comment)

            controls.start({
                scale: [1, 1.2, 1],
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.4 }
            })

            setTimeout(() => {
                setMood('happy')
                setComment(null)
            }, 3000)
        }
    }

    // Idle detection for easter egg
    useEffect(() => {
        const resetIdleTimer = () => {
            setIsIdle(false)
            if (idleTimeoutRef.current) {
                clearTimeout(idleTimeoutRef.current)
            }
            idleTimeoutRef.current = setTimeout(() => {
                setIsIdle(true)
                unlockEgg('idle')
                setMood('tired')
                setComment("💤 Zzz... (wake me up for the good parts...)")
            }, 120000) // 2 minutes
        }

        window.addEventListener('mousemove', resetIdleTimer)
        window.addEventListener('keydown', resetIdleTimer)
        window.addEventListener('scroll', resetIdleTimer)

        resetIdleTimer()

        return () => {
            window.removeEventListener('mousemove', resetIdleTimer)
            window.removeEventListener('keydown', resetIdleTimer)
            window.removeEventListener('scroll', resetIdleTimer)
            if (idleTimeoutRef.current) {
                clearTimeout(idleTimeoutRef.current)
            }
        }
    }, [unlockEgg])

    // Konami code party mode
    useEffect(() => {
        if (konamiActive) {
            setMood('excited')
            setComment("🎉 PARTY MODE ACTIVATED! 🎊")
        }
    }, [konamiActive])

    // Random comments on mount
    useEffect(() => {
        if (variant === 'hero') {
            const randomComment = getRandomComment('greeting')
            setComment(randomComment)

            const interval = setInterval(() => {
                if (!isIdle && Math.random() > 0.7) {
                    setComment(getRandomComment('random'))
                    setTimeout(() => setComment(null), 5000)
                }
            }, 30000)

            return () => clearInterval(interval)
        }
    }, [variant, isIdle])

    if (variant === 'floating') {
        return (
            <motion.div
                className="fixed bottom-4 right-4 z-40"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
            >
                <motion.div
                    animate={controls}
                    whileHover={{ scale: 1.1 }}
                    className="cursor-pointer"
                    onClick={handleClick}
                >
                    <div className={`${sizeClasses[size]} relative`}>
                        <motion.img
                            src={moodImages[mood]}
                            alt="Babaru"
                            className="w-full h-full object-cover rounded-full border-4 border-vintage-ink shadow-vintage-lg"
                            animate={isIdle ? { opacity: 0.5 } : { opacity: 1 }}
                        />
                        {konamiActive && (
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                animate={{
                                    boxShadow: [
                                        '0 0 20px #8B5CF6',
                                        '0 0 40px #FFB6C1',
                                        '0 0 20px #5B8BD9',
                                        '0 0 40px #8B5CF6',
                                    ]
                                }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            />
                        )}
                    </div>
                </motion.div>

                <AnimatePresence>
                    {comment && showSpeechBubble && (
                        <motion.div
                            className="absolute bottom-full right-0 mb-2"
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        >
                            <SpeechBubble variant="small">{comment}</SpeechBubble>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        )
    }

    // Hero variant - larger, centered
    return (
        <div className="relative flex flex-col items-center">
            <motion.div
                animate={controls}
                whileHover={{ scale: 1.05, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                onClick={handleClick}
            >
                <motion.div
                    className={`${variant === 'hero' ? 'w-64 h-64 md:w-80 md:h-80' : sizeClasses[size]} relative`}
                    animate={isIdle ? {} : { y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <img
                        src={moodImages[mood]}
                        alt="Babaru - Your Carnival Guide"
                        className="w-full h-full object-cover rounded-vintage-xl border-8 border-vintage-ink shadow-vintage-xl"
                    />
                    {konamiActive && (
                        <motion.div
                            className="absolute inset-0 rounded-vintage-xl"
                            animate={{
                                boxShadow: [
                                    '0 0 30px #8B5CF6',
                                    '0 0 60px #FFB6C1',
                                    '0 0 30px #5B8BD9',
                                ]
                            }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        />
                    )}
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {comment && showSpeechBubble && (
                    <motion.div
                        className="mt-4"
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    >
                        <SpeechBubble>{comment}</SpeechBubble>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
