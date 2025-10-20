import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { HeroSectionComponent } from '@/blocks/HomePage/HeroSectionComponent'
import { AboutMeSectionComponent } from '@/blocks/HomePage/AboutMeSectionComponent'
import { TechnologySectionComponent } from '@/blocks/HomePage/TechnologySectionComponent'
import { PortfolioSectionComponent } from '@/blocks/HomePage/PortfolioSectionComponent'
import { ContactSectionBlock } from '@/blocks/HomePage/ContactSectionComponent'
import { PortfolioPage } from '@/blocks/PortfolioPage/Component'

const blockComponents = {
  heroSection: HeroSectionComponent,
  aboutMeSection: AboutMeSectionComponent,
  technologySection: TechnologySectionComponent,
  portfolioSection: PortfolioSectionComponent,
  contactSection: ContactSectionBlock,
  portfolioPage: PortfolioPage,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
