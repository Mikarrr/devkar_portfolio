'use client'

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const AnimProject: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (sectionRef.current) {
      gsap.from('.project-inner', {
        y: '10%',
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '.technology',
          start: '75% 50%',
          once: true,
        },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="project" style={style}>
      {children}
    </section>
  )
}

export default AnimProject
