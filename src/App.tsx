/**
 * Babaru Carnival - Main App Component
 * @author Steven Lansangan
 */
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Comics from './pages/Comics.tsx'
import About from './pages/About.tsx'
import Community from './pages/Community.tsx'
import IntroPreview from './pages/IntroPreview.tsx'
import { EasterEggProvider } from './hooks/useEasterEggs'

function App() {
    return (
        <EasterEggProvider>
            {/* Film Grain Overlay */}
            <div className="grain-overlay" aria-hidden="true" />

            <Layout>
                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/comics" element={<Comics />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/intro" element={<IntroPreview />} />
                    </Routes>
                </AnimatePresence>
            </Layout>
        </EasterEggProvider>
    )
}

export default App
