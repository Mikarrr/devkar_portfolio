'use client'

import Link from 'next/link'

import ButtonRevArrow from '../../buttonRevArrow/buttonRevArrow'
import AnimAbout from '../../animGSAP/animAbout'

interface StatItem {
  label: string
  value: number
}

interface AboutMeSectionProps {
  tagline?: string
  heading: string
  description: string
  stats?: StatItem[]
  ctaButton?: {
    label: string
    href: string
  }
  profileImage?: {
    url: string
    alt?: string
  }
  backgroundImage?: {
    url: string
    alt?: string
  }
}

export function AboutMeSection({
  tagline = 'O MNIE',
  heading,
  description,
  stats = [],
  ctaButton,
  profileImage,
  backgroundImage,
}: AboutMeSectionProps) {
  return (
    <AnimAbout
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
      <div className="about-me-inner">
        <div className="about-me-left">
          <div className="my-img">
            <div
              style={
                profileImage?.url
                  ? {
                      backgroundImage: `url(${profileImage.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : undefined
              }
            />
          </div>
        </div>

        <div className="about-me-right">
          {tagline && (
            <div className="info-section">
              <p>{tagline}</p>
            </div>
          )}

          <h2>
            {heading.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < heading.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>

          <p>{description}</p>

          {stats.length > 0 && (
            <div className="counter">
              {stats.map((stat, index) => (
                <div key={index}>
                  <p>{stat.label}</p>
                  <h3 className="big-info" data-target={stat.value}>
                    {stat.value}+
                  </h3>
                </div>
              ))}
            </div>
          )}

          {ctaButton && (
            <div>
              <Link href={ctaButton.href}>
                <ButtonRevArrow param={ctaButton.label} size="small" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </AnimAbout>
  )
}
