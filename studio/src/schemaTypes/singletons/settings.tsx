import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your site.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainNavigation',
      title: 'Navegación principal',
      type: 'object',
      description: 'Añade el logo de la empresa en formato SVG y la información de la barra de navegación.',
      fields: [
        defineField({
          name: 'lightLogo',
          title: 'Logo Claro',
          type: 'image',
        }),
        defineField({
          name: 'darkLogo',
          title: 'Logo Oscuro',
          type: 'image',
        }),
        defineField({
          name: 'secondColumnNav',
          title: 'Segunda Columna Navegación',
          type: 'blockContent',
          description: 'Añade la información de la segunda columna de la barra de navegación.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'thirdColumnNav',
          title: 'Tercera Columna Navegación',
          type: 'blockContent',
          description: 'Añade la información de la tercera columna de la barra de navegación.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'navLinks',
          title: 'Links de navegación',
          description: 'Añade los links de la barra de navegación principal.',
          type: 'array',
          validation: (Rule) => Rule.required(),
          of: [
            {
              type: 'link',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'image',
      description: 'Añade el logo de la empresa en formato SVG y la información del footer.',
      fields: [
        defineField({
          name: 'secondColumnFooter',
          title: 'Segunda Columna Footer',
          type: 'blockContent',
          description: 'Añade la información de la segunda columna del footer.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'thirdColumnFooter',
          title: 'Tercera Columna Footer',
          type: 'blockContent',
          description: 'Añade la información de la tercera columna del footer.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'fourthColumnFooter',
          title: 'Cuarta Columna Footer',
          type: 'blockContent',
          description: 'Añade la información de la tercera columna del footer.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'fifthColumnFooter',
          title: 'Quinta Columna Footer',
          type: 'blockContent',
          description: 'Añade la información de la tercera columna del footer.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'description',
      description: 'Used both for the <meta> description tag for SEO, and the site subheader.',
      title: 'Description',
      type: 'array',
      of: [
        // Define a minified block content field for the description. https://www.sanity.io/docs/block-content
        defineArrayMember({
          type: 'block',
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              defineField({
                type: 'object',
                name: 'link',
                fields: [
                  {
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (rule) => rule.required(),
                  },
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Important for accessibility and SEO.',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
