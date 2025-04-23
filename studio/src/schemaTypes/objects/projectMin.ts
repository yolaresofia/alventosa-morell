import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const projectMin = defineType({
  name: 'projectMin',
  title: 'Projecte Miniatura',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'projectNumber',
      title: 'Número de projecte',
      type: 'string',
    }),

    defineField({
      name: 'projectName',
      title: 'Nom del projecte',
      type: 'string',
    }),

    defineField({
      name: 'program',
      title: 'Programa',
      type: 'string',
    }),

    defineField({
      name: 'location',
      title: 'Ubicació',
      type: 'string',
    }),

    defineField({
      name: 'area',
      title: 'Superfície',
      type: 'string',
    }),

    defineField({
      name: 'year',
      title: 'Any',
      type: 'string',
    }),

    defineField({
      name: 'miniaturePhoto',
      title: 'Foto miniatura',
      type: 'image',
      options: {hotspot: true},
    }),
  ],

  preview: {
    select: {
      title: 'projectName.value',
      subtitle: 'year.value',
      media: 'miniaturePhoto',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Projecte Miniatura',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
