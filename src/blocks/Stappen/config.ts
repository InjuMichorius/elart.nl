import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Stappen: Block = {
  slug: 'stappen',
  fields: [
    {
      name: 'steps',
      type: 'array',
      label: 'Stappen',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
        },
        {
          name: 'text',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
          label: 'Tekst',
          required: true,
        },
      ],
    },
  ],
  interfaceName: 'StappenBlock',
}
