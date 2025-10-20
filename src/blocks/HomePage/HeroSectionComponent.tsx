import React from 'react'
import type { Page } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { HeroSection } from '@/components/homePage/heroSection/HeroSection'

type HeroSectionBlock = Extract<Page['layout'][0], { blockType: 'heroSection' }>

export const HeroSectionComponent: React.FC<HeroSectionBlock> = ({
  heading,
  subheading,
  ctaButtons,
  backgroundImage,
}) => {
  const bgImageUrl =
    backgroundImage && typeof backgroundImage === 'object'
      ? getMediaUrl(backgroundImage)
      : undefined

  const mappedButtons = ctaButtons?.map((btn) => ({
    label: btn.label || '',
    href: btn.href || '/',
  }))

  return (
    <HeroSection
      heading={heading || ''}
      subheading={subheading || undefined}
      ctaButtons={mappedButtons}
      backgroundImage={bgImageUrl ? { url: bgImageUrl } : undefined}
    />
  )
}
