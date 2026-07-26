'use client'

import { cn } from '@/utilities/ui'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type Props = {
  items: { item: string }[]
}

export default function Keukengerei({ items }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="h-[fit-content] bg-beigeDark p-6 rounded-xl">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full"
        aria-expanded={open}
      >
        <h2 className="text-xl font-anton">Keukengerei</h2>
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
          open ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0',
        )}
      >
        <div className="overflow-hidden">
          <ul className="text-sm divide-y divide-darkBrown/10">
            {items.map((entry, index) => (
              <li key={index} className="flex justify-between py-1.5 gap-4">
                <span className="text-darkBrown/70">{entry.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
