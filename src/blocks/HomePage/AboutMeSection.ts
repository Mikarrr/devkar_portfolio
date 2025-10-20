import type { Block } from 'payload'

export const AboutMeSection: Block = {
  slug: 'aboutMeSection',
  labels: {
    singular: 'About Me Section',
    plural: 'About Me Sections',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: 'O MNIE',
      admin: {
        description: 'Small text above the heading',
      },
    },
    {
      name: 'heading',
      type: 'textarea',
      required: true,
      label: 'Heading',
      admin: {
        description: 'Main heading (supports line breaks)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      admin: {
        description: 'Main description text',
      },
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      maxRows: 4,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'value',
          type: 'number',
          required: true,
          label: 'Value',
          admin: {
            description: 'Numeric value (will display as value+)',
          },
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Call-to-Action Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Text',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Button URL',
        },
      ],
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Image',
      admin: {
        description: 'Your profile/portrait image',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        description: 'Optional background image for the section',
      },
    },
  ],
}
