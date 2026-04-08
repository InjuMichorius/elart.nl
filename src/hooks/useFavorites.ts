'use client'

import { useCallback, useEffect, useState } from 'react'

import type { CardRecipeData } from '@/components/Card'

const STORAGE_KEY = 'elart_favorieten'
const SYNC_EVENT = 'elart_favorieten_sync'

function readFromStorage(): CardRecipeData[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as CardRecipeData[]) : []
  } catch {
    return []
  }
}

function writeToStorage(next: CardRecipeData[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    window.dispatchEvent(new CustomEvent(SYNC_EVENT))
  } catch {
    // ignore storage errors (e.g. private mode quota)
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<CardRecipeData[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setFavorites(readFromStorage())
    setHydrated(true)

    const onSync = () => setFavorites(readFromStorage())

    // custom event: same tab, cross-component
    window.addEventListener(SYNC_EVENT, onSync)
    // storage event: other tabs
    window.addEventListener('storage', onSync)

    return () => {
      window.removeEventListener(SYNC_EVENT, onSync)
      window.removeEventListener('storage', onSync)
    }
  }, [])

  const isFavorite = useCallback(
    (slug: string) => favorites.some((r) => r.slug === slug),
    [favorites],
  )

  const toggleFavorite = useCallback((recipe: CardRecipeData) => {
    // Always read fresh from storage to avoid stale closure issues
    const current = readFromStorage()
    const exists = current.some((r) => r.slug === recipe.slug)
    const next = exists ? current.filter((r) => r.slug !== recipe.slug) : [...current, recipe]
    writeToStorage(next)
  }, [])

  return { favorites, isFavorite, toggleFavorite, hydrated }
}
