'use client'

import React from 'react'
import type { Project } from '@/payload-types'

import AnimProject from '@/components/animGSAP/animProject'
import TransitionLink from '@/components/transitionLink/transitionLink'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import ButtonRevArrow from '@/components/buttonRevArrow/buttonRevArrow'
import ButtonRev from '@/components/buttonRev/buttonRev'

interface PortfolioSectionClientProps {
  title: string
  projects: Project[]
  showMoreButton: boolean
  moreButtonText: string
  backgroundImageUrl?: string
}

export const PortfolioSectionClient: React.FC<PortfolioSectionClientProps> = ({
  title,
  projects,
  showMoreButton,
  moreButtonText,
  backgroundImageUrl,
}) => {
  return (
    <AnimProject
      style={
        backgroundImageUrl
          ? {
              backgroundImage: `url(${backgroundImageUrl})`,
            }
          : undefined
      }
    >
      <div className="project-container">
        <div className="info-section">
          <p>{title}</p>
        </div>

        <div className="project-inner">
          {projects.map((project) => {
            const categoryTitle =
              typeof project.category === 'object' && project.category ? project.category.title : ''
            const imageWebUrl =
              typeof project.imageWeb === 'object' && project.imageWeb
                ? getMediaUrl(project.imageWeb)
                : ''

            // Get first image from gallery as phone image
            const phoneImageUrl =
              project.images && project.images.length > 0
                ? typeof project.images[0].image === 'object' && project.images[0].image
                  ? getMediaUrl(project.images[0].image)
                  : ''
                : ''

            return (
              <div key={project.id} className="project-item">
                <div className="project-description">
                  <h3 className="title">{project.title}</h3>
                  <p className="category">{categoryTitle}</p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="services">
                      <p className="services-category">Technologie</p>
                      <ul>
                        {project.technologies.map((tech, index) => (
                          <li key={index}>{tech.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <TransitionLink href={`/portfolio/${project.slug}`}>
                      <ButtonRevArrow param="Projekt" size="small" />
                    </TransitionLink>
                  </div>
                </div>

                <div className="project-image">
                  {imageWebUrl && (
                    <TransitionLink
                      href={`/portfolio/${project.slug}`}
                      className="project-image-con"
                      style={{
                        backgroundImage: `url(${imageWebUrl})`,
                      }}
                    />
                  )}
                  {phoneImageUrl && (
                    <TransitionLink
                      href={`/portfolio/${project.slug}`}
                      className="project-image-con"
                      style={{
                        backgroundImage: `url(${phoneImageUrl})`,
                      }}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {showMoreButton && (
          <div className="more">
            <TransitionLink href="/portfolio">
              <ButtonRev param={moreButtonText} size="small" color="#ff4d4d" />
            </TransitionLink>
          </div>
        )}
      </div>
    </AnimProject>
  )
}
