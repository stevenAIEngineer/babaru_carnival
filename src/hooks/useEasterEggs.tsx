import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

interface EasterEgg {
    id: string
    name: string
    description: string
    found: boolean
}

interface EasterEggContextType {
    eggs: EasterEgg[]
    foundCount: number
    totalEggs: number
    unlockEgg: (id: string) => void
    isEggFound: (id: string) => boolean
    konamiActive: boolean
    setKonamiActive: (active: boolean) => void
}

const defaultEggs: EasterEgg[] = [
    { id: 'konami', name: 'Konami Master', description: 'Enter the legendary code', found: false },
    { id: 'click10', name: 'Persistent Clicker', description: 'Click Babaru 10 times rapidly', found: false },
    { id: 'idle', name: 'Patient Observer', description: 'Let Babaru fall asleep', found: false },
    { id: 'explorer', name: 'Explorer', description: 'Visit all pages', found: false },
    { id: 'eagle-eye', name: 'Eagle Eye', description: 'Find the hidden pixel', found: false },
    { id: 'name-caller', name: 'Name Caller', description: 'Type BABARU anywhere', found: false },
    { id: 'button-masher', name: 'Button Masher', description: 'Click all dial controls', found: false },
    { id: 'night-owl', name: 'Night Owl', description: 'Visit at midnight', found: false },
    { id: 'dev-tools', name: 'Developer', description: 'Open the console', found: false },
    { id: 'first-visit', name: 'Welcome!', description: 'First time visitor', found: false },
]

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined)

export function EasterEggProvider({ children }: { children: ReactNode }) {
    const [eggs, setEggs] = useState<EasterEgg[]>(() => {
        if (typeof window === 'undefined') return defaultEggs

        const saved = localStorage.getItem('babaru-easter-eggs')
        if (saved) {
            try {
                return JSON.parse(saved)
            } catch {
                return defaultEggs
            }
        }
        return defaultEggs
    })

    const [konamiActive, setKonamiActive] = useState(false)
    const [_konamiSequence, setKonamiSequence] = useState<string[]>([])

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('babaru-easter-eggs', JSON.stringify(eggs))
    }, [eggs])

    // First visit egg
    useEffect(() => {
        const hasVisited = localStorage.getItem('babaru-visited')
        if (!hasVisited) {
            localStorage.setItem('babaru-visited', 'true')
            unlockEgg('first-visit')
        }
    }, [])

    // Konami code listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setKonamiSequence(prev => {
                const newSeq = [...prev, e.code].slice(-10)

                if (newSeq.join(',') === konamiCode.join(',')) {
                    unlockEgg('konami')
                    setKonamiActive(true)
                    setTimeout(() => setKonamiActive(false), 10000)
                }

                return newSeq
            })
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // "BABARU" typing detection
    useEffect(() => {
        let typedChars = ''

        const handleKeyPress = (e: KeyboardEvent) => {
            typedChars += e.key.toLowerCase()
            typedChars = typedChars.slice(-6)

            if (typedChars === 'babaru') {
                unlockEgg('name-caller')
            }
        }

        window.addEventListener('keypress', handleKeyPress)
        return () => window.removeEventListener('keypress', handleKeyPress)
    }, [])

    // Night owl detection
    useEffect(() => {
        const hour = new Date().getHours()
        if (hour === 0) {
            unlockEgg('night-owl')
        }
    }, [])

    // Dev tools detection
    useEffect(() => {
        const devtools = /./
        devtools.toString = function () {
            unlockEgg('dev-tools')
            return ''
        }
        console.log('%c🎪 Babaru Comic Hub', 'font-size: 24px; font-weight: bold; color: #8B5CF6;')
        console.log('%c👀 Well well, a developer! Want a job? (jk... unless?)', 'font-size: 14px; color: #5B8BD9;')
        console.log(devtools)
    }, [])

    const unlockEgg = useCallback((id: string) => {
        setEggs(prev => {
            const egg = prev.find(e => e.id === id)
            if (egg && !egg.found) {
                console.log(`🥚 Easter egg unlocked: ${egg.name}!`)
                return prev.map(e => e.id === id ? { ...e, found: true } : e)
            }
            return prev
        })
    }, [])

    const isEggFound = useCallback((id: string) => {
        return eggs.find(e => e.id === id)?.found ?? false
    }, [eggs])

    const foundCount = eggs.filter(e => e.found).length
    const totalEggs = eggs.length

    return (
        <EasterEggContext.Provider value={{
            eggs,
            foundCount,
            totalEggs,
            unlockEgg,
            isEggFound,
            konamiActive,
            setKonamiActive,
        }}>
            {children}
        </EasterEggContext.Provider>
    )
}

export function useEasterEggs() {
    const context = useContext(EasterEggContext)
    if (!context) {
        throw new Error('useEasterEggs must be used within EasterEggProvider')
    }
    return context
}
