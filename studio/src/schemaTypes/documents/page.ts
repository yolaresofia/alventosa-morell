import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const page = defineType({
  name: 'page',
  title: 'Página',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Link',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'pageBackgroundColor',
      title: 'Color de fondo de página',
      type: 'color',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Constructor de página',
      type: 'array',
      of: [
        {type: 'introHero'},
        {type: 'about'},
        {type: 'projectViews'},
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
  ],
})
