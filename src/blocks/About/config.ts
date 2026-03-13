import type { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'text',
      type: 'richText',
      label: 'Text',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
      ],
    },
  ],
}
