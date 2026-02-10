import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface LetterRevealProps {
    startFrame?: number;
}

const LETTERS = ['B', 'A', 'B', 'A', 'R', 'U'];
const STAGGER = 7; // frames between each letter

export const LetterReveal: React.FC<LetterRevealProps> = ({ startFrame = 30 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // All letters visible by: startFrame + (5 * 7) = startFrame + 35 = frame 65
    // Hold until frame ~90, then scale-up + fade-out transition to hand off to face

    // Phase: text scales up and fades during the transition (90–120)
    const transitionScale = interpolate(
        frame,
        [90, 120],
        [1, 1.4],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    const transitionOpacity = interpolate(
        frame,
        [90, 115],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Don't render after fully faded
    if (frame > 120) return null;

    return (
        <AbsoluteFill
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: transitionOpacity,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    transform: `scale(${transitionScale})`,
                    marginTop: -40,
                }}
            >
                {LETTERS.map((letter, i) => {
                    const letterStart = startFrame + i * STAGGER;
                    const localFrame = frame - letterStart;

                    if (localFrame < 0) return <div key={i} style={{ width: 120 }} />;

                    // Spring scale-in
                    const scaleSpring = spring({
                        frame: localFrame,
                        fps,
                        config: { damping: 11, stiffness: 140, mass: 0.9 },
                    });

                    // Burst glow on arrival
                    const burstGlow = interpolate(
                        localFrame,
                        [0, 4, 18],
                        [0, 1, 0],
                        { extrapolateRight: 'clamp' }
                    );

                    // Y-bounce drop-in
                    const yOffset = interpolate(
                        localFrame,
                        [0, 8, 14],
                        [-50, 0, 0],
                        { extrapolateRight: 'clamp' }
                    );

                    // Gentle pulse during hold phase (70–90)
                    const pulsePhase = frame >= 70 && frame <= 90;
                    const pulse = pulsePhase
                        ? 1 + Math.sin((frame - 70) * 0.25) * 0.04
                        : 1;

                    const opacity = interpolate(
                        localFrame,
                        [0, 5],
                        [0, 1],
                        { extrapolateRight: 'clamp' }
                    );

                    const isBurst = burstGlow > 0.1;

                    return (
                        <div
                            key={i}
                            className={isBurst ? 'letter letter-burst' : 'letter'}
                            style={{
                                fontSize: 180,
                                lineHeight: 1,
                                transform: `scale(${scaleSpring * pulse}) translateY(${yOffset}px)`,
                                opacity,
                                width: 120,
                                textAlign: 'center' as const,
                            }}
                        >
                            {letter}
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
