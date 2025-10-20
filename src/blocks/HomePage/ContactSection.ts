import type { Block } from 'payload'

export const ContactSection: Block = {
  slug: 'contactSection',
  labels: {
    singular: 'Contact Section',
    plural: 'Contact Sections',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      required: true,
      label: 'Section Label',
      defaultValue: 'KONTAKT',
      admin: {
        description: 'Small label above the main heading',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Main Heading',
      defaultValue: 'COLLABORATE',
      admin: {
        description: 'Primary heading text for the contact section',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      maxRows: 10,
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
          label: 'Platform Name',
          admin: {
            description: 'e.g., LinkedIn, Instagram, TikTok',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            description: 'Leave empty if not yet available',
          },
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      defaultValue: 'Poland, Poznań',
      admin: {
        description: 'Location/address text',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Contact Description',
      admin: {
        description: 'Description text encouraging contact',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Contact Email',
      admin: {
        description: 'Email address for contact',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      admin: {
        description: 'Phone number (for display)',
      },
    },
    {
      name: 'phoneRaw',
      type: 'text',
      label: 'Phone Number (Raw)',
      admin: {
        description: 'Phone number without formatting (for tel: link)',
      },
    },
  ],
}
