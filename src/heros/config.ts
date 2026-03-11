import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Media and Text',
          value: 'mediaAndText',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => type !== 'mediaAndText',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'mediaAndText',
      },
      label: 'Title',
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'youtubeUrl',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'mediaAndText',
      },
      label: 'YouTube Video URL',
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type, youtubeUrl } = {}) =>
          (type === 'mediaAndText' && !youtubeUrl) || type === 'mediumImpact',
      },
      label: 'Background Image',
      relationTo: 'media',
    },
  ],
  label: false,
}
