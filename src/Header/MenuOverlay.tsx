'use client'

import React from 'react'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { useFavorites } from '@/hooks/useFavorites'

interface MenuOverlayProps {
  data: HeaderType
  isOpen: boolean
  onClose: () => void
}

const NAV_ITEM_DELAY_BASE = 200 // ms — open: starts after background finishes
const NAV_ITEM_STAGGER = 60 // ms between each item

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ data, isOpen, onClose }) => {
  const navItems = data?.navItems || []
  const { favorites, hydrated } = useFavorites()
  const count = hydrated ? favorites.length : 0

  const staticItems = [
    { label: 'Home', url: '/' },
    { label: 'Recepten', url: '/recipes' },
  ]

  const allItemCount = staticItems.length + 1 + navItems.length + 1 // +1 favorieten, +1 zoeken

  const itemDelay = (index: number) =>
    isOpen ? `${NAV_ITEM_DELAY_BASE + index * NAV_ITEM_STAGGER}ms` : `${index * NAV_ITEM_STAGGER}ms`

  // open: items enter from below → rest; close: items exit upward
  const itemStyle = (index: number): React.CSSProperties => ({
    transitionDelay: itemDelay(index),
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-12px)',
  })

  return (
    <div className="fixed inset-0 z-40 pointer-events-none" aria-hidden={!isOpen}>
      {/* Background: clip-path scale from top-right */}
      <div
        className="absolute inset-0 bg-beige transition-all duration-500 ease-in-out origin-top-right"
        style={{
          clipPath: isOpen ? 'circle(150% at 100% 0%)' : 'circle(0% at 100% 0%)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* Nav content */}
      <nav
        className="relative z-10 h-full flex flex-col items-center justify-center gap-8"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {staticItems.map(({ label, url }, i) => (
          <div key={url} className="transition-all duration-300 ease-out" style={itemStyle(i)}>
            <CMSLink
              type="custom"
              url={url}
              label={label}
              appearance="inline"
              className="text-4xl font-anton tracking-wide text-darkBrown uppercase"
            />
          </div>
        ))}

        {/* Favorieten with badge */}
        <div className="transition-all duration-300 ease-out" style={itemStyle(staticItems.length)}>
          <div className="inline-flex items-center">
            <CMSLink
              type="custom"
              url="/favorieten"
              label="Favorieten"
              appearance="inline"
              className="text-4xl font-anton tracking-wide text-darkBrown uppercase"
            />
            {count > 0 && (
              <span className="ml-2 w-8 h-8 px-1.5 rounded-full bg-green text-beige text-lg font-bold flex items-center justify-center leading-none">
                {count}
              </span>
            )}
          </div>
        </div>

        {navItems.map(({ link }, i) => (
          <div
            key={i}
            className="transition-all duration-300 ease-out"
            style={itemStyle(staticItems.length + 1 + i)}
          >
            <CMSLink
              {...link}
              appearance="inline"
              className="text-4xl font-anton tracking-wide text-darkBrown uppercase"
            />
          </div>
        ))}

        {/* Zoeken */}
        <div
          className="transition-all duration-300 ease-out mt-4"
          style={itemStyle(allItemCount - 1)}
        >
          <Link
            href="/search"
            onClick={onClose}
            className="flex items-center gap-3 text-4xl font-anton text-darkBrown uppercase"
          >
            <SearchIcon className="w-9 h-9" />
            <span>Zoeken</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
