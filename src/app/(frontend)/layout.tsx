import type { Metadata } from 'next'

import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './styles.scss'

import { getServerSideURL } from '@/utilities/getURL'
import CustomCursor from '@/components/customCurosr/customCursor'
import SmoothScroll from '@/components/smoothScroll/smoothScroll'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media, SiteSetting } from '@/payload-types'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const siteSettings: SiteSetting = await getCachedGlobal('site-settings', 1)()
  const favicon = siteSettings?.branding?.favicon as Media | undefined

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        {favicon ? (
          <>
            <link
              href={getMediaUrl(favicon)}
              rel="icon"
              type={favicon.mimeType || 'image/x-icon'}
            />
          </>
        ) : (
          <>
            <link href="/favicon.ico" rel="icon" sizes="32x32" />
            <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
          </>
        )}
      </head>
      <body>
        <Providers>
          <CustomCursor />
          <SmoothScroll />
          <div
            id="banner-1"
            className="min-h-screen bg-neutral-950 z-[9999999] fixed top-0 left-0 w-full"
          ></div>
          <div>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
