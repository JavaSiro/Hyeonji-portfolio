import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const newsType = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Link to external article',
    }),
  ],
  preview: {
    select: { headline: 'headline', date: 'date' },
    prepare({ headline, date }) {
      return {
        title: headline || 'Untitled',
        subtitle: date ? new Date(date).toLocaleDateString() : undefined,
      }
    },
  },
})
