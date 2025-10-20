'use client'

import Link from 'next/link'
import AnimTechnology from '../../animGSAP/animTechnology'
import ButtonRevArrow from '../../buttonRevArrow/buttonRevArrow'
import LogoAnim from './logoAnim/logoAnim'

interface TechnologySectionProps {
  tagline?: string
  heading: string
  description: string
  ctaButton?: {
    label: string
    href: string
  }
  backgroundImage?: {
    url: string
    alt?: string
  }
}

export function TechnologySection({
  tagline = 'TECHNOLOGIA',
  heading,
  description,
  ctaButton,
  backgroundImage,
}: TechnologySectionProps) {
  return (
    <AnimTechnology
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
      <div className="technology-inner">
        <div className="technology-left">
          {tagline && (
            <div className="info-section">
              <p>{tagline}</p>
            </div>
          )}

          <h2>{heading}</h2>

          <p>{description}</p>

          {ctaButton && (
            <div>
              <Link href={ctaButton.href}>
                <ButtonRevArrow param={ctaButton.label} size="small" />
              </Link>
            </div>
          )}
        </div>

        <div className="technology-right">
          <LogoAnim />
        </div>
      </div>
    </AnimTechnology>
  )
}
