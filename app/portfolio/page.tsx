import { client } from '@/lib/sanity'
import { GALLERY_QUERY, CREDITS_QUERY } from '@/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { CreditsTable } from '@/components/CreditsTable'
import { LookbookSection } from '@/components/LookbookSection'

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
  const [gallery, credits] = await Promise.all([
    client.fetch<GalleryItemRaw[]>(GALLERY_QUERY),
    client.fetch<Credit[]>(CREDITS_QUERY),
  ])

  const galleryRaw = Array.isArray(gallery) ? gallery : []
  const creditsList = Array.isArray(credits) ? credits : []

  const galleryWithUrls: GalleryItemWithUrls[] = galleryRaw
    .filter((item) => item.image?.asset?.url)
    .map((item) => ({
      _id: item._id,
      // Force high-quality encoding from Sanity CDN (q=100) at the same widths
      imageUrl: urlFor(item.image!).width(1200).quality(100).url(),
      imageUrlLarge: urlFor(item.image!).width(1920).quality(100).url(),
      caption: item.caption ?? null,
      category: item.category ?? null,
      alt: item.image?.alt ?? null,
    }))

  return (
    <div className="pt-24">
      <LookbookSection items={galleryWithUrls} />
      <CreditsTable credits={creditsList} />
    </div>
  )
}
