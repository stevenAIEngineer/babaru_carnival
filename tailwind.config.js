/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Babaru Brand Colors
                babaru: {
                    blue: '#5B8BD9',
                    'blue-light': '#7DA3E3',
                    'blue-dark': '#4A7AC8',
                    pink: '#FFB6C1',
                    'pink-light': '#FFD1DC',
                    purple: '#8B5CF6',
                    'purple-dark': '#7C3AED',
                    red: '#EF4444',
                    cream: '#FEF7E7',
                    'cream-dark': '#F5E6D3',
                },
                // Vintage Palette
                vintage: {
                    paper: '#F5F0E6',
                    'paper-dark': '#E8E0D0',
                    ink: '#2D2A26',
                    sepia: '#8B7355',
                    gold: '#D4A853',
                    teal: '#3D9A8C',
                },
            },
            fontFamily: {
                display: ['Outfit', 'system-ui', 'sans-serif'],
                body: ['Space Grotesk', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'display-xl': ['4rem', { lineHeight: '1.1', fontWeight: '800' }],
                'display-lg': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
                'display-md': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
            },
            borderRadius: {
                'vintage': '16px',
                'vintage-lg': '24px',
                'vintage-xl': '32px',
            },
            boxShadow: {
                'vintage': '4px 4px 0px #2D2A26',
                'vintage-lg': '6px 6px 0px #2D2A26',
                'vintage-xl': '8px 8px 0px #2D2A26',
                'vintage-hover': '2px 2px 0px #2D2A26',
                'vintage-pink': '4px 4px 0px #FFB6C1',
                'vintage-blue': '4px 4px 0px #5B8BD9',
            },
            animation: {
                'bounce-slow': 'bounce 2s infinite',
                'wiggle': 'wiggle 0.5s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 8s linear infinite',
                'grain': 'grain 0.5s steps(10) infinite',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-2deg)' },
                    '50%': { transform: 'rotate(2deg)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                grain: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '10%': { transform: 'translate(-2%, -2%)' },
                    '20%': { transform: 'translate(2%, 2%)' },
                    '30%': { transform: 'translate(-1%, 1%)' },
                    '40%': { transform: 'translate(1%, -1%)' },
                    '50%': { transform: 'translate(-2%, 2%)' },
                    '60%': { transform: 'translate(2%, -2%)' },
                    '70%': { transform: 'translate(-1%, -1%)' },
                    '80%': { transform: 'translate(1%, 1%)' },
                    '90%': { transform: 'translate(-2%, -1%)' },
                },
            },
            backgroundImage: {
                'grain': "url('/textures/grain.png')",
                'paper': "url('/textures/paper.png')",
                'halftone': "url('/textures/halftone.png')",
            },
        },
    },
    plugins: [],
}
