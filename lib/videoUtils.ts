/**
 * Detects video URL type and returns embed info for YouTube/Vimeo or direct URL.
 */

export type VideoSourceType = 'youtube' | 'vimeo' | 'direct'

export interface VideoEmbedInfo {
  type: VideoSourceType
  embedUrl?: string
  directUrl?: string
}

export function getVideoEmbedInfo(url: string | null | undefined): VideoEmbedInfo | null {
  if (!url || typeof url !== 'string' || url.trim() === '') return null

  const trimmed = url.trim()

  // YouTube: watch URL or youtu.be
  const ytWatch = trimmed.match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)
  const ytShort = trimmed.match(/^(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/)
  const ytId = ytWatch?.[1] ?? ytShort?.[1]
  if (ytId) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&rel=0`,
    }
  }

  // Vimeo
  const vimeo = trimmed.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo?.[1]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&muted=1&loop=1`,
    }
  }

  // Direct video file (.mp4, etc.)
  return {
    type: 'direct',
    directUrl: trimmed,
  }
}

export function isEmbedVideo(url: string | null | undefined): boolean {
  const info = getVideoEmbedInfo(url)
  return (info?.type === 'youtube' || info?.type === 'vimeo') ?? false
}
