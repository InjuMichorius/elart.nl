import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'

export const revalidate = 600

const queryCategoryBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
})

const queryRecipesByCategory = cache(async (categoryId: string) => {
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'recipes',
    where: {
      categories: { equals: categoryId },
    },
    limit: 12,
    depth: 0,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      servings: true,
    },
  })
})

export default async function CategoryPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await paramsPromise

  const categoryResult = await queryCategoryBySlug(slug)

  const category = categoryResult.docs[0]
  if (!category) return notFound()

  const recipesResult = await queryRecipesByCategory(category.id)

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Recepten in {category.title}</h1>
        </div>
      </div>
      <div className="container mb-8">
        <PageRange
          collection="recipes"
          currentPage={recipesResult.page}
          limit={12}
          totalDocs={recipesResult.totalDocs}
        />
      </div>
      <CollectionArchive recipes={recipesResult.docs} />
      {recipesResult.docs.length === 0 && (
        <div className="container mt-8">
          <p>Geen recepten gevonden in deze categorie.</p>
        </div>
      )}
      <div className="container">
        {recipesResult.totalPages > 1 && recipesResult.page && (
          <Pagination page={recipesResult.page} totalPages={recipesResult.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    select: { slug: true },
  })
  return categories.docs.map(({ slug }) => ({ slug }))
}
