/**
 * Babaru Intro - Netflix-style intro animation
 * @author Steven Lansangan / JC Industries
 * 
 * Sequence: Black → BABARU text assembles → Babaru wink video → zoom in → fade out
 */
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Video, Easing } from 'remotion'

const BABARU_PURPLE = '#8B5CF6'
const BABARU_BLUE = '#5B8BD9'
const BABARU_PINK = '#FFB6C1'

// Phase timings (in frames at 30fps)
const PHASES = {
    fadeIn: { start: 0, end: 15 },
    ribbons: { start: 10, end: 55 },
    textReveal: { start: 35, end: 75 },
    textHold: { start: 75, end: 95 },
    videoReveal: { start: 85, end: 115 },
    videoZoom: { start: 115, end: 155 },
    fadeOut: { start: 150, end: 165 },
}

// Ribbon trail component
function RibbonTrail({ delay, color, yOffset, direction }: {
    delay: number; color: string; yOffset: number; direction: 1 | -1
}) {
    const frame = useCurrentFrame()
    const { width } = useVideoConfig()
    const adjustedFrame = Math.max(0, frame - delay)

    const progress = interpolate(adjustedFrame, [0, 40], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })

    const xPos = direction === 1
        ? interpolate(progress, [0, 1], [-width, width * 0.5])
        : interpolate(progress, [0, 1], [width * 2, width * 0.5])

    const opacity = interpolate(adjustedFrame, [0, 10, 35, 45], [0, 0.8, 0.8, 0], {
        extrapolateRight: 'clamp',
    })

    const ribbonWidth = interpolate(progress, [0, 0.5, 1], [200, 600, 100], {
        extrapolateRight: 'clamp',
    })

    return (
        <div
            style={{
                position: 'absolute',
                top: `${50 + yOffset}%`,
                left: xPos,
                width: ribbonWidth,
                height: 4,
                background: `linear-gradient(${direction === 1 ? '90deg' : '270deg'}, transparent, ${color}, transparent)`,
                opacity,
                filter: `blur(1px) drop-shadow(0 0 12px ${color})`,
                transform: 'translateY(-50%)',
                borderRadius: 2,
            }}
        />
    )
}

// Individual letter component
function Letter({ letter, index, totalLetters }: {
    letter: string; index: number; totalLetters: number
}) {
    const frame = useCurrentFrame()
    const { fps } = useVideoConfig()

    const letterDelay = PHASES.textReveal.start + index * 4

    const scaleSpring = spring({
        frame: frame - letterDelay,
        fps,
        config: { damping: 12, stiffness: 200, mass: 0.8 },
    })

    const opacity = interpolate(frame, [letterDelay, letterDelay + 5], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    })

    // Spread letters evenly
    const spacing = 110
    const totalWidth = (totalLetters - 1) * spacing
    const xOffset = index * spacing - totalWidth / 2

    // Glow pulse after all letters assembled
    const glowOpacity = interpolate(
        frame,
        [PHASES.textHold.start, PHASES.textHold.start + 5, PHASES.textHold.end],
        [0, 1, 0.6],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    )

    // Fade out when video appears
    const textFadeOut = interpolate(
        frame,
        [PHASES.videoReveal.start, PHASES.videoReveal.start + 20],
        [1, 0],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    )

    return (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${xOffset}px), -50%) scale(${scaleSpring})`,
                opacity: opacity * textFadeOut,
                fontSize: 120,
                fontWeight: 900,
                fontFamily: "'Outfit', 'Impact', sans-serif",
                letterSpacing: '-0.02em',
                color: 'white',
                textShadow: `
                    0 0 ${20 * glowOpacity}px ${BABARU_PURPLE},
                    0 0 ${40 * glowOpacity}px ${BABARU_PURPLE},
                    0 0 ${80 * glowOpacity}px ${BABARU_BLUE}
                `,
                userSelect: 'none',
            }}
        >
            {letter}
        </div>
    )
}

// Floating particle
function Particle({ delay, x, y, color, size }: {
    delay: number; x: number; y: number; color: string; size: number
}) {
    const frame = useCurrentFrame()
    const adjustedFrame = Math.max(0, frame - delay)

    const opacity = interpolate(adjustedFrame, [0, 10, 50, 60], [0, 0.7, 0.7, 0], {
        extrapolateRight: 'clamp',
    })

    const yPos = interpolate(adjustedFrame, [0, 60], [y, y - 30], {
        extrapolateRight: 'clamp',
    })

    return (
        <div
            style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${yPos}%`,
                width: size,
                height: size,
                borderRadius: '50%',
                background: color,
                opacity,
                filter: `blur(${size > 4 ? 1 : 0}px)`,
                boxShadow: `0 0 ${size * 2}px ${color}`,
            }}
        />
    )
}

