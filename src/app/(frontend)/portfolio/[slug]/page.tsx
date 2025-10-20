import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { SinglePortfolioPage } from '@/components/singlePortfolioPage/SinglePortfolioPage'

export const revalidate = 7200 // 2 hours - portfolio projects change less frequently

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  const params = projects.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

export default async function Project({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const { slug = '' } = await paramsPromise
  const url = '/portfolio/' + slug
  const project = await queryProjectBySlug({ slug })

  if (!project) {
    return <PayloadRedirects url={url} />
  }

  return <SinglePortfolioPage project={project} />
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const project = await queryProjectBySlug({ slug })

  if (!project) {
    return {
      title: 'Projekt nie znaleziony',
    }
  }

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  // Use project's imageWeb as OG image
  const ogImage =
    project.imageWeb && typeof project.imageWeb === 'object' && 'url' in project.imageWeb
      ? serverUrl + project.imageWeb.url
      : serverUrl + '/website-template-OG.webp'

  const title = project.title || 'Projekt'
  const description = project.description || 'Zobacz szczegóły projektu'

  return {
    title: `${title} | Portfolio`,
    description,
    openGraph: {
      title: `${title} | Portfolio`,
      description,
      images: [
        {
          url: ogImage,
        },
      ],
      url: `/portfolio/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Portfolio`,
      description,
      images: [ogImage],
    },
  }
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
