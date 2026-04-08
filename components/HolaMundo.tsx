'use client';

import { motion } from 'framer-motion';

interface HolaMundoProps {
  title: string;
  subtitle: string;
  animationStyle: 'typewriter' | 'fadeIn' | 'slideUp';
}

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function HolaMundo({ title, subtitle }: HolaMundoProps) {
  const letters = title.split('');

  return (
    <div className="text-center select-none">
      {/* Título animado letra por letra */}
      <motion.h1
        className="text-7xl md:text-9xl font-bold tracking-tight"
        aria-label={title}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block text-white"
            style={{ textShadow: '0 0 40px rgba(255,255,255,0.3)' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subtítulo con fade-in retardado */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: title.length * 0.08 + 0.3, duration: 0.8 }}
        className="mt-6 text-lg text-white/40 font-light tracking-widest uppercase"
      >
        {subtitle}
      </motion.p>

      {/* Línea decorativa */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: title.length * 0.08 + 0.8, duration: 0.6 }}
        className="mt-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto w-64"
      />
    </div>
  );
}
