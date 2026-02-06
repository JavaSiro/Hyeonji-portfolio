'use client'

import { getVideoEmbedInfo } from '@/lib/videoUtils'

interface VideoPlayerProps {
  url: string | null | undefined
  /** For hero: full-bleed, autoplay muted loop. For cinema: aspect box with controls. */
  variant?: 'background' | 'cinema'
  className?: string
}

export function VideoPlayer({ url, variant = 'cinema', className = '' }: VideoPlayerProps) {
  const info = getVideoEmbedInfo(url)
  if (!info) return null

  if (info.type === 'youtube' || info.type === 'vimeo') {
    const isBackground = variant === 'background'
    return (
      <iframe
        src={
          isBackground
            ? `${info.embedUrl}&controls=0&showinfo=0`
            : info.embedUrl?.replace('autoplay=1', 'autoplay=0') ?? ''
        }
        title="Video"
        className={className}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          border: 'none',
          ...(isBackground
            ? { position: 'absolute', inset: 0, width: '100%', height: '100%' }
            : { width: '100%', height: '100%', display: 'block' }),
        }}
      />
    )
  }

  if (info.type === 'direct' && info.directUrl) {
    const isBackground = variant === 'background'
    return (
      <video
        src={info.directUrl}
        autoPlay={isBackground}
        muted={isBackground}
        loop={isBackground}
        playsInline
        controls={!isBackground}
        preload={isBackground ? 'auto' : 'metadata'}
        className={className}
        style={isBackground ? { objectFit: 'cover' } : undefined}
      />
    )
  }

  return null
}
