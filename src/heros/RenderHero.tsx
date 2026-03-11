import React from 'react'

import type { Page } from '@/payload-types'

import { MediaAndTextHero } from '@/heros/MediaAndText'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'

const heroes = {
  mediaAndText: MediaAndTextHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  // Type assertion needed due to complex union types between Page hero and hero component props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <HeroToRender {...(props as any)} />
}
