'use client'

import React, { useEffect } from 'react'
import type { Project } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import TransitionLink from '@/components/transitionLink/transitionLink'

import { animatePageIn } from '@/components/animGSAP/animTransition'
import AnimSlug from '@/components/animGSAP/animSlug'
import ButtonRevArrow from '../buttonRevArrow/buttonRevArrow'

interface SinglePortfolioPageProps {
  project: Project
}

export const SinglePortfolioPage: React.FC<SinglePortfolioPageProps> = ({ project }) => {
  const categoryTitle =
    typeof project.category === 'object' && project.category ? project.category.title : ''

  const mainImageUrl =
    typeof project.imageWeb === 'object' && project.imageWeb ? getMediaUrl(project.imageWeb) : ''

  useEffect(() => {
    animatePageIn()
  }, [])

  return (
    <AnimSlug>
      <div className="single-project-section">
        <div className="single-project-section-tittle">
          <h1>{project.title}</h1>
          <div className="single-project-section-category">
            <p>{categoryTitle}</p>
          </div>
        </div>

        <div className="single-project-section-down">
          <div className="single-project-section-des">
            <p>{project.description}</p>
          </div>

          {project.technologies && project.technologies.length > 0 && (
            <div className="single-project-section-cat">
              <p>Technologie</p>
              <ul>
                {project.technologies.map((tech, index) => (
                  <li key={index}>{tech.name}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            {project.url && (
              <TransitionLink href={project.url} target="_blank" rel="noopener noreferrer">
                <ButtonRevArrow param="Website" size="small" />
              </TransitionLink>
            )}
          </div>
        </div>

        {mainImageUrl && (
          <div className="single-project-section-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mainImageUrl} alt={project.title} />
          </div>
        )}

        {project.images && project.images.length > 0 && (
          <div className="single-project-section-img-mockups">
            {project.images.map((item, index) => {
              const imgUrl =
                typeof item.image === 'object' && item.image ? getMediaUrl(item.image) : ''
              return (
                imgUrl && (
                  <div key={index} className="single-project-section-img-down">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl} alt={`${project.title} mockup ${index + 1}`} />
                  </div>
                )
              )
            })}
          </div>
        )}
      </div>
    </AnimSlug>
  )
}
