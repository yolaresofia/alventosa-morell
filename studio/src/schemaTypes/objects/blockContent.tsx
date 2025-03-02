import {defineArrayMember, defineType, defineField} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'linkType',
                title: 'Link Type',
                type: 'string',
                initialValue: 'href',
                options: {
                  list: [
                    { title: 'URL', value: 'href' },
                    { title: 'Page', value: 'page' },
                  ],
                  layout: 'radio',
                },
              }),
              defineField({
                name: 'urlTitle',
                title: 'URL Title',
                type: 'string',
                hidden: ({ parent }) => parent?.linkType !== 'href',
              }),
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                hidden: ({ parent }) => parent?.linkType !== 'href',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'href' && !value) {
                      return 'URL is required when Link Type is URL';
                    }
                    return true;
                  }),
              }),
              defineField({
                name: 'page',
                title: 'Page',
                type: 'reference',
                to: [{ type: 'page' }],
                hidden: ({ parent }) => parent?.linkType !== 'page',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'page' && !value) {
                      return 'Page reference is required when Link Type is Page';
                    }
                    return true;
                  }),
              }),
              defineField({
                name: 'openType',
                title: 'Open Type',
                type: 'string',
                hidden: ({ parent }) => parent?.linkType !== 'href',
                options: {
                  list: [
                    { title: 'Open in new tab', value: 'newTab' },
                    { title: 'Open modal', value: 'modal' },
                  ],
                  layout: 'radio',
                },
                initialValue: 'newTab',
              }),
            ],
          },
        ],
      },
    }),
  ],
})
