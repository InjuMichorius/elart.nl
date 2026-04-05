'use client'

import React, { useEffect, useRef, useState } from 'react'

import type { DisplayRecipesBlock as DisplayRecipesBlockProps } from '@/payload-types'
import { Card } from '@/components/Card'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & DisplayRecipesBlockProps

export const DisplayRecipesBlock: React.FC<Props> = ({ className, title, button, recipes }) => {
  const hasButton = !!(button && button.length > 0 && button[0]?.link)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className={cn('py-12 lg:py-24 bg-beigeDark', className)} ref={containerRef}>
      <div className="container mx-auto grid gap-8 md:grid-cols-12">
        {title && (
          <h2
            className={cn(
              'text-3xl text-darkBrown font-anton uppercase font-bold',
              'order-1 md:order-1',
              hasButton ? 'md:col-span-8' : 'md:col-span-12',
            )}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s`,
            }}
          >
            {title}
          </h2>
        )}
        {recipes && recipes.length > 0 && (
          <div
            className={cn(
              'order-2 md:order-3',
              'md:col-span-12',
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center items-center gap-6',
            )}
          >
            {recipes.map((recipe, index) => {
              if (typeof recipe.recipe === 'object' && recipe.recipe) {
                return (
                  <div
                    key={index}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`,
                    }}
                  >
                    <Card doc={recipe.recipe} relationTo="recipes" showCategories={true} />
                  </div>
                )
              }
              return null
            })}
          </div>
        )}
        {hasButton && (
          <div
            className={cn(
              'order-3 md:order-2',
              'md:col-span-4 md:col-start-9',
              'md:self-end md:justify-self-end',
              'flex justify-start',
            )}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s`,
            }}
          >
            <CMSLink {...button![0]!.link} />
          </div>
        )}
      </div>
    </div>
  )
}
