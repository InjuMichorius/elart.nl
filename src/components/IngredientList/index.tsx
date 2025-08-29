'use client'
import { useState } from 'react'

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

  const handleIncrease = () => setServings((prev: number) => prev + 1)
  const handleDecrease = () => setServings((prev: number) => Math.max(1, prev - 1)) // min 1 persoon

  return (
    <div>
      <div className="mt-8">
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

        <ul className="list-disc pl-5 space-y-1">
          {recipe.ingredientsList.map((item, index) => {
            const ingredient = item.ingredient?.title ?? 'Onbekend ingrediënt'
            const adjustedAmount = ((item.amount || 0) * servings) / (recipe.servings || 1)

            return (
              <li key={index}>
                {adjustedAmount} {item.unit} {ingredient}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
