'use client'

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { useGSAP } from '@gsap/react'

const AnimTechnology: React.FC<{
  children: React.ReactNode
  style?: React.CSSProperties
}> = ({ children, style }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (sectionRef.current) {
      new SplitType('.technology h2', {
        types: 'lines,words,chars',
        tagName: 'span',
      })

      gsap.from('.technology h2 .word', {
        y: '100%',
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '.technology',
          start: 'top 50%',
          once: true,
        },
      })

      gsap.from('.technology p', {
        y: '100%',
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '.technology',
          start: 'top 50%',
          once: true,
        },
      })

      gsap.from('.stack-icon', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.technology',
          start: 'top 50%',
          once: true,
        },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="technologia" className="technology" style={style}>
      {children}
    </section>
  )
}

export default AnimTechnology
