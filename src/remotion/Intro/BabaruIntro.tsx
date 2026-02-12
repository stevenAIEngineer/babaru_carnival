/**
 * BABARU Intro — Netflix-style cinematic intro
 * @author Steven Lansangan / JC Industries
 *
 * A professional, brand-aligned intro sequence:
 * 1. Dark carnival atmosphere builds
 * 2. "BABARU" title crashes in with cinematic weight
 * 3. Babaru wink video plays as the hero moment
 * 4. Smooth zoom-in like Netflix's "tudum" moment
 *
 * Brand: Dark Carnival × Retro-Futurism
 * Voice: Snarky, confident, theatrical
 * Colors: Purple #8B5CF6, Blue #5B8BD9, Pink #FFB6C1
 */
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    Easing,
    staticFile,
    OffthreadVideo,
} from 'remotion'

// ─── Brand Palette ───
const PURPLE = '#8B5CF6'
const BLUE = '#5B8BD9'
const PINK = '#FFB6C1'
const DEEP_BG = '#08001a'

// ─── Timeline (frames @ 30fps) ───
// Total: 210 frames = 7 seconds
const T = {
    // Phase 1: Atmosphere (0–30)
    atmosphereStart: 0,
    atmosphereEnd: 30,
    // Phase 2: Title slam (25–70)
    titleStart: 25,
    titleLand: 50,
    titleHold: 70,
    // Phase 3: Tagline (60–90)
    taglineStart: 60,
    taglineEnd: 90,
    // Phase 4: Video crossfade (85–120)
    videoFadeIn: 85,
    videoVisible: 105,
    // Phase 5: Video zoom (120–185)
    zoomStart: 120,
    zoomEnd: 185,
    // Phase 6: Fade out (180–210)
    fadeStart: 180,
    fadeEnd: 210,
}

// ═══════════════════════════════════════════
//  COMPONENT: Ambient glow pulses
// ═══════════════════════════════════════════
function AmbientGlow() {
    const frame = useCurrentFrame()

    const pulse = interpolate(frame % 60, [0, 30, 60], [0.15, 0.35, 0.15])
    const drift = interpolate(frame, [0, 210], [0, 20], { extrapolateRight: 'clamp' })

    return (
        <>
            {/* Center purple glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    width: 800,
                    height: 800,
                    transform: `translate(-50%, -50%) translateY(${drift}px)`,
                    background: `radial-gradient(ellipse, ${PURPLE}${Math.round(pulse * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
                    filter: 'blur(60px)',
                }}
            />
            {/* Side blue accents */}
            <div
                style={{
                    position: 'absolute',
                    top: '60%',
                    left: '20%',
                    width: 400,
                    height: 400,
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(ellipse, ${BLUE}20 0%, transparent 70%)`,
                    filter: 'blur(80px)',
                    opacity: pulse * 0.8,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '30%',
                    right: '15%',
                    width: 300,
                    height: 300,
                    background: `radial-gradient(ellipse, ${PINK}15 0%, transparent 70%)`,
                    filter: 'blur(70px)',
                    opacity: pulse * 0.6,
                }}
            />
        </>
    )
}

// ═══════════════════════════════════════════
//  COMPONENT: Floating dust particles
// ═══════════════════════════════════════════
const DUST_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 37 + 13) % 100,
    y: (i * 53 + 7) % 100,
    size: 2 + (i % 3),
    speed: 0.3 + (i % 5) * 0.15,
    delay: i * 3,
    color: i % 3 === 0 ? PURPLE : i % 3 === 1 ? BLUE : PINK,
}))

function DustParticles() {
    const frame = useCurrentFrame()

    return (
        <>
            {DUST_PARTICLES.map((p, i) => {
                const adjustedFrame = Math.max(0, frame - p.delay)
                const opacity = interpolate(adjustedFrame, [0, 15, 150, 180], [0, 0.5, 0.5, 0], {
                    extrapolateRight: 'clamp',
                })
                const yDrift = p.y - adjustedFrame * p.speed * 0.3

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${p.x}%`,
                            top: `${yDrift}%`,
                            width: p.size,
                            height: p.size,
                            borderRadius: '50%',
                            background: p.color,
                            opacity,
                            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                        }}
                    />
                )
            })}
        </>
    )
}

// ═══════════════════════════════════════════
//  COMPONENT: Horizontal light streak
// ═══════════════════════════════════════════
function LightStreak({
    delay,
    y,
    color,
    direction,
}: {
    delay: number
    y: string
    color: string
    direction: 'left' | 'right'
}) {
    const frame = useCurrentFrame()
    const { width } = useVideoConfig()
    const adjustedFrame = Math.max(0, frame - delay)

    const progress = interpolate(adjustedFrame, [0, 25], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    })

    const opacity = interpolate(adjustedFrame, [0, 8, 20, 28], [0, 0.6, 0.6, 0], {
        extrapolateRight: 'clamp',
    })

    const xStart = direction === 'right' ? -600 : width + 200
    const xEnd = direction === 'right' ? width + 200 : -600
    const x = interpolate(progress, [0, 1], [xStart, xEnd])

    return (
        <div
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: 500,
                height: 2,
                background: `linear-gradient(${direction === 'right' ? '90deg' : '270deg'}, transparent, ${color}, transparent)`,
                opacity,
                filter: `blur(1px)`,
                boxShadow: `0 0 20px ${color}60`,
            }}
        />
    )
}

