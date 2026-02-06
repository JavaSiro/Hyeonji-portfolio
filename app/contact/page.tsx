import { client } from '@/lib/sanity'
import { ACTRESS_PROFILE_QUERY } from '@/lib/queries'
import { ContactContent } from '@/components/ContactContent'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const profile = await client.fetch(ACTRESS_PROFILE_QUERY)
  const representation = profile?.representation

  return (
    <ContactContent
      contactEmail={profile?.contactEmail}
      instagramUrl={profile?.instagramUrl}
      agentName={representation?.agentName}
      agencyName={representation?.agencyName}
      representationEmail={representation?.contactEmail}
      contactPhone={representation?.contactPhone}
    />
  )
}
