'use client'
import { useState } from 'react'
import { cn } from '@/utilities/ui'

interface NutritionalValues {
  energyKj?: number | null
  energyKcal?: number | null
  fats?: number | null
  saturatedFats?: number | null
  carbohydrates?: number | null
  sugars?: number | null
  proteins?: number | null
  salt?: number | null
}

interface IngredientItem {
  ingredient: { title: string } | null
  amount: number
  unit?: string
}

interface RecipeType {
  servings: number
  ingredientsList: IngredientItem[]
  nutritionalValues?: NutritionalValues | null
}

type TabType = 'ingredients' | 'nutrition'

export default function Recipe({ recipe }: { recipe: RecipeType }) {
  const [servings, setServings] = useState<number>(recipe.servings || 1)
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [activeTab, setActiveTab] = useState<TabType>('ingredients')

  const handleIncrease = () => setServings((prev: number) => prev + 1)
  const handleDecrease = () => setServings((prev: number) => Math.max(1, prev - 1))

  const toggleChecked = (index: number) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const nv = recipe.nutritionalValues
  const hasNutritionalData =
    nv && (nv.energyKj || nv.energyKcal || nv.fats || nv.carbohydrates || nv.proteins)

  const TabButton = ({ tab, label }: { tab: TabType; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={cn(
        'px-4 py-2 text-sm font-medium border-b-2 transition-colors md:hidden',
        activeTab === tab
          ? 'border-darkBrown text-darkBrown'
          : 'border-transparent text-gray-500 hover:text-gray-700',
      )}
    >
      {label}
    </button>
  )

  return (
    <div className="min-w-[300px] flex flex-col gap-4">
      <div
        className={cn(
          activeTab === 'ingredients' || !hasNutritionalData
            ? 'block bg-beigeDark p-6 rounded-3xl'
            : 'hidden md:block',
        )}
      >
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-xl font-anton uppercase text-darkBrown">Ingrediënten</h2>
          {hasNutritionalData && (
            <div className="flex border-b border-gray-200 -mb-px md:hidden">
              <TabButton tab="ingredients" label="Ingrediënten" />
              <TabButton tab="nutrition" label="Voedingswaarden" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 mb-4">
          <button onClick={handleDecrease} className="px-3 py-1 bg-green text-white rounded">
            -
          </button>
          <span>
            {servings} {servings === 1 ? 'persoon' : 'personen'}
          </span>
          <button onClick={handleIncrease} className="px-3 py-1 bg-green text-white rounded">
            +
          </button>
        </div>
        <ul className="space-y-1">
          {recipe.ingredientsList.map((item, index) => {
            const ingredient = item.ingredient?.title ?? 'Onbekend ingrediënt'
            const adjustedAmount =
              Math.round((((item.amount || 0) * servings) / (recipe.servings || 1)) * 100) / 100
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

      {hasNutritionalData && (
        <div
          className={cn(
            activeTab === 'nutrition'
              ? 'block md:hidden bg-beigeDark p-6 rounded-3xl'
              : 'hidden md:block bg-beigeDark p-6 rounded-3xl ',
          )}
        >
          <h2 className="text-xl font-anton uppercase text-darkBrown mb-4">Voedingswaarden</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="py-2">Energie</td>
                <td className="py-2 text-right">
                  {nv?.energyKj?.toFixed(0)} kJ / {nv?.energyKcal?.toFixed(0)} kcal
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Vetten</td>
                <td className="py-2 text-right">{nv?.fats?.toFixed(1)} g</td>
              </tr>
              <tr className="border-b pl-4">
                <td className="py-2 pl-4">waarvan verzadigd</td>
                <td className="py-2 text-right">{nv?.saturatedFats?.toFixed(1)} g</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Koolhydraten</td>
                <td className="py-2 text-right">{nv?.carbohydrates?.toFixed(1)} g</td>
              </tr>
              <tr className="border-b pl-4">
                <td className="py-2 pl-4">waarvan suikers</td>
                <td className="py-2 text-right">{nv?.sugars?.toFixed(1)} g</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Eiwitten</td>
                <td className="py-2 text-right">{nv?.proteins?.toFixed(1)} g</td>
              </tr>
              <tr>
                <td className="py-2">Zout</td>
                <td className="py-2 text-right">{nv?.salt?.toFixed(1)} g</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
