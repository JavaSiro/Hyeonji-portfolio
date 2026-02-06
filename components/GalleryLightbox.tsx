'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface GalleryImage {
  _id: string
  image?: {
    asset?: { url?: string }
    alt?: string
  }
  caption?: string | null
  category?: string | null
}

interface GalleryLightboxProps {
  items: GalleryImage[]
  imageBuilder: (source: { asset?: { url?: string } }) => { width: (w: number) => { url: () => string } }
}

export function GalleryLightbox({ items, imageBuilder }: GalleryLightboxProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = items.find((i) => i._id === selectedId)

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const url = item.image?.asset?.url
          if (!url || !item.image) return null
          const src = imageBuilder(item.image).width(1200).url()
          return (
            <motion.button
              key={item._id}
              type="button"
              className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              onClick={() => setSelectedId(item._id)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={src}
                alt={item.image?.alt || item.caption || 'Gallery image'}
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
          )
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedId(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full p-2 text-white hover:bg-white/10"
              onClick={() => setSelectedId(null)}
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
              {selected.image?.asset?.url && (
                <img
                  src={imageBuilder(selected.image).width(1920).url()}
                  alt={selected.image?.alt || selected.caption || 'Gallery image'}
                  className="max-h-[90vh] w-auto rounded-sm object-contain"
                />
              )}
              {selected.caption && (
                <p className="mt-4 text-center font-serif text-[#A1A1AA]">
                  {selected.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
