import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const GALLERY_CATEGORIES: { title: string; value: string }[] = [
  { title: 'Headshot', value: 'headshot' },
  { title: 'Theatrical', value: 'theatrical' },
  { title: 'Commercial', value: 'commercial' },
  { title: 'Behind the Scenes', value: 'behindTheScenes' },
]

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
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
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: GALLERY_CATEGORIES,
        layout: 'dropdown',
      },
    }),
  ],
  preview: {
    select: { media: 'image', caption: 'caption', category: 'category' },
    prepare({ media, caption, category }) {
      return {
        title: caption || 'Untitled',
        subtitle: category,
        media,
      }
    },
  },
})
