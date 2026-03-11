'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { CategoryDisplayBlock as CategoryDisplayBlockProps } from '@/payload-types'

export const CategoryDisplayBlock: React.FC<CategoryDisplayBlockProps> = ({
  categories,
  title,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 })
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

  const updatePosition = (target: HTMLElement) => {
    const container = containerRef.current
    if (!container) return

    const targetRect = target.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    setPosition({
      x: targetRect.left - containerRect.left,
      y: targetRect.top - containerRect.top,
      width: targetRect.width,
      height: targetRect.height,
    })
  }

  const handleMouseEnter = (index: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveIndex(index)
    updatePosition(e.currentTarget)
  }

  useEffect(() => {
    const handleResize = () => {
      if (activeIndex !== null && containerRef.current) {
        const activeElement = containerRef.current.children[activeIndex + 1] as HTMLElement
        if (activeElement) updatePosition(activeElement)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeIndex])

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-beige gap-8 min-h-[30rem]">
      {title && (
        <h2 style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s`,
            }}
            className="text-3xl font-anton font-bold text-brown uppercase font-anton uppercase">
          {title}
        </h2>
      )}

      <div
        ref={containerRef}
        className="relative flex flex-wrap gap-4 justify-center px-4 max-w-7xl mx-auto"
        onMouseLeave={() => setActiveIndex(null)}
      >
        <div
          className="absolute bg-beigeDark rounded-2xl pointer-events-none z-0 transition-all duration-500"
          style={{
            left: 0,
            top: 0,
            width: `${position.width}px`,
            height: `${position.height}px`,
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            opacity: activeIndex !== null ? 1 : 0,
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        />

        {Array.isArray(categories) &&
          categories.map((cat, i) => {
            const isObject = typeof cat === 'object' && cat !== null
            const catTitle = isObject ? (cat as any).title : String(cat)
            const catSlug = isObject ? (cat as any).slug : ''
            const catImage = isObject ? (cat as any).image : null
            const key = isObject ? (cat as any).id || i : i

            return (
              <Link
                key={key}
                href={`/categories/${catSlug}`}
                className="relative z-10 flex flex-col items-center gap-4 p-6 rounded-2xl transition-colors duration-300 group"
                onMouseEnter={handleMouseEnter(i)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease-out ${i * 0.1}s, transform 0.5s ease-out ${i * 0.1}s`,
                }}
              >
                {catImage && (
                  <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Media
                      resource={catImage}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span className="text-brown font-anton text-xl transition-colors duration-300 group-hover:text-green">
                  {catTitle}
                </span>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
