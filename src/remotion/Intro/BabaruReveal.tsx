import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from 'remotion';

interface BabaruRevealProps {
    startFrame?: number;
}

// Corrected frame-to-image mapping based on actual sprite analysis.
// Sequence: neutral → wink build → full wink → recovery → hero pose → settle
// Frame 4 is SKIPPED — it's a neutral reset that breaks the smooth wink progression.
const FRAME_SEQUENCE = [
    { img: '1.png', holdFrames: 8 },   // Neutral smile — entrance hold
    { img: '2.png', holdFrames: 3 },   // Right eye starts closing, smirk
    { img: '3.png', holdFrames: 3 },   // Half-closed, bigger smirk
    { img: '5.png', holdFrames: 3 },   // Mostly closed, pleased (skip frame 4)
    { img: '6.png', holdFrames: 3 },   // Squinting, confident smirk
    { img: '7.png', holdFrames: 8 },   // FULL WINK — peak, held longest
    { img: '8.png', holdFrames: 3 },   // Both eyes recovering
    { img: '9.png', holdFrames: 3 },   // Half-lidded, subtle smile
    { img: '10.png', holdFrames: 3 },   // Wide open, warm smile
    { img: '11.png', holdFrames: 25 },  // HERO POSE — sparkly wide eyes, big smile, held as final
    { img: '12.png', holdFrames: 10 },  // Gentle settle into zoom
];

function getFrameImage(localFrame: number): string {
    let accumulated = 0;
    for (const entry of FRAME_SEQUENCE) {
        accumulated += entry.holdFrames;
        if (localFrame < accumulated) {
            return entry.img;
        }
    }
    // Default to hero pose if past all frames
    return '11.png';
}

export const BabaruReveal: React.FC<BabaruRevealProps> = ({ startFrame = 100 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const localFrame = frame - startFrame;
    if (localFrame < 0) return null;

    // ── Phase 3: Scale-in entrance with spring ──
    const scaleIn = spring({
        frame: localFrame,
        fps,
        config: { damping: 12, stiffness: 80, mass: 1.4 },
    });

    // Opacity fade-in
    const opacity = interpolate(
        localFrame,
        [0, 12],
        [0, 1],
        { extrapolateRight: 'clamp' }
    );

    // ── Phase 5: Netflix zoom-in (frames 185–230 absolute = 85–130 local) ──
    const zoomStart = 185 - startFrame; // local frame where zoom begins
    const zoomEnd = 230 - startFrame;   // local frame where zoom ends

    const netflixZoom = interpolate(
        localFrame,
        [zoomStart, zoomEnd],
        [1, 6],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // During zoom, slowly move the character upward (into the face)
    const zoomTranslateY = interpolate(
        localFrame,
        [zoomStart, zoomEnd],
        [0, -120],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Glow intensity ramps up during wink and zoom
    const glowIntensity = interpolate(
        localFrame,
        [0, 20, 50, zoomStart, zoomEnd],
        [0.2, 0.3, 0.4, 0.5, 0.8],
        { extrapolateRight: 'clamp' }
    );

    // Get current sprite frame
    const currentImage = getFrameImage(localFrame);

    // Combined scale: spring entrance * Netflix zoom
    const combinedScale = scaleIn * netflixZoom;

    return (
        <AbsoluteFill
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity,
                zIndex: 5,
            }}
        >
            <div
                style={{
                    transform: `scale(${combinedScale}) translateY(${zoomTranslateY}px)`,
                    position: 'relative',
                    transformOrigin: 'center 40%', // zoom into face area
                }}
            >
                {/* Warm glow halo behind Babaru */}
                <div
                    style={{
                        position: 'absolute',
                        inset: -60,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, rgba(139,92,246,${glowIntensity}) 0%, rgba(245,158,11,${glowIntensity * 0.3}) 50%, transparent 75%)`,
                        filter: 'blur(30px)',
                    }}
                />
                <Img
                    src={staticFile(`intro-assets/${currentImage}`)}
                    style={{
                        width: 500,
                        height: 500,
                        objectFit: 'contain',
                        position: 'relative',
                        zIndex: 1,
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
