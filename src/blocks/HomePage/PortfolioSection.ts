import type { Block } from 'payload'

export const PortfolioSection: Block = {
  slug: 'portfolioSection',
  interfaceName: 'PortfolioSection',
  labels: {
    singular: 'Portfolio Section',
    plural: 'Portfolio Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'PORTFOLIO',
      required: true,
    },
    {
      name: 'projectsLimit',
      type: 'number',
      label: 'Number of Projects to Display',
      defaultValue: 4,
      min: 1,
      max: 10,
      required: true,
    },
    {
      name: 'showMoreButton',
      type: 'checkbox',
      label: 'Show "Zobacz Więcej" Button',
      defaultValue: true,
    },
    {
      name: 'moreButtonText',
      type: 'text',
      label: 'More Button Text',
      defaultValue: 'ZOBACZ WIĘCEJ',
      admin: {
        condition: (_, siblingData) => siblingData?.showMoreButton,
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: false,
      admin: {
        description: 'Optional background image for the section',
      },
    },
  ],
}