// Main intro composition
export const BabaruIntro: React.FC = () => {
    const frame = useCurrentFrame()

    const letters = 'BABARU'.split('')

    // Overall fade in from black
    const fadeIn = interpolate(frame, [PHASES.fadeIn.start, PHASES.fadeIn.end], [0, 1], {
        extrapolateRight: 'clamp',
    })

    // Video reveal
    const videoOpacity = interpolate(
        frame,
        [PHASES.videoReveal.start, PHASES.videoReveal.start + 15],
        [0, 1],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    )

    // Video zoom (Netflix style — comes close to camera)
    const videoScale = interpolate(
        frame,
        [PHASES.videoReveal.start, PHASES.videoZoom.end],
        [0.6, 1.4],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
    )

    // Final fade out
    const fadeOut = interpolate(
        frame,
        [PHASES.fadeOut.start, PHASES.fadeOut.end],
        [1, 0],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    )

    // Particles data
    const particles = [
        { delay: 20, x: 15, y: 30, color: BABARU_PURPLE, size: 3 },
        { delay: 25, x: 75, y: 25, color: BABARU_PINK, size: 4 },
        { delay: 30, x: 40, y: 70, color: BABARU_BLUE, size: 3 },
        { delay: 35, x: 85, y: 60, color: BABARU_PURPLE, size: 5 },
        { delay: 22, x: 20, y: 55, color: BABARU_PINK, size: 3 },
        { delay: 28, x: 60, y: 20, color: BABARU_BLUE, size: 4 },
        { delay: 32, x: 90, y: 45, color: BABARU_PURPLE, size: 3 },
        { delay: 18, x: 10, y: 75, color: BABARU_PINK, size: 5 },
        { delay: 40, x: 50, y: 15, color: BABARU_BLUE, size: 3 },
        { delay: 45, x: 30, y: 80, color: BABARU_PURPLE, size: 4 },
        { delay: 27, x: 70, y: 40, color: BABARU_PINK, size: 3 },
        { delay: 33, x: 55, y: 65, color: BABARU_BLUE, size: 5 },
    ]

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0a0014',
                opacity: fadeIn * fadeOut,
                overflow: 'hidden',
            }}
        >
            {/* Subtle radial gradient background */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(ellipse at center, ${BABARU_PURPLE}15 0%, transparent 70%)`,
                }}
            />

            {/* Ribbon trails */}
            <RibbonTrail delay={10} color={BABARU_PURPLE} yOffset={-15} direction={1} />
            <RibbonTrail delay={15} color={BABARU_BLUE} yOffset={0} direction={-1} />
            <RibbonTrail delay={12} color={BABARU_PINK} yOffset={10} direction={1} />
            <RibbonTrail delay={18} color={BABARU_PURPLE} yOffset={-5} direction={-1} />
            <RibbonTrail delay={20} color={BABARU_BLUE} yOffset={15} direction={1} />

            {/* Floating particles */}
            {particles.map((p, i) => (
                <Particle key={i} {...p} />
            ))}

            {/* BABARU letters */}
            {letters.map((letter, index) => (
                <Letter
                    key={index}
                    letter={letter}
                    index={index}
                    totalLetters={letters.length}
                />
            ))}

            {/* Babaru wink video */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: videoOpacity,
                    transform: `scale(${videoScale})`,
                }}
            >
                <Video
                    src="/intro-assets/babaru_winks.mp4"
                    startFrom={0}
                    style={{
                        width: '60%',
                        height: 'auto',
                        borderRadius: 24,
                        boxShadow: `0 0 60px ${BABARU_PURPLE}80, 0 0 120px ${BABARU_PURPLE}40`,
                    }}
                />
            </div>

            {/* Vignette overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
                    pointerEvents: 'none',
                }}
            />
        </AbsoluteFill>
    )
}
