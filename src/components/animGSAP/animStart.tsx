'use client'

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'

const AnimStart: React.FC<{
  children: React.ReactNode
  style?: React.CSSProperties
}> = ({ children, style }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    new SplitType('.main-banner h1', {
      types: 'lines,words,chars',
      tagName: 'span',
    })

    if (sectionRef.current) {
      gsap.from(`.main-banner h1 .word`, {
        y: '100%',
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
        stagger: 0.06,
      })

      gsap.from('.description, .button', {
        y: '100%',
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out',
        stagger: 0.06,
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="main-banner" style={style}>
      {children}
    </section>
  )
}

export default AnimStart
