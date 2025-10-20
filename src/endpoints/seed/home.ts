import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    layout: [
      {
        blockType: 'heroSection',
        heading: 'Portfolio Website',
        subheading: 'Welcome to my portfolio',
        ctaButtons: [
          {
            label: 'View Projects',
            href: '/portfolio',
          },
        ],
        backgroundImage: heroImage.id,
      },
    ],
    meta: {
      description: 'Portfolio website built with Payload and Next.js.',
      image: heroImage.id,
      title: 'Home - Portfolio',
    },
    title: 'Home',
  }
}
