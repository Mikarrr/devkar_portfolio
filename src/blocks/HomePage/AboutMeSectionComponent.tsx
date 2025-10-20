import React from 'react'
import type { Page } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { AboutMeSection } from '@/components/homePage/aboutMeSection/AboutMeSection'

type AboutMeSectionBlock = Extract<Page['layout'][0], { blockType: 'aboutMeSection' }>

export const AboutMeSectionComponent: React.FC<AboutMeSectionBlock> = ({
  tagline,
  heading,
  description,
  stats,
  ctaButton,
  profileImage,
  backgroundImage,
}) => {
  const profileImageUrl =
    profileImage && typeof profileImage === 'object' ? getMediaUrl(profileImage) : undefined

  const bgImageUrl =
    backgroundImage && typeof backgroundImage === 'object'
      ? getMediaUrl(backgroundImage)
      : undefined

  const mappedStats = stats?.map((stat) => ({
    label: stat.label || '',
    value: stat.value || 0,
  }))

  return (
    <AboutMeSection
      tagline={tagline || undefined}
      heading={heading || ''}
      description={description || ''}
      stats={mappedStats}
      ctaButton={
        ctaButton?.label && ctaButton?.href
          ? {
              label: ctaButton.label,
              href: ctaButton.href,
            }
          : undefined
      }
      profileImage={profileImageUrl ? { url: profileImageUrl } : undefined}
      backgroundImage={bgImageUrl ? { url: bgImageUrl } : undefined}
    />
  )
}
