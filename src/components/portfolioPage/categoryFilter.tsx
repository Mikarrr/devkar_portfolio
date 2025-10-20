'use client'

import React, { useState, useMemo, useRef } from 'react'
import type { Project, Category } from '@/payload-types'
import { gsap } from 'gsap'
import TransitionLink from '@/components/transitionLink/transitionLink'
import { useGSAP } from '@gsap/react'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface CategoryFilterProps {
  projects: Project[]
  categories: Category[]
  showFilter?: boolean
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  projects,
  categories,
  showFilter = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | number>('all')
  const containerRef = useRef<HTMLDivElement>(null)

  const categoryCount = useMemo(() => {
    const counts: { [key: number]: number } = {}
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

  useGSAP(
    () => {
      if (!containerRef.current) return

      const items = containerRef.current.querySelectorAll('.portfolio-project-item')

      if (items.length > 0) {
        // Kill any existing animations
        gsap.killTweensOf(items)

        // Animate out old items first (if they exist from previous filter)
        const oldItems = document.querySelectorAll('.portfolio-project-item:not([data-new])')
        if (oldItems.length > 0 && selectedCategory !== 'all') {
          gsap.to(oldItems, {
            y: '-5%',
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            stagger: 0.05,
          })
        }

        // Set initial state for new items
        gsap.set(items, {
          y: '5%',
          opacity: 0,
        })

        // Animate in new items
        gsap.to(items, {
          y: '0%',
          opacity: 1,
          duration: 0.5,
          delay: 0.05,
          ease: 'power2.out',
          stagger: 0.08,
          onComplete: () => {
            // Clean up inline styles after animation
            gsap.set(items, { clearProps: 'transform,opacity' })
          },
        })
      }
    },
    { scope: containerRef, dependencies: [filteredProjects] }
  )

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

      <div className="portfolio-projects" ref={containerRef}>
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

export default CategoryFilter
