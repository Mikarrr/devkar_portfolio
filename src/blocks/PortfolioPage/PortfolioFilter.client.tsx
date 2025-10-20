'use client'

import React, { useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import type { Project, Category } from '@/payload-types'
import TransitionLink from '@/components/transitionLink/transitionLink'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface PortfolioFilterProps {
  projects: Project[]
  categories: Category[]
  showFilter?: boolean
}

export const PortfolioFilter: React.FC<PortfolioFilterProps> = ({
  projects,
  categories,
  showFilter = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | number>('all')

  const categoryCount = useMemo(() => {
    const counts: { [key: string | number]: number } = {}
    projects.forEach((project) => {
      if (typeof project.category === 'object' && project.category?.id) {
        const catId = project.category.id
        counts[catId] = (counts[catId] || 0) + 1
      }
    })
    return counts
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projects
    }
    return projects.filter((project) => {
      if (typeof project.category === 'object' && project.category?.id) {
        return project.category.id === selectedCategory
      }
      return false
    })
  }, [selectedCategory, projects])

  useGSAP(() => {
    gsap.killTweensOf('.portfolio-projects .portfolio-project-item')

    gsap.from('.portfolio-projects .portfolio-project-item', {
      y: '5%',
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out',
      stagger: {
        each: 0.2,
      },
    })
  }, [filteredProjects])

  return (
    <div className="portfolio-down">
      {showFilter && (
        <div className="category-filter">
          <h4>Filtr kategorii</h4>
          <ul>
            <li
              className={selectedCategory === 'all' ? 'active' : ''}
              onClick={() => setSelectedCategory('all')}
            >
              Wszystkie <sup>{projects.length}</sup>
            </li>
            {categories.map((category) => (
              <li
                key={category.id}
                className={category.id === selectedCategory ? 'active' : ''}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.title} <sup>{categoryCount[category.id] || 0}</sup>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="portfolio-projects">
        {filteredProjects.map((project) => {
          const imageUrl =
            typeof project.imageWeb === 'object' && project.imageWeb
              ? getMediaUrl(project.imageWeb)
              : ''
          const categoryTitle =
            typeof project.category === 'object' && project.category
              ? project.category.title
              : ''

          return (
            <TransitionLink
              href={`/portfolio/${project.slug}`}
              className="portfolio-project-item"
              style={{ backgroundImage: `url(${imageUrl})` }}
              key={project.id}
            >
              <div className="portfolio-project-item-description">
                <h4>{project.title}</h4>
                <p>{categoryTitle}</p>
              </div>
            </TransitionLink>
          )
        })}
      </div>
    </div>
  )
}
