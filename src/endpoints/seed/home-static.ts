import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  meta: {
    description: 'Portfolio website built with Payload and Next.js.',
    title: 'Home - Portfolio',
  },
  title: 'Home',
  layout: [
    {
      blockType: 'heroSection',
      heading: 'Welcome to My Portfolio',
      subheading: 'Please visit the admin dashboard to seed content',
    },
  ],
}
