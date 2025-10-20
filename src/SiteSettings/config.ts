import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Manage global site settings like logo, contact information, and social media.',
  },
  fields: [
    {
      name: 'branding',
      type: 'group',
      label: 'Branding',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Site Logo',
          admin: {
            description: 'Main logo displayed in header/menu',
          },
        },
        {
          name: 'logoAlt',
          type: 'text',
          label: 'Logo Alt Text',
          defaultValue: 'Site Logo',
          admin: {
            description: 'Alternative text for the logo (for accessibility)',
          },
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Favicon',
          admin: {
            description: 'Small icon displayed in browser tabs',
          },
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Primary Email',
          defaultValue: 'karwacki.mikolaj123@gmail.com',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          defaultValue: '+48 724 798 688',
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
          defaultValue: 'Poznań, Poland',
        },
        {
          name: 'timezone',
          type: 'text',
          label: 'Timezone Display',
          defaultValue: 'Poznań (GMT + 01:00)',
          admin: {
            description: 'Text displayed for timezone in header',
          },
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'platforms',
          type: 'array',
          label: 'Social Platforms',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'GitHub', value: 'github' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'Behance', value: 'behance' },
                { label: 'Dribbble', value: 'dribbble' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'Other', value: 'other' },
              ],
              required: true,
              label: 'Platform',
            },
            {
              name: 'customName',
              type: 'text',
              label: 'Custom Platform Name',
              admin: {
                condition: (_, siblingData) => siblingData.platform === 'other',
                description: 'Name for custom platform (only shown if "Other" is selected)',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'Profile URL',
            },
            {
              name: 'isVisible',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show in Menu',
              admin: {
                description: 'Whether to display this social link in the navigation menu',
              },
            },
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics & Tracking',
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          label: 'Google Analytics ID',
          admin: {
            description: 'GA tracking ID (e.g., GA-XXXXXXXXX)',
          },
        },
        {
          name: 'googleTagManagerId',
          type: 'text',
          label: 'Google Tag Manager ID',
          admin: {
            description: 'GTM container ID (e.g., GTM-XXXXXXX)',
          },
        },
        {
          name: 'facebookPixelId',
          type: 'text',
          label: 'Facebook Pixel ID',
        },
      ],
    },
    {
      name: 'maintenance',
      type: 'group',
      label: 'Maintenance Mode',
      fields: [
        {
          name: 'isMaintenanceMode',
          type: 'checkbox',
          defaultValue: false,
          label: 'Enable Maintenance Mode',
          admin: {
            description: 'When enabled, visitors will see a maintenance page',
          },
        },
        {
          name: 'maintenanceMessage',
          type: 'textarea',
          label: 'Maintenance Message',
          defaultValue: 'We are currently updating our website. Please check back soon!',
          admin: {
            condition: (_, siblingData) => siblingData.isMaintenanceMode,
          },
        },
      ],
    },
  ],
}
