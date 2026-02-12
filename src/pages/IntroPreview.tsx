/**
 * Intro Preview Page - Test page to view the Babaru intro animation
 * @author Steven Lansangan / JC Industries
 */
import { motion } from 'framer-motion'
import IntroPlayer from '../components/comics/IntroPlayer.tsx'

export default function IntroPreview() {
    return (
        <div className="min-h-screen bg-[#0a0014] flex flex-col items-center justify-center p-4">
            {/* Header */}
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">
                    🎬 Intro Preview
                </h1>
                <p className="text-purple-300 text-lg">
                    Netflix-style BABARU intro animation
                </p>
            </motion.div>

            {/* Player */}
            <motion.div
                className="w-full max-w-5xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <IntroPlayer
                    autoPlay={false}
                    loop={false}
                    showControls={true}
                    style={{
                        borderRadius: 16,
                        overflow: 'hidden',
                        border: '3px solid rgba(139, 92, 246, 0.3)',
                        boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)',
                    }}
                />
            </motion.div>

            {/* Info */}
            <motion.div
                className="mt-8 text-center max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                    <h3 className="text-white font-bold text-lg mb-3">📋 Animation Breakdown</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-purple-500/10 rounded-lg p-3">
                            <div className="text-purple-300 font-bold">Phase 1</div>
                            <div className="text-gray-400">Dark Carnival Atmosphere</div>
                        </div>
                        <div className="bg-purple-500/10 rounded-lg p-3">
                            <div className="text-purple-300 font-bold">Phase 2</div>
                            <div className="text-gray-400">BABARU Title Slam</div>
                        </div>
                        <div className="bg-purple-500/10 rounded-lg p-3">
                            <div className="text-purple-300 font-bold">Phase 3</div>
                            <div className="text-gray-400">Snarky Tagline</div>
                        </div>
                        <div className="bg-purple-500/10 rounded-lg p-3">
                            <div className="text-purple-300 font-bold">Phase 4</div>
                            <div className="text-gray-400">Babaru Wink Reveal</div>
                        </div>
                        <div className="bg-purple-500/10 rounded-lg p-3">
                            <div className="text-purple-300 font-bold">Phase 5</div>
                            <div className="text-gray-400">Cinematic Zoom</div>
                        </div>
                        <div className="bg-purple-500/10 rounded-lg p-3">
                            <div className="text-purple-300 font-bold">Phase 6</div>
                            <div className="text-gray-400">Fade to Black</div>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-4">
                        210 frames · 30fps · 7s total · Made with Remotion
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
