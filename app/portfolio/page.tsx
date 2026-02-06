import { client } from '@/lib/sanity'
import { GALLERY_QUERY, CREDITS_QUERY, ACTRESS_PROFILE_QUERY } from '@/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { CreditsTable } from '@/components/CreditsTable'
import { LookbookSection } from '@/components/LookbookSection'
import { ReelSection } from '@/components/ReelSection'

export const dynamic = 'force-dynamic'

interface GalleryItemRaw {
  _id: string
  image?: { asset?: { url?: string }; alt?: string }
  caption?: string | null
  category?: string | null
}

export interface GalleryItemWithUrls {
  _id: string
  imageUrl: string
  imageUrlLarge: string
  caption?: string | null
  category?: string | null
  alt?: string | null
}

interface Credit {
  _id: string
  title?: string | null
  role?: string | null
  productionCompany?: string | null
  director?: string | null
  year?: string | null
  category?: string | null
}

export default async function PortfolioPage() {
  const [profile, gallery, credits] = await Promise.all([
    client.fetch<{ reelVideoUrl?: string | null } | null>(ACTRESS_PROFILE_QUERY),
    client.fetch<GalleryItemRaw[]>(GALLERY_QUERY),
    client.fetch<Credit[]>(CREDITS_QUERY),
  ])

  const galleryRaw = Array.isArray(gallery) ? gallery : []
  const creditsList = Array.isArray(credits) ? credits : []
  const reelVideoUrl = profile?.reelVideoUrl ?? null

  const galleryWithUrls: GalleryItemWithUrls[] = galleryRaw
    .filter((item) => item.image?.asset?.url)
    .map((item) => ({
      _id: item._id,
      imageUrl: urlFor(item.image!).width(1200).url(),
      imageUrlLarge: urlFor(item.image!).width(1920).url(),
      caption: item.caption ?? null,
      category: item.category ?? null,
      alt: item.image?.alt ?? null,
    }))

  return (
    <div className="pt-24">
      <LookbookSection items={galleryWithUrls} />
      {reelVideoUrl && <ReelSection reelVideoUrl={reelVideoUrl} />}
      <CreditsTable credits={creditsList} />
    </div>
  )
}
