'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) return match[1]
  }

  return null
}

export const MediaAndTextHero: React.FC<Page['hero']> = ({ links, media, title, youtubeUrl }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const videoId = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null

  return (
    <div
      className="relative flex items-center justify-center text-white overflow-hidden h-screen"
      data-theme="dark"
    >
      <div className="container z-10 relative flex items-center justify-center">
        <div className="max-w-[70rem] md:text-center">
          {title && <h1 className="mb-6 font-anton uppercase text-beige text-9xl">{title}</h1>}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        {videoId ? (
            <div
              className="absolute inset-0 overflow-hidden transition-all duration-500"
            >
              <div
                className="w-[120%] h-[120%] -ml-[10%] -mt-[10%]"
              >
                <iframe
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&rel=0`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="YouTube video"
                />
              </div>
            </div>
          ) : (
          media &&
          typeof media === 'object' && (
            <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
          )
        )}
      </div>
    </div>
  )
}
