'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { animatePageIn } from '@/components/animGSAP/animTransition'

const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
    animatePageIn()
  }, [setHeaderTheme])
  return <React.Fragment />
}

export default PageClient
