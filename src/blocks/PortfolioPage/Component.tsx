import React from 'react'
import type { PortfolioPage as PortfolioPageProps } from '@/payload-types'
import { PortfolioFilter } from './PortfolioFilter.client'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const PortfolioPage: React.FC<
  PortfolioPageProps & {
    id?: string
  }
> = async (props) => {
  const { title, description, showFilter, categories: filterCategories } = props

  const payload = await getPayload({ config: configPromise })

  // Pobierz wszystkie projekty
  const projectsData = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 100,
    where: filterCategories?.length
      ? {
          category: {
            in: filterCategories,
          },
        }
      : undefined,
    sort: '-publishedAt',
  })

  // Pobierz wszystkie kategorie
  const categoriesData = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 100,
  })

  return (
    <div className="portfolio-section">
      <div className="portfolio-up">
        <div className="portfolio-description">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      <PortfolioFilter
        projects={projectsData.docs}
        categories={categoriesData.docs}
        showFilter={showFilter ?? true}
      />
    </div>
  )
}
