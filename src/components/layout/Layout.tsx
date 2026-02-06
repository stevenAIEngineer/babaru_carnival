import { ReactNode } from 'react'
import Navbar from './Navbar.tsx'
import Footer from './Footer.tsx'
import InteractiveBabaru from '../mascot/InteractiveBabaru.tsx'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />

            {/* Interactive Floating Babaru with Voice Chat */}
            <InteractiveBabaru />
        </div>
    )
}
