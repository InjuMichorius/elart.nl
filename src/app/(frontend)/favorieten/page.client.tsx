'use client'

import { CollectionArchive } from '@/components/CollectionArchive'
import { useFavorites } from '@/hooks/useFavorites'
import React from 'react'

export default function FavorietenClient() {
  const { favorites, hydrated } = useFavorites()

  return (
    <div className="pt-24 pb-24 bg-beigeDark min-h-screen">
      <div className="container mb-10">
        <h1 className="font-anton text-4xl">Mijn favorieten</h1>
      </div>

      {!hydrated ? null : favorites.length === 0 ? (
        <div className="container">
          <p className="text-darkBrown/60">
            Je hebt nog geen favorieten opgeslagen. Klik op het hartje op een recept om het hier te
            bewaren.
          </p>
        </div>
      ) : (
        <CollectionArchive recipes={favorites} />
      )}
    </div>
  )
}
