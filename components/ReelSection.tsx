'use client'

import { motion } from 'framer-motion'
import { VideoPlayer } from '@/components/VideoPlayer'

interface ReelSectionProps {
  reelVideoUrl?: string | null
}

export function ReelSection({ reelVideoUrl }: ReelSectionProps) {
  if (!reelVideoUrl || reelVideoUrl.trim() === '') return null

  return (
    <motion.section
      className="flex min-h-[80vh] items-center justify-center px-4 py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="cinema-frame w-full max-w-4xl overflow-hidden rounded-sm bg-black">
        <div className="aspect-video w-full">
          <VideoPlayer
            url={reelVideoUrl}
            variant="cinema"
            className="h-full w-full"
          />
        </div>
      </div>
    </motion.section>
  )
}
