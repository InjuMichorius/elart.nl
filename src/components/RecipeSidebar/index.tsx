'use client'

import { useState } from 'react'
import IngredientList from '@/components/IngredientList'
import NutritionFacts from '@/components/NutritionFacts'
import type { Recipe } from '@/payload-types'

interface IngredientItem {
  ingredient: { title: string } | null
  amount: number
  unit?: string
}

type NutritionData = NonNullable<Recipe['nutrition']>

type Props = {
  defaultServings: number
  ingredientsList: IngredientItem[]
  nutrition?: NutritionData | null
}

export default function RecipeSidebar({ defaultServings, ingredientsList, nutrition }: Props) {
  const [servings, setServings] = useState<number>(defaultServings || 1)

  const handleIncrease = () => setServings((prev) => prev + 1)
  const handleDecrease = () => setServings((prev) => Math.max(1, prev - 1))

  const hasAllNutrition =
    nutrition != null &&
    nutrition.energyKcal != null &&
    nutrition.fat != null &&
    nutrition.saturatedFat != null &&
    nutrition.carbohydrates != null &&
    nutrition.sugars != null &&
    nutrition.protein != null &&
    nutrition.salt != null

  return (
    <div className="min-w-[300px] flex flex-col gap-4">
      <IngredientList
        ingredientsList={ingredientsList}
        servings={servings}
        defaultServings={defaultServings}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
      {hasAllNutrition && <NutritionFacts nutrition={nutrition} />}
    </div>
  )
}
