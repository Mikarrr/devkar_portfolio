'use client'

import Link from 'next/link'
import AnimStart from '../../animGSAP/animStart'

import ButtonRevArrow from '../../buttonRevArrow/buttonRevArrow'

interface CTAButton {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
}

interface HeroSectionProps {
  heading: string
  subheading?: string
  ctaButtons?: CTAButton[]
  backgroundImage?: {
    url: string
    alt?: string
  }
}

export function HeroSection({
  heading,
  subheading,
  ctaButtons = [],
  backgroundImage,
}: HeroSectionProps) {
  return (
    <AnimStart
      style={
        backgroundImage?.url
          ? {
              backgroundImage: `url(${backgroundImage.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : undefined
      }
    >
      <div className="main-banner-inner">
        <h1>{heading}</h1>

        {subheading && <p className="description">{subheading}</p>}

        {ctaButtons.length > 0 && (
          <div className="button">
            {ctaButtons.map((button, index) => (
              <Link key={index} href={button.href}>
                <ButtonRevArrow param={button.label} size="small" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </AnimStart>
  )
}
