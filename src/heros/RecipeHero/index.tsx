import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'
import Image from 'next/image'

import type { Recipe } from '@/payload-types'

import { Media } from '@/components/Media'
import { RecipeFavoriteButton } from '@/components/RecipeFavoriteButton'
import { formatAuthors } from '@/utilities/formatAuthors'

export const RecipeHero: React.FC<{
  recipe: Recipe
}> = ({ recipe }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title, slug, meta, servings } =
    recipe

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid text-white pb-8">
        <div className="max-w-[48rem]">
          <div className="flex gap-3 text-sm mb-4">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                return (
                  <div
                    className="w-[fit-content] bg-beige py-1 px-3 font-anton uppercase text-darkBrown rounded-lg"
                    key={index}
                  >
                    {titleToUse}
                  </div>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-anton uppercase text-beige">
              {title}
            </h1>
          </div>

          <div className="mb-4">
            <RecipeFavoriteButton recipe={{ slug, categories, meta, title, servings }} />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16  text-beige">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1 text-sm">
                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== 'string' ? (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        ) : (
          <Image
            className="absolute inset-0 w-full h-full object-cover -z-10"
            src="/fallback.jpg"
            alt="Fallback recipe image"
            fill
            priority
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
