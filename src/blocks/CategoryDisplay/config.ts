import type { Block } from 'payload'

export const CategoryDisplay: Block = {
  slug: 'categoryDisplay',
  interfaceName: 'CategoryDisplayBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select categories to display',
      },
    },
  ],
  labels: {
    plural: 'Category Displays',
    singular: 'Category Display',
  },
}
