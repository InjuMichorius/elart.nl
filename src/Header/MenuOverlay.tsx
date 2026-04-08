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

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ data, isOpen, onClose }) => {
  const navItems = data?.navItems || []
  const { favorites, hydrated } = useFavorites()
  const count = hydrated ? favorites.length : 0

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 bg-beige flex flex-col items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ height: '100dvh', minHeight: '-webkit-fill-available' }}
      aria-hidden={!isOpen}
    >
      <nav className="flex flex-col items-center gap-8">
        <CMSLink
          type="custom"
          url="/"
          label="Home"
          appearance="inline"
          className="text-4xl font-anton tracking-wide text-darkBrown uppercase"
        />
        <CMSLink
          type="custom"
          url="/recipes"
          label="Recepten"
          appearance="inline"
          className="text-4xl font-anton tracking-wide text-darkBrown uppercase"
        />
        <div className="relative inline-flex items-center">
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
        {navItems.map(({ link }, i) => (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            className="text-4xl font-anton tracking-wide text-darkBrown uppercase"
          />
        ))}
        <Link
          href="/search"
          onClick={onClose}
          className="mt-4 flex items-center gap-2 text-4xl font-anton text-darkBrown uppercase"
        >
          <SearchIcon className="w-16" />
          <span>Zoeken</span>
        </Link>
      </nav>
    </div>
  )
}
