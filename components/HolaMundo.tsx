'use client';

import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

interface HolaMundoProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function HolaMundo({ title, subtitle, description }: HolaMundoProps) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-600/20 blur-[100px] rounded-full point-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-cyan-500/10 blur-[80px] rounded-full point-events-none" />

      {/* Main Title */}
      <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-4">
        <AnimatedText 
          text={title} 
          className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          textShadow="0 0 40px rgba(139, 92, 246, 0.4)" 
        />
      </h1>

      {/* Dynamic Line Separator */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1, ease: "anticipate" }}
        className="h-[2px] w-48 md:w-80 bg-gradient-to-r from-transparent via-violet-400 to-transparent my-6"
      />

      {/* Subtitle */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        className="font-sans text-xl md:text-2xl text-violet-200/80 mb-6 tracking-wide"
      >
        {subtitle}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="font-sans text-base md:text-lg text-white/50 max-w-lg mx-auto"
      >
        {description}
      </motion.p>
    </div>
  );
}
