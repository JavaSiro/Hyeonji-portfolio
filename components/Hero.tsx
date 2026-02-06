'use client'

import { motion } from 'framer-motion'
import { VideoPlayer } from '@/components/VideoPlayer'

interface HeroProps {
  name?: string | null
  archetype?: string | null
  heroVideoUrl?: string | null
}

export function Hero({ name, archetype, heroVideoUrl }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {heroVideoUrl ? (
        <div className="absolute inset-0 h-full w-full">
          <VideoPlayer
            url={heroVideoUrl}
            variant="background"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#0a0a0a]" />
      )}
      <div className="absolute inset-0 bg-[#050505]/50" />
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="font-serif text-5xl font-medium tracking-wide text-white sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {name || 'Your Name'}
        </motion.h1>
        <motion.p
          className="mt-4 font-serif text-xl tracking-[0.3em] text-[#D4AF37] sm:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          {archetype || 'The Method Sophisticate'}
        </motion.p>
      </div>
    </section>
  )
}
