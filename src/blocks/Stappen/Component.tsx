import type { StappenBlock as StappenBlockProps } from 'src/payload-types'

import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & StappenBlockProps

export const StappenBlock: React.FC<Props> = ({ className, steps }) => {
  return (
    <div className={className}>
      <ol className="list-decimal list-inside space-y-6">
        {steps?.map((step) => (
          <li key={step.id} className="space-y-1">
            {step.title && <h3 className="font-anton text-lg uppercase">{step.title}</h3>}
            {step.text && <RichText data={step.text} enableGutter={false} enableProse={false} />}
          </li>
        ))}
      </ol>
    </div>
  )
}
