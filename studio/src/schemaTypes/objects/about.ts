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
      title: 'Texto About',
      type: 'blockContent',
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      icon: EnvelopeIcon,
      fields: [
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
          name: 'address',
          title: 'Address',
          type: 'blockContent',
        }),
        defineField({
          name: 'addressUrl',
          title: 'Address url',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social',
      type: 'object',
      icon: EnvelopeIcon,
      fields: [
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
                  type: 'string',
                  validation: (Rule) => Rule.required(),
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
