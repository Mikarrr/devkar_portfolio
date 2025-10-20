'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll() {
  useEffect(() => {
    // Nie inicjalizujemy na mobilkach (jeśli chcesz)
    if (window.innerWidth <= 768) return

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Obsługa kliknięć w linki typu #
    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const target = document.querySelector(href)
      if (target instanceof HTMLElement) {
        e.preventDefault()
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.3,
        })
      }
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    anchorLinks.forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick)
    })

    // Cleanup
    return () => {
      lenis.destroy()
      anchorLinks.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick)
      })
    }
  }, [])

  return null
}
