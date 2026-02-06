import { client } from '@/lib/sanity'
import { ACTRESS_PROFILE_QUERY } from '@/lib/queries'
import { Hero } from '@/components/Hero'
import { ReelSection } from '@/components/ReelSection'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const profile = await client.fetch<{
    fullName?: string
    archetype?: string
    heroVideoUrl?: string
    reelVideoUrl?: string
  } | null>(ACTRESS_PROFILE_QUERY)

  return (
    <>
      <Hero
        name={profile?.fullName}
        archetype={profile?.archetype}
        heroVideoUrl={profile?.heroVideoUrl}
      />
      <ReelSection reelVideoUrl={profile?.reelVideoUrl} />
    </>
  )
}
