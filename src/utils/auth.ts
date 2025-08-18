import { TOKEN_KEY } from '@/enums/cacheEnum'
import { storage } from './cache'

export function getToken() {
  return storage.get(TOKEN_KEY)
}

export function setToken(token: string) {
  storage.set(TOKEN_KEY, token)
}

export function removeToken() {
  storage.remove(TOKEN_KEY)
}

export function getAuthCache(key: string) {
  return storage.get(key)
}

export function setAuthCache(key: string, value: unknown) {
  storage.set(key, value)
}

export function removeAuthCache(key: string) {
  storage.remove(key)
}
