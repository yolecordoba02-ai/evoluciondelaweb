'use client';

import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
  textShadow?: string;
}

const letterVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function AnimatedText({ text, delay = 0, className = '', textShadow }: AnimatedTextProps) {
  const letters = text.split('');

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={i + delay} // Stagger start index
          variants={letterVariants}
          className="inline-block"
          style={textShadow ? { textShadow } : undefined}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
