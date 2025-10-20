import type { Block } from 'payload'

export const TechnologySection: Block = {
  slug: 'technologySection',
  labels: {
    singular: 'Technology Section',
    plural: 'Technology Sections',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: 'TECHNOLOGIA',
    },
    {
      name: 'heading',
      type: 'textarea',
      label: 'Heading',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'Button Link',
          required: true,
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
  ],
}
