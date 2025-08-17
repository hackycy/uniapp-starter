import { createStorage } from './storage'

export * from './types'

export const storage = createStorage({
  prefixKey: import.meta.env.VITE_APP_SHORT_NAME || '',
})
