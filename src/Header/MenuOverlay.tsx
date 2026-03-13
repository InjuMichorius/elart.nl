'use client'

import React from 'react'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

interface MenuOverlayProps {
  data: HeaderType
  isOpen: boolean
  onClose: () => void
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ data, isOpen, onClose }) => {
  const navItems = data?.navItems || []

  return (
    <div
      className={`fixed inset-0 z-40 bg-beige flex flex-col items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
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
          className="mt-4 flex items-center gap-2 text-lg font-anton text-darkBrown uppercase"
        >
          <SearchIcon className="w-5" />
          <span>Zoeken</span>
        </Link>
      </nav>
    </div>
  )
}
