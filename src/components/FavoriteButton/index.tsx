'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { CardRecipeData } from '@/components/Card'
import { useFavorites } from '@/hooks/useFavorites'

type Props = {
  recipe: CardRecipeData
  className?: string
}

export const FavoriteButton: React.FC<Props> = ({ recipe, className }) => {
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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(recipe)
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={active ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
      className={cn(
        'absolute top-2 right-2 z-20 p-1.5 rounded-full',
        'bg-beige/80 backdrop-blur-sm',
        'transition-all duration-200 hover:scale-110 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkBrown',
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={cn('w-5 h-5 transition-all duration-200', {
          'fill-red-500 stroke-red-500': active,
          'fill-none stroke-darkBrown': !active,
        })}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}
