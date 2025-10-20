import React from 'react'
import type { Page } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { TechnologySection } from '@/components/homePage/technologySection/TechnologySection'

type TechnologySectionBlock = Extract<Page['layout'][0], { blockType: 'technologySection' }>

export const TechnologySectionComponent: React.FC<TechnologySectionBlock> = ({
  tagline,
  heading,
  description,
  ctaButton,
  backgroundImage,
}) => {
  const bgImageUrl =
    backgroundImage && typeof backgroundImage === 'object'
      ? getMediaUrl(backgroundImage)
      : undefined

  return (
    <TechnologySection
      tagline={tagline || undefined}
      heading={heading || ''}
      description={description || ''}
      ctaButton={
        ctaButton?.label && ctaButton?.href
          ? {
              label: ctaButton.label,
              href: ctaButton.href,
            }
          : undefined
      }
      backgroundImage={bgImageUrl ? { url: bgImageUrl } : undefined}
    />
  )
}
