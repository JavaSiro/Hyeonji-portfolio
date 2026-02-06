import { DocumentVideoIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const CREDIT_CATEGORIES: { title: string; value: string }[] = [
  { title: 'Film', value: 'film' },
  { title: 'TV', value: 'tv' },
  { title: 'Theater', value: 'theater' },
]

export const creditsType = defineType({
  name: 'credits',
  title: 'Credits',
  type: 'document',
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'productionCompany',
      title: 'Production Company',
      type: 'string',
    }),
    defineField({
      name: 'director',
      title: 'Director',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: CREDIT_CATEGORIES,
        layout: 'dropdown',
      },
    }),
  ],
  preview: {
    select: { title: 'title', role: 'role', category: 'category' },
    prepare({ title, role, category }) {
      return {
        title: title || 'Untitled',
        subtitle: [role, category].filter(Boolean).join(' · '),
      }
    },
  },
})
