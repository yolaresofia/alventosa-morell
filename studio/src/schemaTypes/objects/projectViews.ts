import { defineField, defineType } from 'sanity'
import { DocumentsIcon } from '@sanity/icons'

export const projectViews = defineType({
  name: 'projectViews',
  title: 'Vista de projectes',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'projects',
      title: 'Projectes',
      type: 'array',
      of: [{ type: 'projectMin' }],
    }),
  ],
})