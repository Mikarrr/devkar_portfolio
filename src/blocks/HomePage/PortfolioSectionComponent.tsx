import React from 'react'
import type { PortfolioSection as PortfolioSectionProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { PortfolioSectionClient } from '@/components/homePage/portfolioSection/PortfolioSection'

export const PortfolioSectionComponent: React.FC<
  PortfolioSectionProps & {
    id?: string
  }
> = async (props) => {
  const {
    title = 'PORTFOLIO',
    projectsLimit = 4,
    showMoreButton = true,
    moreButtonText = 'ZOBACZ WIĘCEJ',
    backgroundImage,
  } = props

  const payload = await getPayload({ config: configPromise })

  // Fetch projects from Payload
  const projectsData = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: projectsLimit,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  // Get background image URL if provided
  const backgroundImageUrl =
    typeof backgroundImage === 'object' && backgroundImage ? getMediaUrl(backgroundImage) : ''

  return (
    <PortfolioSectionClient
      title={title}
      projects={projectsData.docs}
      showMoreButton={showMoreButton ?? true}
      moreButtonText={moreButtonText ?? 'ZOBACZ WIĘCEJ'}
      backgroundImageUrl={backgroundImageUrl}
    />
  )
}
