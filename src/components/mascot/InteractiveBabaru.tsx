import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEasterEggs } from '../../hooks/useEasterEggs'
import { useBabaruChat } from '../../hooks/useBabaruChat'
import ChatBubble from './ChatBubble'
import { BabaruMood } from '../../data/babaruComments'

// Import Babaru images
import babaruHappy from '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.13.jpeg'
import babaruExcited from '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.13 (1).jpeg'
import babaruWink from '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.28 (1).jpeg'
import babaruConfused from '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.28.jpeg'

const moodImages: Record<BabaruMood, string> = {
    happy: babaruHappy,
    excited: babaruExcited,
    mischievous: babaruWink,
    confused: babaruConfused,
    shocked: babaruExcited,
    proud: babaruWink,
    sad: babaruConfused,
    tired: babaruConfused,
}

/**
 * Interactive floating Babaru with voice chat capability
 * - Click to open chat
 * - Talk animation synced to audio amplitude
 * - Integrates with Railway backend
 */
export default function InteractiveBabaru() {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const { konamiActive } = useEasterEggs()

    const {
        messages,
        isLoading,
        isPlaying,
        amplitude,
        isMuted,
        sendMessage,
        toggleMute,
    } = useBabaruChat()

    // Get mood based on state
    const getMood = (): BabaruMood => {
        if (isPlaying) return 'excited'
        if (isLoading) return 'mischievous'
        if (isChatOpen) return 'happy'
        return 'happy'
    }

    // Get last Babaru response for display
    const lastResponse = messages
        .filter(m => m.role === 'babaru')
        .pop()?.content || null

    // Calculate scale based on audio amplitude (1.0 to 1.2)
    const talkingScale = isPlaying ? 1 + (amplitude * 0.2) : 1

    // Talking animation - bouncy when speaking
    const talkingAnimation = isPlaying
        ? {
            scale: [talkingScale, talkingScale * 1.05, talkingScale],
            rotate: [0, amplitude * 3, 0, -amplitude * 3, 0],
        }
        : {}

    const handleClick = () => {
        if (!isChatOpen) {
            setIsChatOpen(true)
        }
    }

    return (
        <motion.div
            className="fixed bottom-4 right-4 z-40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        >
            {/* Chat Bubble */}
            <ChatBubble
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                onSend={sendMessage}
                isLoading={isLoading}
                lastResponse={lastResponse}
                isMuted={isMuted}
                onToggleMute={toggleMute}
            />

            {/* Babaru Avatar */}
            <motion.div
                className="cursor-pointer relative"
                onClick={handleClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Main Avatar */}
                <motion.div
                    className="w-24 h-24 relative"
                    animate={isPlaying ? talkingAnimation : {}}
                    transition={{
                        duration: 0.1,
                        repeat: isPlaying ? Infinity : 0,
                        ease: 'easeInOut'
                    }}
                    style={{ scale: talkingScale }}
                >
                    <motion.img
                        src={moodImages[getMood()]}
                        alt="Babaru - Click to chat!"
                        className="w-full h-full object-cover rounded-full border-4 border-vintage-ink shadow-vintage-lg"
                    />

                    {/* Talking indicator ring */}
                    {isPlaying && (
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-babaru-purple"
                            animate={{
                                scale: [1, 1.2 + amplitude * 0.3, 1],
                                opacity: [0.8, 0.3, 0.8],
                            }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                        />
                    )}

                    {/* Loading indicator */}
                    {isLoading && (
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-dashed border-babaru-blue"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                    )}

                    {/* Konami party effect */}
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
                </motion.div>

                {/* Status indicator */}
                <AnimatePresence>
                    {!isChatOpen && (
                        <motion.div
                            className="absolute -top-1 -right-1 bg-babaru-purple text-white text-xs 
                         px-2 py-1 rounded-full border-2 border-vintage-ink font-bold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            💬
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Hint text when not chatting */}
            <AnimatePresence>
                {!isChatOpen && !isPlaying && (
                    <motion.p
                        className="absolute -top-8 right-0 text-vintage-sepia text-xs whitespace-nowrap"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                    >
                        Click to chat! 💬
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
