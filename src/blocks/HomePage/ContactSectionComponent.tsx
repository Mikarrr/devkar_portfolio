import React from 'react'
import Link from 'next/link'
import ButtonRev from '@/components/buttonRev/buttonRev'
import AnimContact from '@/components/animGSAP/animContact'

type SocialLink = {
  platform: string
  url?: string
}

type ContactSectionProps = {
  sectionLabel: string
  heading: string
  socialLinks?: SocialLink[]
  address?: string
  description?: string
  email?: string
  phone?: string
  phoneRaw?: string
}

export const ContactSectionBlock: React.FC<ContactSectionProps> = ({
  sectionLabel,
  heading,
  socialLinks,
  address,
  description,
  email,
  phone,
  phoneRaw,
}) => {
  return (
    <AnimContact>
      <div className="info-section">
        <p>{sectionLabel}</p>
      </div>
      <h1 className="custom-h1">{heading}</h1>
      <div className="contact-down-inner">
        <div className="top-row">
          {socialLinks && socialLinks.length > 0 && (
            <div className="social-media">
              <p className="tag">SOCIAL</p>
              {socialLinks.map((link, index) => (
                <div key={index}>
                  {link.url ? (
                    <Link href={link.url}>
                      <ButtonRev param={link.platform} size="small" color="white"></ButtonRev>
                    </Link>
                  ) : (
                    <ButtonRev param={link.platform} size="small" color="white"></ButtonRev>
                  )}
                </div>
              ))}
            </div>
          )}
          {address && (
            <div className="adress-info">
              <p className="tag">ADRES</p>
              <p>{address}</p>
            </div>
          )}
        </div>

        <div className="contact-info">
          {description && <p className="contact-description">{description}</p>}
          {email && (
            <div>
              <a href={`mailto:${email}`}>
                <ButtonRev param={email} size="small" color="white"></ButtonRev>
              </a>
            </div>
          )}
          {phone && phoneRaw && (
            <div>
              <a href={`tel:${phoneRaw}`}>
                <ButtonRev param={phone} size="small" color="white"></ButtonRev>
              </a>
            </div>
          )}
        </div>
      </div>
    </AnimContact>
  )
}
