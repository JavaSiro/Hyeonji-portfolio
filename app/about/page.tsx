import { client } from '@/lib/sanity'
import { ACTRESS_PROFILE_QUERY } from '@/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { AboutContent } from '@/components/AboutContent'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const profile = await client.fetch(ACTRESS_PROFILE_QUERY)

  const portraitUrl = profile?.portraitImage?.asset?.url
    ? urlFor(profile.portraitImage).width(800).url()
    : null

  return (
    <AboutContent
      bio={profile?.bio}
      fullName={profile?.fullName}
      physicalStats={profile?.physicalStats}
      portraitUrl={portraitUrl}
      specialSkills={profile?.specialSkills}
    />
  )
}
