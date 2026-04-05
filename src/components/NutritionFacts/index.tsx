'use client'

import type { Recipe } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

type NutritionData = NonNullable<Recipe['nutrition']>

type Props = {
  nutrition: NutritionData
}

type Row = {
  label: string
  value: string
  indented?: boolean
}

function fmt(value: number) {
  // Round to one decimal, strip trailing .0
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}

export default function NutritionFacts({ nutrition }: Props) {
  const { energyKcal, fat, saturatedFat, carbohydrates, sugars, protein, salt } = nutrition
  const energyKj = Math.round(energyKcal! * 4.184)

  // Open by default on desktop (≥768px), closed on mobile
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    setOpen(isDesktop)
  }, [])

  const rows: Row[] = [
    { label: 'Energie', value: `${fmt(energyKj)}kJ / ${fmt(energyKcal!)}kcal` },
    { label: 'Vetten', value: `${fmt(fat!)}g` },
    { label: 'waarvan verzadigd', value: `${fmt(saturatedFat!)}g`, indented: true },
    { label: 'Koolhydraten', value: `${fmt(carbohydrates!)}g` },
    { label: 'waarvan suikers', value: `${fmt(sugars!)}g`, indented: true },
    { label: 'Eiwitten', value: `${fmt(protein!)}g` },
    { label: 'Zout', value: `${fmt(salt!)}g` },
  ]

  return (
    <div className="h-[fit-content] bg-beigeDark p-6 rounded-xl">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full"
        aria-expanded={open}
      >
        <h2 className="text-xl font-anton">Voedingswaardetabel</h2>
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
          <p className="text-xs text-darkBrown/50 mb-3">Per persoon</p>
          <ul className="text-sm divide-y divide-darkBrown/10">
            {rows.map((row) => (
              <li
                key={row.label}
                className={cn('flex justify-between py-1.5 gap-4', row.indented && 'pl-4')}
              >
                <span className={cn('text-darkBrown/70', row.indented && 'italic')}>
                  {row.label}
                </span>
                <span className="font-medium text-darkBrown tabular-nums">{row.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
