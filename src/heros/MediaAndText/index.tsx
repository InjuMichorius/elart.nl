'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'

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
  const [isVisible, setIsVisible] = useState(false)
  const [showM6, setShowM6] = useState(false)

  useEffect(() => {
    setHeaderTheme('dark')
    const timer = setTimeout(() => setIsVisible(true), 100)
    const m6Timer = setTimeout(() => setShowM6(true), 1000)
    return () => {
      clearTimeout(timer)
      clearTimeout(m6Timer)
    }
  }, [setHeaderTheme])

  const videoId = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null

  return (
    <div
      className="relative flex items-center justify-center text-white overflow-hidden h-screen"
      data-theme="dark"
    >
      <div
        className={`absolute inset-0 bg-black transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-0' : 'opacity-60'
        }`}
      />
      <div className="container z-10 relative flex items-center justify-center">
        <div className="max-w-[70rem] text-center">
          {title && (
            <h1
              className={`font-anton uppercase text-beige transition-all duration-700 ease-out transform text-balance ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl`}
            >
              {title}
            </h1>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul
              className={`flex md:justify-center gap-4 transition-all duration-700 delay-200 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
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
      <div className={`absolute inset-0 -z-10 overflow-hidden bg-black transition-all duration-500 ease-in ${showM6 ? 'm-4 rounded-[1rem]' : ''}`}>
        {videoId ? (
          <div className="relative w-full h-full pointer-events-none">
            <iframe
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-full min-w-full md:h-[100vw] md:min-h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&rel=0`}
              allow="autoplay; encrypted-media"
              title="YouTube video"
            />
            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/30" />
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
