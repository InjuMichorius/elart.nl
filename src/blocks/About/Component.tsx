// components/blocks/AboutBlock.tsx
import React from 'react'
import type { AboutBlock as AboutBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & AboutBlockProps

export const AboutBlock: React.FC<Props> = ({ title, text, images }) => {
  const hasImages = images && images.length > 0

  return (
    <div className="pt-3 pb-3 bg-beige text-brown">
      <div className="container mx-auto py-12 lg:py-24 flex flex-col-reverse lg:flex-row items-center place-content-between gap-[3rem]">
        <div>
          <h2 className="text-3xl font-anton uppercase mb-4">{title}</h2>
          {text && <RichText data={text} className="p-0 font-roboto" />}
        </div>

        {hasImages && (
          <div
            className="grid gap-3 flex-shrink-0"
            style={{
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {images.map(({ image }, i) => {
              if (!image || typeof image !== 'object') return null
              return (
                <Media
                  key={i}
                  resource={image}
                  imgClassName="rounded-2xl aspect-square object-cover w-full lg:w-[300px] lg:h-[300px]]"
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
