import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const actressProfileType = defineType({
  name: 'actressProfile',
  title: 'Actress Profile',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'archetype',
      title: 'Archetype',
      type: 'string',
      description: "e.g. 'The Method Sophisticate'",
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
    }),
    defineField({
      name: 'physicalStats',
      title: 'Physical Stats',
      type: 'object',
      fields: [
        defineField({ name: 'height', title: 'Height', type: 'string' }),
        defineField({ name: 'eyeColor', title: 'Eye Color', type: 'string' }),
        defineField({ name: 'hairColor', title: 'Hair Color', type: 'string' }),
        defineField({
          name: 'unionStatus',
          title: 'Union Status',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Video URL',
      type: 'url',
      description: 'URL for the full-viewport hero background video',
    }),
    defineField({
      name: 'reelVideoUrl',
      title: 'Reel Video URL',
      type: 'url',
      description: 'URL for the quick-access reel on the home page',
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'specialSkills',
      title: 'Special Skills',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Stage Combat, Languages, Accents',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Primary contact email (displayed on Contact page)',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      description: 'Instagram profile link',
    }),
    defineField({
      name: 'representation',
      title: 'Representation',
      type: 'object',
      fields: [
        defineField({
          name: 'agentName',
          title: 'Agent Name',
          type: 'string',
        }),
        defineField({
          name: 'agencyName',
          title: 'Agency Name',
          type: 'string',
        }),
        defineField({
          name: 'contactEmail',
          title: 'Contact Email',
          type: 'string',
        }),
        defineField({
          name: 'contactPhone',
          title: 'Contact Phone',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: { fullName: 'fullName' },
    prepare({ fullName }) {
      return { title: fullName || 'Actress Profile', subtitle: 'Profile' }
    },
  },
})
