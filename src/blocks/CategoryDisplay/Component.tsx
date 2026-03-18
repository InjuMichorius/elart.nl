'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { CategoryDisplayBlock as CategoryDisplayBlockProps } from '@/payload-types'

const MAX_VISIBLE_DESKTOP = 5
const MAX_VISIBLE_MOBILE = 1

export const CategoryDisplayBlock: React.FC<CategoryDisplayBlockProps> = ({
  categories,
  title,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const categoryCount = Array.isArray(categories) ? categories.length : 0

  const checkIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [checkIsMobile])

  const maxVisible = isMobile ? MAX_VISIBLE_MOBILE : MAX_VISIBLE_DESKTOP
  const needsSlider = categoryCount > maxVisible

  const checkScrollability = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanScrollLeft(scrollLeft > 1)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
  }, [])

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

  useEffect(() => {
    checkScrollability()

    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', checkScrollability, { passive: true })
    window.addEventListener('resize', checkScrollability)

    return () => {
      container.removeEventListener('scroll', checkScrollability)
      window.removeEventListener('resize', checkScrollability)
    }
  }, [checkScrollability, isVisible, isMobile])

  const scrollByDirection = (direction: 'left' | 'right') => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll<HTMLElement>('[data-category-item]')
    const itemWidth = items[0]?.offsetWidth ?? container.clientWidth

    container.scrollBy({
      left: direction === 'right' ? itemWidth : -itemWidth,
      behavior: 'smooth',
    })
  }

  const updatePosition = (target: HTMLElement) => {
    const container = containerRef.current
    if (!container) return

    const targetRect = target.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    setPosition({
      x: targetRect.left - containerRect.left + container.scrollLeft,
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
    <div className="flex flex-col items-center justify-center py-12 lg:py-24 bg-beige gap-8 min-h-[30rem]">
      {title && (
        <h2
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s`,
          }}
          className="text-3xl font-anton font-bold text-darkBrown uppercase"
        >
          {title}
        </h2>
      )}

      <div className="relative w-full max-w-5xl mx-auto px-12 md:px-0">
        <div
          ref={containerRef}
          className="relative flex flex-nowrap overflow-x-auto px-4 scrollbar-hide snap-x snap-mandatory md:snap-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div
            className="absolute bg-beigeDark rounded-2xl pointer-events-none z-0 transition-all duration-500 hidden md:block"
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
                  data-category-item
                  className="relative z-10 flex flex-col items-center gap-4 p-6 rounded-2xl transition-colors duration-300 group shrink-0 snap-center"
                  onMouseEnter={handleMouseEnter(i)}
                  style={{
                    width: isMobile
                      ? '100%'
                      : needsSlider
                        ? `${100 / MAX_VISIBLE_DESKTOP}%`
                        : undefined,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease-out ${i * 0.1}s, transform 0.5s ease-out ${i * 0.1}s`,
                  }}
                >
                  {catImage && (
                    <div className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <Media
                        resource={catImage}
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <span className="text-darkBrown font-anton text-xl transition-colors duration-300 group-hover:text-green">
                    {catTitle}
                  </span>
                </Link>
              )
            })}
        </div>

        {canScrollLeft && (
          <button
            onClick={() => scrollByDirection('left')}
            aria-label="Scroll left"
            className="absolute left-0 md:-left-10 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-10 md:size-12 rounded-full bg-green text-white shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scrollByDirection('right')}
            aria-label="Scroll right"
            className="absolute right-0 md:-right-10 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-10 md:size-12 rounded-full bg-green text-white shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
