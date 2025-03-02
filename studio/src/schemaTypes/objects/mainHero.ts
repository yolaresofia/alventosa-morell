import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const mainHero = defineType({
  name: 'mainHero',
  title: 'Main Hero',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'theme',
      title: 'Tema',
      type: 'string',
      options: {
        list: [
          {title: 'Dark', value: 'darkTheme'},
          {title: 'Light', value: 'lightTheme'},
        ],
        layout: 'radio',
      },
      initialValue: 'darkTheme',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imágen de fondo',
      type: 'image',
    }),
    defineField({
      name: 'backgroundImageAltText',
      title: 'Texto alternativo',
      description: 'Esencial para accesibilidad y SEO',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'logoAltText',
      title: 'Texto alternativo',
      description: 'Esencial para accesibilidad y SEO',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      backgroundImage: 'backgroundImage',
      logo: 'logo',
    },
    prepare({backgroundImage, logo}) {
      return {
        title: 'Main Hero Section',
        subtitle: 'Background & Logo Config',
        media: logo || backgroundImage || TextIcon, // Prefer logo > background > fallback icon
      }
    },
  },
})
