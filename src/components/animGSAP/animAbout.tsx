'use client'

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { useGSAP } from '@gsap/react'

const AnimAbout: React.FC<{
  children: React.ReactNode
  style?: React.CSSProperties
}> = ({ children, style }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (sectionRef.current) {
      new SplitType('.about-me h2', {
        types: 'lines,words,chars',
        tagName: 'span',
      })

      gsap.from('.about-me h2 .word', {
        y: '100%',
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '.about-me',
          start: 'top 50%',
          once: true,
        },
      })

      gsap.from('.about-me p', {
        y: '100%',
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '.about-me',
          start: 'top 50%',
          once: true,
        },
      })

      const counters = document.querySelectorAll<HTMLHeadingElement>('.big-info')
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0', 10)
        const startValue = 0
        const duration = 1

        const countAnimation = () => {
          gsap.fromTo(
            counter,
            { innerText: startValue.toString() },
            {
              innerText: target,
              duration: duration,
              ease: 'power1.out',
              snap: { innerText: 1 },
              onUpdate: () => {
                if (counter) {
                  counter.innerText = Math.floor(parseFloat(counter.innerText)).toString() + '+'
                }
              },
            },
          )
        }

        ScrollTrigger.create({
          trigger: counter,
          start: 'top 80%',
          once: true,
          onEnter: countAnimation,
        })
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="o-mnie" className="about-me" style={style}>
      {children}
    </section>
  )
}

export default AnimAbout
