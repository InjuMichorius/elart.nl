import type { Metadata } from 'next/types'

import FavorietenClient from './page.client'

export const metadata: Metadata = {
  title: 'Mijn favorieten – Elart',
  description: 'Jouw opgeslagen recepten.',
}

export default function FavorietenPage() {
  return <FavorietenClient />
}
