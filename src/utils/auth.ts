import { TOKEN_KEY } from '@/enums/cacheEnum'
import { storage } from './cache'

export function getToken(): string | null {
  return storage.get(TOKEN_KEY)
}

export function setToken(token: string) {
  storage.set(TOKEN_KEY, token)
}

export function removeToken() {
  storage.remove(TOKEN_KEY)
}

export function getAuthCache<T = any>(key: string): T | null {
  return storage.get<T>(key)
}

export function setAuthCache(key: string, value: unknown) {
  storage.set(key, value)
}

export function removeAuthCache(key: string) {
  storage.remove(key)
}
