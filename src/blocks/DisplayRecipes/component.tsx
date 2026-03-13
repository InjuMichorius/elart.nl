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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const visibleCards = useRef<Set<number>>(new Set())

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

  // Activate the card closest to the vertical center of the viewport,
  // but only on devices that don't support hover (touch screens).
  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover)').matches
    if (supportsHover) return

    const observers: IntersectionObserver[] = []

    cardRefs.current.forEach((el, index) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            visibleCards.current.add(index)
            // Activate the card with the highest index currently in the zone
            // (last entered = most centered when scrolling either direction)
            const max = Math.max(...visibleCards.current)
            setActiveIndex(max)
          } else {
            visibleCards.current.delete(index)
            if (visibleCards.current.size === 0) {
              setActiveIndex(null)
            } else {
              const max = Math.max(...visibleCards.current)
              setActiveIndex(max)
            }
          }
        },
        {
          rootMargin: '-35% 0px -35% 0px',
          threshold: 0,
        },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [recipes])

  return (
    <div className={cn('py-12 bg-beigeDark', className)} ref={containerRef}>
      <div className="container mx-auto grid gap-8 md:grid-cols-12">
        {title && (
          <h2
            className={cn(
              'text-3xl text-brown font-anton uppercase font-bold',
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
                    ref={(el) => {
                      cardRefs.current[index] = el
                    }}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`,
                    }}
                  >
                    <Card
                      doc={recipe.recipe}
                      relationTo="recipes"
                      showCategories={true}
                      isActive={activeIndex === index}
                    />
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
