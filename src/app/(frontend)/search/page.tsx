import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardRecipeData } from '@/components/Card'

export const revalidate = 600

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

const querySearch = cache(async (query: string) => {
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'search',
    depth: 0,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })
})

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const recipes = await querySearch(query)

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Search</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {recipes.totalDocs > 0 ? (
        <CollectionArchive recipes={recipes.docs as CardRecipeData[]} />
      ) : (
        <div className="container">No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Elart Search`,
  }
}
