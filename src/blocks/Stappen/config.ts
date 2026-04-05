import type { Block } from 'payload'

export const Stappen: Block = {
  slug: 'stappen',
  interfaceName: 'StappenBlock',
  labels: {
    singular: 'Stappen',
    plural: 'Stappen',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel (optioneel)',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Stappen',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Tekst',
          required: true,
        },
      ],
    },
  ],
}