// ═══════════════════════════════════════════
//  COMPONENT: Title "BABARU" — cinematic slam
// ═══════════════════════════════════════════
function Title() {
    const frame = useCurrentFrame()
    const { fps } = useVideoConfig()

    // Title slams in from above with spring physics
    const titleSpring = spring({
        frame: frame - T.titleStart,
        fps,
        config: { damping: 14, stiffness: 180, mass: 1.2 },
    })

    const titleY = interpolate(titleSpring, [0, 1], [-120, 0])
    const titleScale = interpolate(titleSpring, [0, 1], [1.3, 1])
    const titleOpacity = interpolate(frame, [T.titleStart, T.titleStart + 5], [0, 1], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    })

    // Title fades out for video reveal
    const titleFadeOut = interpolate(frame, [T.videoFadeIn, T.videoFadeIn + 20], [1, 0], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    })

    // Glow pulse after landing
    const glowIntensity = interpolate(
        frame,
        [T.titleLand, T.titleLand + 10, T.titleHold],
        [0, 1, 0.5],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    )

    return (
        <div
            style={{
                position: 'absolute',
                top: '42%',
                left: '50%',
                transform: `translate(-50%, -50%) translateY(${titleY}px) scale(${titleScale})`,
                opacity: titleOpacity * titleFadeOut,
                textAlign: 'center',
            }}
        >
            {/* Main title */}
            <div
                style={{
                    fontSize: 140,
                    fontWeight: 900,
                    fontFamily: "'Outfit', 'Arial Black', sans-serif",
                    letterSpacing: '0.15em',
                    color: 'white',
                    textShadow: `
                        0 0 ${30 * glowIntensity}px ${PURPLE},
                        0 0 ${60 * glowIntensity}px ${PURPLE}80,
                        0 4px 0 ${PURPLE}40
                    `,
                    lineHeight: 1,
                }}
            >
                BABARU
            </div>

            {/* Subtle underline accent */}
            <div
                style={{
                    width: interpolate(titleSpring, [0, 1], [0, 400]),
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${PURPLE}, ${BLUE}, transparent)`,
                    margin: '16px auto 0',
                    opacity: glowIntensity,
                    borderRadius: 2,
                }}
            />
        </div>
    )
}

// ═══════════════════════════════════════════
//  COMPONENT: Tagline
// ═══════════════════════════════════════════
function Tagline() {
    const frame = useCurrentFrame()
    const { fps } = useVideoConfig()

    const tagSpring = spring({
        frame: frame - T.taglineStart,
        fps,
        config: { damping: 18, stiffness: 120, mass: 0.8 },
    })

    const fadeOut = interpolate(frame, [T.videoFadeIn, T.videoFadeIn + 15], [1, 0], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    })

    return (
        <div
            style={{
                position: 'absolute',
                top: '58%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: tagSpring * fadeOut,
                textAlign: 'center',
            }}
        >
            <div
                style={{
                    fontSize: 28,
                    fontWeight: 400,
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    color: `${PURPLE}cc`,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                }}
            >
                The AI that remembers you
            </div>
        </div>
    )
}

// ═══════════════════════════════════════════
//  COMPONENT: Video reveal with zoom
// ═══════════════════════════════════════════
function VideoReveal() {
    const frame = useCurrentFrame()

    const videoOpacity = interpolate(
        frame,
        [T.videoFadeIn, T.videoVisible],
        [0, 1],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    )

    // Smooth zoom like Netflix — starts small, slowly grows
    const scale = interpolate(
        frame,
        [T.videoFadeIn, T.zoomEnd],
        [0.65, 1.15],
        {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }
    )

    // Subtle glow ring around video
    const glowPulse = interpolate(frame % 40, [0, 20, 40], [0.3, 0.6, 0.3])

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: videoOpacity,
            }}
        >
            <div
                style={{
                    transform: `scale(${scale})`,
                    borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: `
                        0 0 ${40 * glowPulse}px ${PURPLE}60,
                        0 0 ${80 * glowPulse}px ${PURPLE}30,
                        0 0 ${120 * glowPulse}px ${BLUE}20
                    `,
                    border: `2px solid ${PURPLE}30`,
                }}
            >
                <OffthreadVideo
                    src={staticFile('intro-assets/babaru_winks.mp4')}
                    style={{
                        width: 720,
                        height: 'auto',
                        display: 'block',
                    }}
                />
            </div>
        </div>
    )
}

// ═══════════════════════════════════════════
//  MAIN COMPOSITION
// ═══════════════════════════════════════════
export const BabaruIntro: React.FC = () => {
    const frame = useCurrentFrame()

    // Global fade in
    const fadeIn = interpolate(frame, [T.atmosphereStart, T.atmosphereStart + 20], [0, 1], {
        extrapolateRight: 'clamp',
    })

    // Global fade out
    const fadeOut = interpolate(frame, [T.fadeStart, T.fadeEnd], [1, 0], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    })

    return (
        <AbsoluteFill
            style={{
                backgroundColor: DEEP_BG,
                opacity: fadeIn * fadeOut,
                overflow: 'hidden',
            }}
        >
            {/* Layer 1: Ambient atmosphere */}
            <AmbientGlow />

            {/* Layer 2: Dust particles */}
            <DustParticles />

            {/* Layer 3: Light streaks */}
            <LightStreak delay={15} y="35%" color={PURPLE} direction="right" />
            <LightStreak delay={20} y="50%" color={BLUE} direction="left" />
            <LightStreak delay={25} y="65%" color={PINK} direction="right" />

            {/* Layer 4: Title */}
            <Title />

            {/* Layer 5: Tagline */}
            <Tagline />

            {/* Layer 6: Video reveal */}
            <VideoReveal />

            {/* Layer 7: Vignette */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Layer 8: Film grain */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.04,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    pointerEvents: 'none',
                }}
            />
        </AbsoluteFill>
    )
}
