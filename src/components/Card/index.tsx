'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Recipe } from '@/payload-types'

import { ImageMedia } from '@/components/Media/ImageMedia'

export type CardRecipeData = Pick<Recipe, 'slug' | 'categories' | 'meta' | 'title'> & {
  servings?: number
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardRecipeData
  isActive?: boolean
  relationTo?: 'recipes'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, isActive, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, servings } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <article
      tabIndex={0}
      className={cn(
        'bg-beige rounded-2xl overflow-hidden h-fit md:hover:bg-green md:hover:cursor-pointer md:hover:-translate-y-2 group relative transition-all duration-500',
        isActive && 'bg-green -translate-y-2',
        className,
      )}
      ref={card.ref as React.Ref<HTMLElement>}
    >
      <div className="relative overflow-hidden">
        {!metaImage && <p>No image</p>}
        {metaImage && typeof metaImage === 'object' && (
          <ImageMedia
            resource={metaImage}
            imgClassName={cn(
              'w-full h-full object-cover aspect-[4/2] transition-transform duration-500 md:group-hover:scale-105',
              isActive && 'scale-105',
            )}
          />
        )}
        <div
          className={cn(
            'absolute inset-0 bg-black/0 transition-colors duration-500 md:group-hover:bg-black/20',
            isActive && 'bg-black/20',
          )}
        />

        {showCategories && (hasCategories || servings) && (
          <ul className="absolute bottom-2 left-2 text-sm flex gap-2 z-10 text-brown font-anton uppercase">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const title = category.title || 'Untitled category'
                return (
                  <li
                    key={`cat-${index}`}
                    style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
                    className={cn(
                      'bg-beige rounded-[6px] px-2 py-1 transform transition-all duration-300 ease-out',
                      'xl:translate-y-4 xl:opacity-0 xl:[transition-delay:0ms]',
                      'xl:group-hover:translate-y-0 xl:group-hover:opacity-100 xl:group-hover:[transition-delay:var(--delay)]',
                      'xl:group-focus-visible:translate-y-0 xl:group-focus-visible:opacity-100 xl:group-focus-visible:[transition-delay:var(--delay)]',
                      isActive &&
                        'xl:translate-y-0 xl:opacity-100 xl:[transition-delay:var(--delay)]',
                    )}
                  >
                    {title}
                  </li>
                )
              }
              return null
            })}
            {typeof servings === 'number' && servings > 0 && (
              <li
                key="servings"
                style={{ '--delay': `${(categories?.length || 0) * 80}ms` } as React.CSSProperties}
                className={cn(
                  'bg-beige rounded-[6px] px-2 py-1 transform transition-all duration-300 ease-out',
                  'xl:translate-y-4 xl:opacity-0 xl:[transition-delay:0ms]',
                  'xl:group-hover:translate-y-0 xl:group-hover:opacity-100 xl:group-hover:[transition-delay:var(--delay)]',
                  'xl:group-focus-visible:translate-y-0 xl:group-focus-visible:opacity-100 xl:group-focus-visible:[transition-delay:var(--delay)]',
                  isActive && 'xl:translate-y-0 xl:opacity-100 xl:[transition-delay:var(--delay)]',
                )}
              >
                {servings} porties
              </li>
            )}
          </ul>
        )}
      </div>
      <div
        className={cn(
          'p-4 md:group-hover:text-beige transition-all duration-500',
          isActive && 'text-beige',
        )}
      >
        {titleToUse && (
          <h3 className="line-clamp-2 text-xl/6 font-anton font-bold uppercase">{titleToUse}</h3>
        )}
        {description && (
          <div className="mt-2">
            <p className="line-clamp-2">{sanitizedDescription}</p>
          </div>
        )}
      </div>

      <Link
        href={href}
        className="absolute inset-0 z-10"
        aria-label={titleToUse || 'Card link'}
        ref={link.ref as React.Ref<HTMLAnchorElement>}
      />
    </article>
  )
}
