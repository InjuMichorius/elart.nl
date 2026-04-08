'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { CardRecipeData } from '@/components/Card'
import { useFavorites } from '@/hooks/useFavorites'

type Props = {
  recipe: CardRecipeData
  className?: string
}

export const RecipeFavoriteButton: React.FC<Props> = ({ recipe, className }) => {
  const { isFavorite, toggleFavorite, hydrated } = useFavorites()
  const active = hydrated && isFavorite(recipe.slug ?? '')
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = buttonRef.current
    if (!el) return
    const stop = (e: MouseEvent) => e.stopPropagation()
    el.addEventListener('mousedown', stop)
    el.addEventListener('mouseup', stop)
    return () => {
      el.removeEventListener('mousedown', stop)
      el.removeEventListener('mouseup', stop)
    }
  }, [])

  if (!hydrated) return null

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => toggleFavorite(recipe)}
      aria-label={active ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-full',
        'border-2 transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige',
        active
          ? 'bg-beige text-darkBrown border-beige'
          : 'bg-transparent text-beige border-beige/60 hover:border-beige',
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={cn('w-5 h-5 transition-all duration-200', {
          'fill-red-500 stroke-red-500': active,
          'fill-none stroke-current': !active,
        })}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="text-sm font-anton uppercase">
        {active ? 'Opgeslagen' : 'Bewaar recept'}
      </span>
    </button>
  )
}
