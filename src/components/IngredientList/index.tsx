'use client'
import { cn } from '@/utilities/ui'
import { useState } from 'react'

interface IngredientItem {
  ingredient: { title: string } | null
  amount: number
  unit?: string
}

interface Props {
  ingredientsList: IngredientItem[]
  servings: number
  defaultServings: number
  onIncrease: () => void
  onDecrease: () => void
}

export default function IngredientList({
  ingredientsList,
  servings,
  defaultServings,
  onIncrease,
  onDecrease,
}: Props) {
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  const toggleChecked = (index: number) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="h-[fit-content] bg-beigeDark p-6 rounded-xl">
      <h2 className="text-xl font-anton uppercase mb-4">Ingrediënten</h2>
      <div className="flex items-center gap-4 mb-4 font-bold">
        <button onClick={onDecrease} className="px-3 py-1 bg-green text-white rounded">
          -
        </button>
        <span>
          {servings} {servings === 1 ? 'persoon' : 'personen'}
        </span>
        <button onClick={onIncrease} className="px-3 py-1 bg-green text-white rounded">
          +
        </button>
      </div>

      <ul className="space-y-1">
        {ingredientsList.map((item, index) => {
          const ingredient = item.ingredient?.title ?? 'Onbekend ingrediënt'
          const adjustedAmount = ((item.amount || 0) * servings) / (defaultServings || 1)
          const isChecked = !!checked[index]

          return (
            <li key={index}>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleChecked(index)}
                  className="size-4 accent-green shrink-0"
                />
                <span className={cn(isChecked && 'line-through opacity-50')}>
                  {adjustedAmount} {item.unit} {ingredient}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
