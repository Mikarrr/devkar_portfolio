'use client'

import React, { useEffect } from 'react'
import { animatePageIn } from '@/components/animGSAP/animTransition'

const PageClient: React.FC = () => {
  useEffect(() => {
    animatePageIn()
  }, [])

  return <React.Fragment />
}

export default PageClient
