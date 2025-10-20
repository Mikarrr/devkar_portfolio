import type { Block } from 'payload'

export const HeroSection: Block = {
  slug: 'heroSection',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Main Heading',
      admin: {
        description: 'Primary heading text for the hero section',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Supporting text or description',
      },
    },
    {
      name: 'ctaButtons',
      type: 'array',
      label: 'Call-to-Action Buttons',
      maxRows: 2,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Button Text',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Button URL',
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        description: 'Optional background image for the hero section',
      },
    },
  ],
}
