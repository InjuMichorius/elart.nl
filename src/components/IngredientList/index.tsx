'use client'
import { useState } from 'react'
import { cn } from '@/utilities/ui'

interface IngredientItem {
  ingredient: { title: string } | null
  amount: number
  unit?: string
}

interface RecipeType {
  servings: number
  ingredientsList: IngredientItem[]
}

export default function Recipe({ recipe }: { recipe: RecipeType }) {
  const [servings, setServings] = useState<number>(recipe.servings || 1)
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  const handleIncrease = () => setServings((prev: number) => prev + 1)
  const handleDecrease = () => setServings((prev: number) => Math.max(1, prev - 1)) // min 1 persoon

  const toggleChecked = (index: number) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="min-w-[300px]">
      <h2 className="text-xl font-bold mb-4">Ingrediënten</h2>
      <div className="flex items-center gap-4 mb-4">
        <button onClick={handleDecrease} className="px-3 py-1 bg-gray-200 rounded">
          -
        </button>
        <span>
          {servings} {servings === 1 ? 'persoon' : 'personen'}
        </span>
        <button onClick={handleIncrease} className="px-3 py-1 bg-gray-200 rounded">
          +
        </button>
      </div>

      <ul className="space-y-1">
        {recipe.ingredientsList.map((item, index) => {
          const ingredient = item.ingredient?.title ?? 'Onbekend ingrediënt'
          const adjustedAmount = ((item.amount || 0) * servings) / (recipe.servings || 1)
          const isChecked = !!checked[index]

          return (
            <li key={index}>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleChecked(index)}
                  className="size-4 accent-darkBrown shrink-0"
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
