import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Recipe } from '@/payload-types'

import { Card, CardBgColor } from '../../components/Card'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RelatedRecipesProps = {
  bgColor?: CardBgColor
  className?: string
  docs?: Recipe[]
  introContent?: SerializedEditorState
}

export const RelatedRecipes: React.FC<RelatedRecipesProps> = (props) => {
  const { bgColor = 'beigeDark', className, docs, introContent } = props

  const containerBgClass = bgColor === 'beigeDark' ? 'bg-beigeDark' : 'bg-beige'

  return (
    <div className={clsx('lg:container', className)}>
      <div className={clsx('py-6 px-4 rounded-2xl', containerBgClass)}>
        <h3
          className={clsx(
            'text-3xl font-bold mb-3',
            bgColor === 'beigeDark' ? 'text-beige' : 'text-darkBrown',
          )}
        >
          Gerelateerde recepten
        </h3>
        {introContent && <RichText data={introContent} enableGutter={false} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
          {docs?.map((doc, index) => {
            if (typeof doc === 'string') return null

            return (
              <Card key={index} bgColor={bgColor} doc={doc} relationTo="recipes" showCategories />
            )
          })}
        </div>
      </div>
    </div>
  )
}
