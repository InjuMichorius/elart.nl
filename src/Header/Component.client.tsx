'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { MenuOverlay } from './MenuOverlay'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className="fixed top-0 right-0 left-0 z-50 mx-auto"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="p-6 md:p-8 flex justify-between items-center">
          <Link href="/" className={`${menuOpen ? 'opacity-0' : ''}`}>
            <Logo loading="eager" priority="high" />
          </Link>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex gap-1 items-center justify-center whitespace-nowrap rounded-[10px] text-md font-anton uppercase ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-green text-beige hover:bg-green/90"
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={menuOpen}
          >
            <span className="relative w-5 h-5 flex-shrink-0">
              {/* Hamburger lines */}
              <span
                className={`absolute left-0 top-[4px] w-4 h-[2px] bg-beige transition-all duration-300 origin-center rounded-full ${menuOpen ? 'top-[10px] -translate-y-1/2 rotate-45' : ''}`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-beige transition-all duration-300 rounded-full ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`absolute left-0 bottom-[4px] w-4 h-[2px] bg-beige transition-all duration-300 origin-center rounded-full ${menuOpen ? 'bottom-[10px] translate-y-1/2 -rotate-45' : ''}`}
              />
            </span>
            <span>{menuOpen ? 'Sluiten' : 'Menu'}</span>
          </button>
        </div>
      </header>
      <MenuOverlay data={data} isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
