import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { PortfolioFilter } from '@/blocks/PortfolioPage/PortfolioFilter.client'
import AnimPortfolio from '@/components/animGSAP/animPortfolio'
import PageClient from './page.client'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })

  const portfolioPage = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'portfolio',
      },
    },
    limit: 1,
  })

  const page = portfolioPage.docs?.[0]

  if (page) {
    return generateMeta({ doc: page })
  }

  return {
    title: 'Portfolio - Projekty',
    description:
      'Tworzę nowoczesne i funkcjonalne strony internetowe oraz aplikacje, które łączą wyjątkowy design z intuicyjną obsługą. Korzystam z najnowszych technologii, aby dostarczać rozwiązania dopasowane do Twoich potrzeb.',
  }
}

export const revalidate = 1800 // 30 minutes - portfolio list updates more frequently

export default async function PortfolioPage() {
  const payload = await getPayload({ config: configPromise })

  const projectsData = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 100,
    sort: '-publishedAt',
  })

  const categoriesData = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 100,
  })

  return (
    <>
      <PageClient />
      <AnimPortfolio>
        <div className="portfolio-section">
        <div className="portfolio-up">
          <div className="portfolio-description">
            <h1>MOJE PORTFOLIO</h1>
            <p>
              Z niecierpliwością oczekuję na kontakt mailowy lub telefoniczny od Ciebie w sprawie
              potencjalnych współprac, zapytań czy też po prostu na przyjazną i kreatywną dyskusję.
            </p>
          </div>
        </div>

        <PortfolioFilter
          projects={projectsData.docs}
          categories={categoriesData.docs}
          showFilter={true}
        />
        </div>
      </AnimPortfolio>
    </>
  )
}
