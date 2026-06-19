import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

const queryRecipes = cache(async (page: number) => {
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'recipes',
    depth: 0,
    limit: 12,
    page,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })
})

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const recipes = await queryRecipes(sanitizedPageNumber)

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Recipes</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="recipes"
          currentPage={recipes.page}
          limit={12}
          totalDocs={recipes.totalDocs}
        />
      </div>

      <CollectionArchive recipes={recipes.docs} />

      <div className="container">
        {recipes?.page && recipes?.totalPages > 1 && (
          <Pagination page={recipes.page} totalPages={recipes.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Elart Recipes Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'recipes',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
