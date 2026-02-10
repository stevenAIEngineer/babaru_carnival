import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LetterReveal } from './LetterReveal';
import { BabaruReveal } from './BabaruReveal';
import { Particles } from './Particles';
import '../styles.css';

export interface BabaruIntroProps {
    episodeTitle?: string;
    colorAccent?: string;
}

export const BabaruIntro: React.FC<BabaruIntroProps> = ({
    episodeTitle,
    colorAccent,
}) => {
    const frame = useCurrentFrame();

    // ── Phase 1: Background fade-in (0–30) ──
    const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // ── Phase 5–6: Netflix zoom fade to black (215–240) ──
    const zoomFade = interpolate(frame, [215, 235], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Final black-out
    const finalBlack = interpolate(frame, [235, 240], [1, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Subtle vignette pulse
    const vignettePulse = 0.7 + Math.sin(frame / 25) * 0.05;

    // Episode title fade-in during zoom phase
    const titleOpacity = episodeTitle
        ? interpolate(frame, [200, 215, 230, 240], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        })
        : 0;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0a0015',
                opacity: bgOpacity,
            }}
        >
            {/* Deep purple radial background */}
            <AbsoluteFill
                className="intro-bg"
                style={{
                    opacity: bgOpacity,
                }}
            />

            {/* Animated vignette overlay */}
            <AbsoluteFill
                style={{
                    background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${vignettePulse}) 100%)`,
                }}
            />

            {/* Particles throughout (from frame 20) */}
            <Particles startFrame={20} />

            {/* Phase 2: "BABARU" letter reveal (30–120) */}
            <LetterReveal startFrame={30} />

            {/* Phase 3–5: Babaru character reveal + wink + zoom (100+) */}
            <BabaruReveal startFrame={100} />

            {/* Episode title (appears during zoom phase) */}
            {episodeTitle && (
                <AbsoluteFill
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingBottom: 120,
                        opacity: titleOpacity,
                        zIndex: 10,
                    }}
                >
                    <div
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 36,
                            fontWeight: 700,
                            color: colorAccent || '#F59E0B',
                            textShadow: '0 0 30px rgba(245, 158, 11, 0.6), 0 0 60px rgba(245, 158, 11, 0.3)',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase' as const,
                        }}
                    >
                        {episodeTitle}
                    </div>
                </AbsoluteFill>
            )}

            {/* Netflix zoom: fade to black overlay */}
            <AbsoluteFill
                style={{
                    backgroundColor: '#000',
                    opacity: zoomFade,
                    zIndex: 20,
                }}
            />
        </AbsoluteFill>
    );
};
