'use client'

import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ButtonRev from '@/components/buttonRev/buttonRev'
import TransitionLink from '@/components/transitionLink/transitionLink'
import Image from 'next/image'
import type { Header as HeaderType, SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface MenuComponentProps {
  headerData: HeaderType
  siteSettings: SiteSetting
}

const MenuComponent: React.FC<MenuComponentProps> = ({ headerData, siteSettings }) => {
  const container = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const tl = useRef<GSAPTimeline | null>(null)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Extract data from Payload CMS
  const mainMenuLinks =
    headerData?.navItems?.map((item) => ({
      path: item.link?.url || '/',
      label: item.link?.label || '',
    })) || []

  const secondaryMenuLinks =
    headerData?.secondaryNavItems?.map((item) => ({
      path: item.link?.url || '/',
      label: item.link?.label || '',
    })) || []

  const socialMediaLinks =
    siteSettings?.socialMedia?.platforms
      ?.filter((platform) => platform.isVisible)
      ?.map((platform) => {
        const platformName = platform.platform === 'other' ? platform.customName : platform.platform
        return {
          href: platform.url || '/',
          imgSrc: `/${platform.platform}.svg`,
          alt: platformName || platform.platform || 'Social',
        }
      }) || []

  const logoSrc =
    typeof siteSettings?.branding?.logo === 'object' && siteSettings.branding.logo
      ? getMediaUrl(siteSettings.branding.logo)
      : '/logo.png'

  const logoAlt = siteSettings?.branding?.logoAlt || 'Logo'
  const email = siteSettings?.contact?.email || 'karwacki.mikolaj123@gmail.com'
  const phone = siteSettings?.contact?.phone || '+48 724 798 688'
  const location = siteSettings?.contact?.location || 'Poznań, Poland'
  const timezone = siteSettings?.contact?.timezone || 'Poznań (GMT + 01:00)'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timerID)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useGSAP(
    () => {
      // Initial state setup
      gsap.set('.menu-main-link-wrapper', { y: 85 })
      gsap.set('.menu-extra-col1-link-wrapper', { y: 45 })

      // GSAP timeline for animations
      tl.current = gsap
        .timeline({ paused: true })
        .to(
          '.menu-overlay',
          {
            duration: 0.5,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'ease-in-out',
          },
          0,
        )
        .to(
          '.menu-extra-col1-link-wrapper, .menu-main-link-wrapper',
          { y: 0, duration: 0.4, stagger: 0.05, ease: 'power4.inOut' },
          0,
        )
    },
    { scope: container },
  )

  useEffect(() => {
    if (tl.current) {
      if (isMenuOpen) {
        tl.current.play()
      } else {
        tl.current.reverse()
      }
    }
  }, [isMenuOpen])

  return (
    <header className={`menu-wrapper ${isScrolled ? 'scrolled' : ''}`} ref={container}>
      <div className="menu-header">
        <div className="menu-logo">
          <TransitionLink href="/">
            <Image src={logoSrc} alt={logoAlt} width={100} height={50} />
          </TransitionLink>
        </div>
        <div className="time">
          <p className="small-text">{timezone}</p>
          <p className="clock">
            {currentTime
              ? currentTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Ładowanie...'}
          </p>
        </div>

        <div className="menu-header-right">
          <div className="menu-main-links">
            {mainMenuLinks.map((link, index) => (
              <div className="menu-main-link-item" key={index}>
                <TransitionLink href={link.path} className="menu-main-link">
                  <ButtonRev param={link.label} size="small" color="white" />
                </TransitionLink>
              </div>
            ))}
          </div>
          <div className="menu-toggle-button" onClick={toggleMenu}>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <nav className="menu-overlay">
        <div className="menu-overlay-header">
          <div className="menu-close-button" onClick={toggleMenu}>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className="menu-left">
          <div className="menu-links">
            {mainMenuLinks.map((link, index) => (
              <div className="menu-main-link-item" key={index}>
                <div className="menu-main-link-wrapper" onClick={toggleMenu}>
                  <TransitionLink href={link.path} className="menu-main-link">
                    <ButtonRev param={link.label} size="xlarge" color="white" />
                  </TransitionLink>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-social">
            <ul className="menu-social-list">
              {socialMediaLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} rel="nofollow" target="_blank" aria-label={link.alt}>
                    <Image
                      src={`/media/${link.imgSrc}`}
                      alt={link.alt}
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="menu-right">
          <div className="menu-extra-links">
            <div className="menu-extra-col">
              {secondaryMenuLinks.map((link, index) => (
                <div className="menu-extra-col1-link-item" key={index}>
                  <div className="menu-extra-col1-link-wrapper" onClick={toggleMenu}>
                    <TransitionLink href={link.path} className="menu-extra-link">
                      <ButtonRev param={link.label} size="large" color="black" />
                    </TransitionLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="menu-contact-info">
            <a href={`mailto:${email}`}>{email}</a>
            <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
            <p>{location}</p>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default MenuComponent
