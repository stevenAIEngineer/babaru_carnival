import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SpeechBubbleProps {
    children: ReactNode
    variant?: 'default' | 'small' | 'large'
    position?: 'bottom' | 'top' | 'left' | 'right'
}

export default function SpeechBubble({
    children,
    variant = 'default',
    position = 'bottom',
}: SpeechBubbleProps) {
    const sizeClasses = {
        small: 'max-w-48 px-3 py-2 text-sm',
        default: 'max-w-xs px-4 py-3 text-base',
        large: 'max-w-md px-5 py-4 text-lg',
    }

    const tailPositions = {
        bottom: 'after:absolute after:-bottom-3 after:left-6 after:w-0 after:h-0 after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:border-t-[12px] after:border-t-vintage-ink before:absolute before:-bottom-2 before:left-7 before:w-0 before:h-0 before:border-l-[8px] before:border-l-transparent before:border-r-[8px] before:border-r-transparent before:border-t-[10px] before:border-t-white before:z-10',
        top: 'after:absolute after:-top-3 after:left-6 after:w-0 after:h-0 after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:border-b-[12px] after:border-b-vintage-ink before:absolute before:-top-2 before:left-7 before:w-0 before:h-0 before:border-l-[8px] before:border-l-transparent before:border-r-[8px] before:border-r-transparent before:border-b-[10px] before:border-b-white before:z-10',
        left: '',
        right: '',
    }

    return (
        <motion.div
            className={`
        relative bg-white rounded-vintage-lg border-4 border-vintage-ink shadow-vintage
        font-body text-vintage-ink leading-relaxed
        ${sizeClasses[variant]}
        ${tailPositions[position]}
      `}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            {children}
        </motion.div>
    )
}
