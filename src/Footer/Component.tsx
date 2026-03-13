import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Instagram, Music2, Youtube, Facebook, PinIcon, Twitter, Mail } from 'lucide-react'

import type { Footer } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'

const socialIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram className="w-5 h-5" />,
  tiktok: <Music2 className="w-5 h-5" />,
  youtube: <Youtube className="w-5 h-5" />,
  facebook: <Facebook className="w-5 h-5" />,
  pinterest: <PinIcon className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
}

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const { tagline, email, socialLinks, navItems } = footerData

  const payload = await getPayload({ config: configPromise })
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 12,
    sort: 'title',
  })
  const categories = categoriesResult.docs

  return (
    <footer className="bg-darkBrown text-beige">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Home">
              <Logo />
            </Link>
            {tagline && (
              <p className="text-sm text-beige/70 leading-relaxed max-w-[220px]">{tagline}</p>
            )}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-3 mt-1">
                {socialLinks.map(({ platform, url, id }) => (
                  <a
                    key={id ?? platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="w-9 h-9 rounded-full border border-beige/20 flex items-center justify-center text-beige/70 hover:text-beige hover:border-beige transition-colors duration-200"
                  >
                    {socialIcons[platform]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2 — Categories + nav items */}
          <div className="flex flex-col gap-4">
            <h3 className="font-anton uppercase text-sm tracking-widest text-beige/50">
              Categorieën
            </h3>
            <ul className="flex flex-col gap-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-beige/70 hover:text-beige transition-colors duration-200 text-sm"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
              {navItems &&
                navItems.length > 0 &&
                navItems.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      appearance="inline"
                      className="text-beige/70 hover:text-beige transition-colors duration-200 text-sm"
                    />
                  </li>
                ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-anton uppercase text-sm tracking-widest text-beige/50">Contact</h3>
            {email ? (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-beige/70 hover:text-beige transition-colors duration-200 text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                {email}
              </a>
            ) : (
              <p className="text-beige/40 text-sm">Nog geen e-mailadres ingesteld.</p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-beige/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-beige/30">
          <span>© {new Date().getFullYear()} Elart. Alle rechten voorbehouden.</span>
        </div>
      </div>
    </footer>
  )
}
