'use client'

import type { StappenBlock as StappenBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

type Step = {
  title: string
  text: string
  id?: string | null
}

function CollapsibleStep({ step, index }: { step: Step; index: number }) {
  const [open, setOpen] = useState(true)

  return (
    <li className="bg-beigeDark mb-4 last:mb-0 rounded-xl px-3">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 w-full py-3 text-left"
        aria-expanded={open}
      >
        <span className="font-anton text-sm leading-none text-darkBrown shrink-0 w-7 h-7 bg-beige rounded-full flex items-center justify-center text-center">
          {index + 1}
        </span>
        <span className="flex-1 font-anton  text-darkBrown">{step.title}</span>
        <span className="flex items-center justify-center size-8 rounded-full bg-darkBrown/10 shrink-0">
          <ChevronDown
            className={cn(
              'size-4 text-darkBrown transition-transform duration-300',
              open && 'rotate-180',
            )}
          />
        </span>
      </button>

      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <p className="text-darkBrown/80 leading-relaxed pb-3">{step.text}</p>
        </div>
      </div>
    </li>
  )
}

type Props = {
  className?: string
} & StappenBlockProps

export const StappenBlock: React.FC<Props> = ({ title, steps, className }) => {
  if (!steps || steps.length === 0) return null

  return (
    <div className={cn(className)}>
      {title && <h3 className="text-2xl font-anton uppercase mb-4">{title}</h3>}
      <ol>
        {steps.map((step, i) => (
          <CollapsibleStep key={step.id ?? i} step={step} index={i} />
        ))}
      </ol>
    </div>
  )
}
