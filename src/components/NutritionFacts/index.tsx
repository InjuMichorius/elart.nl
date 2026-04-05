import type { Recipe } from '@/payload-types'
import { cn } from '@/utilities/ui'

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
      <h2 className="text-xl font-anton uppercase mb-4">Voedingswaardetabel</h2>
      <p className="text-xs text-darkBrown/50 mb-3">Per persoon</p>
      <ul className="text-sm divide-y divide-darkBrown/10">
        {rows.map((row) => (
          <li
            key={row.label}
            className={cn('flex justify-between py-1.5 gap-4', row.indented && 'pl-4')}
          >
            <span className={cn('text-darkBrown/70', row.indented && 'italic')}>{row.label}</span>
            <span className="font-medium text-darkBrown tabular-nums">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
