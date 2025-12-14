import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  revalidatePath('/')

  return doc
}
