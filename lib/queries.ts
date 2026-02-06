import { groq } from 'next-sanity'

const blockContentFragment = groq`
  _key,
  _type,
  style,
  listItem,
  markDefs[] {
    _key,
    _type,
    href
  },
  children[] {
    _key,
    _type,
    text,
    marks[]
  }
`

const imageFragment = groq`
  _key,
  _type,
  asset-> {
    _id,
    url,
    metadata {
      lqip,
      dimensions
    }
  },
  alt
`

export const ACTRESS_PROFILE_QUERY = groq`
  *[_type == "actressProfile"][0] {
    _id,
    fullName,
    archetype,
    bio[] {
      ${blockContentFragment}
    },
    physicalStats {
      height,
      eyeColor,
      hairColor,
      unionStatus
    },
    heroVideoUrl,
    reelVideoUrl,
    contactEmail,
    instagramUrl,
    portraitImage {
      ${imageFragment}
    },
    specialSkills,
    representation {
      agentName,
      agencyName,
      contactEmail,
      contactPhone
    }
  }
`

export const GALLERY_QUERY = groq`
  *[_type == "gallery"] | order(_createdAt desc) {
    _id,
    image {
      ${imageFragment}
    },
    caption,
    category
  }
`

export const CREDITS_QUERY = groq`
  *[_type == "credits"] | order(year desc) {
    _id,
    title,
    role,
    productionCompany,
    director,
    year,
    category
  }
`

export const NEWS_QUERY = groq`
  *[_type == "news"] | order(date desc) {
    _id,
    headline,
    date,
    link
  }
`
