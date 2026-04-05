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
      name: 'groups',
      type: 'array',
      label: 'Stappen groepen',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
        },
        {
          name: 'steps',
          type: 'array',
          label: 'Stappen',
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'textarea',
              label: 'Stap',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

/**
 * Shared field definition for embedding step groups directly on a recipe
 * (outside the page-builder blocks system).
 */
export const stepGroupsField = {
  name: 'stepGroups',
  type: 'array' as const,
  label: 'Stappen',
  admin: {
    description: 'Voeg één of meerdere stappenlijsten toe (bijv. brood en boter apart).',
  },
  fields: [
    {
      name: 'title',
      type: 'text' as const,
      label: 'Titel (optioneel)',
    },
    {
      name: 'steps',
      type: 'array' as const,
      label: 'Stappen',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'textarea' as const,
          label: 'Stap',
          required: true,
        },
      ],
    },
  ],
}
