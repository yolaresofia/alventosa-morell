import {defineField, defineType} from 'sanity'
import {ImageIcon, EnvelopeIcon, UsersIcon} from '@sanity/icons'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'object',
      fields: [
        defineField({ name: 'ca', title: 'Català', type: 'blockContent' }),
        defineField({ name: 'en', title: 'English', type: 'blockContent' }),
        defineField({ name: 'es', title: 'Español', type: 'blockContent' }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      icon: EnvelopeIcon,
      fields: [
        defineField({
          name: 'titleTranslations',
          title: 'Translations',
          type: 'object',
          fields: [
            defineField({ name: 'ca', title: 'Català', type: 'string' }),
            defineField({ name: 'en', title: 'English', type: 'string' }),
            defineField({ name: 'es', title: 'Español', type: 'string' }),
          ],
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.required().email().error('Enter a valid email'),
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          validation: (Rule) => Rule.required().min(7).max(20).error('Enter a valid phone number'),
        }),
      ],
    }),
    defineField({
      name: 'office',
      title: 'Office',
      type: 'object',
      icon: EnvelopeIcon,
      fields: [
        defineField({
          name: 'titleTranslations',
          title: 'Translations',
          type: 'object',
          fields: [
            defineField({ name: 'ca', title: 'Català', type: 'string' }),
            defineField({ name: 'en', title: 'English', type: 'string' }),
            defineField({ name: 'es', title: 'Español', type: 'string' }),
          ],
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'blockContent',
        }),
        defineField({
          name: 'addressUrl',
          title: 'Address URL',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'object',
      icon: EnvelopeIcon,
      fields: [
        defineField({
          name: 'titleTranslations',
          title: 'Translations',
          type: 'object',
          fields: [
            defineField({ name: 'ca', title: 'Català', type: 'string' }),
            defineField({ name: 'en', title: 'English', type: 'string' }),
            defineField({ name: 'es', title: 'Español', type: 'string' }),
          ],
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'link',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'object',
      icon: UsersIcon,
      fields: [
        defineField({
          name: 'titleTranslations',
          title: 'Translations',
          type: 'object',
          fields: [
            defineField({ name: 'ca', title: 'Català', type: 'string' }),
            defineField({ name: 'en', title: 'English', type: 'string' }),
            defineField({ name: 'es', title: 'Español', type: 'string' }),
          ],
        }),
        defineField({
          name: 'coFounders',
          title: 'Co-Founders',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'role',
                  title: 'Role',
                  type: 'object',
                  fields: [
                    defineField({ name: 'ca', title: 'Català', type: 'string' }),
                    defineField({ name: 'en', title: 'English', type: 'string' }),
                    defineField({ name: 'es', title: 'Español', type: 'string' }),
                  ],
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'teammates',
          title: 'Teammates',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'teammatesTitleTranslations',
          title: 'Teammates Translations',
          type: 'object',
          fields: [
            defineField({ name: 'ca', title: 'Català', type: 'string' }),
            defineField({ name: 'en', title: 'English', type: 'string' }),
            defineField({ name: 'es', title: 'Español', type: 'string' }),
          ],
        }),
        defineField({
          name: 'pastTeammates',
          title: 'Past Teammates',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'pastTeammatesTitleTranslations',
          title: 'Past Teammates Translations',
          type: 'object',
          fields: [
            defineField({ name: 'ca', title: 'Català', type: 'string' }),
            defineField({ name: 'en', title: 'English', type: 'string' }),
            defineField({ name: 'es', title: 'Español', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'contact.email',
      media: 'images.0',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Bloque de imagen y texto',
        subtitle: subtitle || 'No email provided',
        media: media || ImageIcon,
      }
    },
  },
})
