import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatBubbleProps {
    isOpen: boolean
    onClose: () => void
    onSend: (message: string) => void
    isLoading: boolean
    lastResponse: string | null
    isMuted: boolean
    onToggleMute: () => void
}

export default function ChatBubble({
    isOpen,
    onClose,
    onSend,
    isLoading,
    lastResponse,
    isMuted,
    onToggleMute,
}: ChatBubbleProps) {
    const [input, setInput] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim() && !isLoading) {
            onSend(input)
            setInput('')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="absolute bottom-full right-0 mb-4 w-80 z-50"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                    {/* Chat Container */}
                    <div className="bg-white rounded-vintage-lg border-4 border-vintage-ink shadow-vintage-xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-babaru-purple text-white px-4 py-2 flex items-center justify-between">
                            <span className="font-display font-bold text-sm">💬 Talk to Babaru</span>
                            <div className="flex items-center gap-2">
                                {/* Mute Toggle */}
                                <motion.button
                                    onClick={onToggleMute}
                                    className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={isMuted ? 'Unmute Babaru' : 'Mute Babaru'}
                                >
                                    {isMuted ? '🔇' : '🔊'}
                                </motion.button>
                                {/* Close */}
                                <motion.button
                                    onClick={onClose}
                                    className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    ✕
                                </motion.button>
                            </div>
                        </div>

                        {/* Response Area */}
                        <div className="p-4 min-h-[80px] max-h-[150px] overflow-y-auto bg-vintage-paper/50">
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-vintage-sepia">
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    >
                                        🌀
                                    </motion.span>
                                    <span className="text-sm italic">Babaru is thinking...</span>
                                </div>
                            ) : lastResponse ? (
                                <p className="text-vintage-ink text-sm leading-relaxed">
                                    {lastResponse}
                                </p>
                            ) : (
                                <p className="text-vintage-sepia text-sm italic">
                                    "Ask me anything! I promise to be helpful... ish." 🎭
                                </p>
                            )}
                        </div>

                        {/* Input Form */}
                        <form onSubmit={handleSubmit} className="border-t-2 border-vintage-ink/20">
                            <div className="flex items-center">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Say something..."
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-3 bg-white text-vintage-ink text-sm
                             placeholder-vintage-sepia/50 outline-none
                             disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <motion.button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="px-4 py-3 bg-babaru-blue text-white font-bold
                             disabled:opacity-30 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isLoading ? '...' : '→'}
                                </motion.button>
                            </div>
                        </form>
                    </div>

                    {/* Speech bubble tail */}
                    <div className="absolute -bottom-3 right-8 w-0 h-0
                          border-l-[12px] border-l-transparent
                          border-r-[12px] border-r-transparent
                          border-t-[16px] border-t-vintage-ink" />
                    <div className="absolute -bottom-2 right-9 w-0 h-0
                          border-l-[10px] border-l-transparent
                          border-r-[10px] border-r-transparent
                          border-t-[12px] border-t-white z-10" />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
