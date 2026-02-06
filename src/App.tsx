/**
 * Babaru Carnival - Main App Component
 * @author Steven Lansangan
 */
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Comics from './pages/Comics'
import About from './pages/About'
import Community from './pages/Community'
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
                    </Routes>
                </AnimatePresence>
            </Layout>
        </EasterEggProvider>
    )
}

export default App
