'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'

export interface LookbookItem {
  _id: string
  imageUrl: string
  imageUrlLarge: string
  caption?: string | null
  category?: string | null
  alt?: string | null
}

interface LookbookSectionProps {
  items: LookbookItem[]
}

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'headshot', label: 'Headshot' },
  { value: 'theatrical', label: 'Theatrical' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'behindTheScenes', label: 'Behind the Scenes' },
]

export function LookbookSection({ items }: LookbookSectionProps) {
  const [filter, setFilter] = useState('')
  const [lightboxId, setLightboxId] = useState<string | null>(null)

  const filtered = filter
    ? items.filter((i) => (i.category || '').toLowerCase() === filter.toLowerCase())
    : items

  const lightboxItem = items.find((i) => i._id === lightboxId)

  return (
    <motion.section
      className="px-4 py-16 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-serif text-3xl font-medium text-white md:text-4xl">
        Lookbook
      </h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value || 'all'}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded border px-4 py-2 text-sm transition ${
              filter === value
                ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                : 'border-[#333] text-[#A1A1AA] hover:border-[#555] hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <motion.button
            key={item._id}
            type="button"
            className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            onClick={() => setLightboxId(item._id)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={item.imageUrl}
              alt={item.alt || item.caption || 'Gallery'}
              fill
              className="object-cover transition duration-300 group-hover:opacity-90"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition opacity group-hover:opacity-100" />
            {item.caption && (
              <p className="absolute bottom-0 left-0 right-0 p-3 text-left text-sm text-white opacity-0 transition opacity group-hover:opacity-100">
                {item.caption}
              </p>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxId(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full p-2 text-white hover:bg-white/10"
              onClick={() => setLightboxId(null)}
              aria-label="Close"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-h-[90vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxItem.imageUrlLarge}
                alt={lightboxItem.alt || lightboxItem.caption || 'Gallery'}
                className="max-h-[90vh] w-auto rounded-sm object-contain"
              />
              {lightboxItem.caption && (
                <p className="mt-4 text-center font-serif text-[#A1A1AA]">
                  {lightboxItem.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
