import type { StappenBlock as StappenBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'

type StepGroup = {
  title?: string | null
  steps?: { text: string; id?: string | null }[] | null
  id?: string | null
}

type Props = {
  className?: string
  groups?: StepGroup[] | null
}

export function StepGroupList({ groups, className }: Props) {
  if (!groups || groups.length === 0) return null

  return (
    <div className={cn('flex flex-col gap-10', className)}>
      {groups.map((group, gi) => {
        const steps = group.steps
        if (!steps || steps.length === 0) return null

        return (
          <div className="mt-6" key={group.id ?? gi}>
            {group.title && <h3 className="text-xl font-anton uppercase mb-4">{group.title}</h3>}
            <ol className="flex flex-col gap-4">
              {steps.map((step, index) => (
                <li
                  key={step.id ?? index}
                  className="flex gap-6 items-center bg-beigeDark rounded-xl p-4"
                >
                  <span className="font-anton text-xl leading-none text-darkBrown shrink-0 w-10 flex items-center">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-darkBrown leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        )
      })}
    </div>
  )
}

type BlockProps = {
  className?: string
} & StappenBlockProps

export const StappenBlock: React.FC<BlockProps> = ({ groups, className }) => {
  return (
    <div className={cn('py-12 lg:py-24', className)}>
      <div className="container">
        <StepGroupList groups={groups} />
      </div>
    </div>
  )
}
