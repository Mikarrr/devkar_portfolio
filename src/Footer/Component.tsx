import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { SiteSetting } from '@/payload-types'

import Link from 'next/link'
import ButtonRev from '@/components/buttonRev/buttonRev'

export async function Footer() {
  const siteSettings: SiteSetting = await getCachedGlobal('site-settings', 1)()

  const socialPlatforms = siteSettings?.socialMedia?.platforms || []
  const email = siteSettings?.contact?.email || 'karwacki.mikolaj123@gmail.com'
  const phone = siteSettings?.contact?.phone || '+48 724 798 688'
  const location = siteSettings?.contact?.location || 'Poland, Poznań'

  // Format phone for tel: link (remove spaces and special chars except +)
  const phoneLink = phone.replace(/[\s-]/g, '')

  return (
    <footer className="footer">
      <hr />
      <div className="up-footer">
        <div className="social">
          <p className="text">SOCIAL</p>
          {socialPlatforms.map((social, index) => {
            const platformName = social.platform === 'other' ? social.customName : social.platform
            const displayName = platformName
              ? platformName.charAt(0).toUpperCase() + platformName.slice(1)
              : 'Link'

            return (
              <div key={index}>
                <Link href={social.url || '#'} target="_blank" rel="noopener noreferrer">
                  <ButtonRev param={displayName} size="small" color="white" />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="address">
          <p className="text">ADRES</p>
          <p className="small-text">{location}</p>
        </div>

        <div className="contact-footer">
          <p className="text">KONTAKT</p>
          <div>
            <a href={`mailto:${email}`}>
              <ButtonRev param={email} size="small" color="white" />
            </a>
          </div>
          <div>
            <a href={`tel:${phoneLink}`}>
              <ButtonRev param={phone} size="small" color="white" />
            </a>
          </div>
        </div>
      </div>

      <hr className="red" />

      <div className="down-footer">
        <p className="text">Design by davkar</p>
        <p className="text">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
