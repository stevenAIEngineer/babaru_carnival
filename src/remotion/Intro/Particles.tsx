import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    delay: number;
    color: string;
}

// Deterministic seeded particles — reduced from 40 to 25 for cleaner look
const PARTICLES: Particle[] = Array.from({ length: 25 }, (_, i) => {
    const seed = (i * 7919 + 104729) % 100000;
    const colors = [
        'rgba(139, 92, 246, 0.6)',  // purple
        'rgba(245, 158, 11, 0.5)',  // gold
        'rgba(255, 255, 255, 0.4)', // white
        'rgba(167, 139, 250, 0.5)', // light purple
        'rgba(236, 72, 153, 0.4)',  // pink
    ];
    return {
        id: i,
        x: (seed % 1920),
        y: ((seed * 3) % 1080),
        size: 2 + (seed % 5),
        speed: 0.4 + ((seed % 25) / 10),
        delay: (seed % 50),
        color: colors[i % colors.length],
    };
});

// Burst particles that appear when Babaru's face arrives (around frame 100)
const BURST_PARTICLES: Particle[] = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const colors = [
        'rgba(245, 158, 11, 0.8)',  // gold
        'rgba(139, 92, 246, 0.8)',  // purple
        'rgba(255, 255, 255, 0.7)', // white
    ];
    return {
        id: 100 + i,
        x: 960 + Math.cos(angle) * 50,  // centered
        y: 540 + Math.sin(angle) * 50,
        size: 3 + (i % 4),
        speed: 1.5 + (i % 3) * 0.5,
        delay: 0,
        color: colors[i % colors.length],
    };
});

export const Particles: React.FC<{ startFrame?: number }> = ({ startFrame = 20 }) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
            {/* Ambient particles */}
            {PARTICLES.map((p) => {
                const localFrame = frame - startFrame - p.delay;
                if (localFrame < 0) return null;

                const opacity = interpolate(
                    localFrame,
                    [0, 15, 180, 210],
                    [0, 0.7, 0.7, 0],
                    { extrapolateRight: 'clamp' }
                );

                const yOffset = Math.sin(localFrame / (8 * p.speed)) * 20;
                const xDrift = Math.cos(localFrame / (12 * p.speed)) * 10;
                const floatY = -localFrame * p.speed * 0.25;

                return (
                    <div
                        key={p.id}
                        className="particle"
                        style={{
                            left: p.x + xDrift,
                            top: p.y + yOffset + floatY,
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            opacity,
                            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                        }}
                    />
                );
            })}

            {/* Burst particles when face appears */}
            {BURST_PARTICLES.map((p) => {
                const burstStart = 100; // absolute frame when face enters
                const localFrame = frame - burstStart;
                if (localFrame < 0 || localFrame > 40) return null;

                const angle = ((p.id - 100) / 12) * Math.PI * 2;
                const burstRadius = localFrame * p.speed * 8;

                const opacity = interpolate(
                    localFrame,
                    [0, 5, 25, 40],
                    [0, 1, 0.6, 0],
                    { extrapolateRight: 'clamp' }
                );

                const burstScale = interpolate(
                    localFrame,
                    [0, 10, 40],
                    [0.5, 1.2, 0.3],
                    { extrapolateRight: 'clamp' }
                );

                return (
                    <div
                        key={p.id}
                        className="particle"
                        style={{
                            left: p.x + Math.cos(angle) * burstRadius,
                            top: p.y + Math.sin(angle) * burstRadius,
                            width: p.size * burstScale,
                            height: p.size * burstScale,
                            backgroundColor: p.color,
                            opacity,
                            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};
