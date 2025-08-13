import type { IStorage } from './types'
import { isNullish } from 'radashi'

export interface CreateStorageParams {
  storage: IStorage
  prefixKey: string
}

export function createStorage(params: CreateStorageParams) {
  const WebStorage = class WebStorage {
    private prefixKey: string
    private storage: IStorage

    constructor() {
      this.prefixKey = params.prefixKey
      this.storage = params.storage
    }

    public set(key: string, value: any, expire: number | null) {
      const data = this.processValue(value, expire)
      this.storage.setItem(this.getKey(key), data)
    }

    public get<T = any>(key: string, defaultValue: any = null): T | null {
      const val = this.storage.getItem(this.getKey(key))
      if (!val) {
        return defaultValue
      }

      try {
        const data = JSON.parse(val)

        const { value, expire } = data

        if (!isNullish(expire) && expire <= new Date().getTime()) {
          return null
        }

        return value as T
      }
      catch {
        return defaultValue
      }
    }

    public remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    public clear() {
      this.storage.clear()
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    private processValue(value: any, expire: number | null) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: isNullish(expire) ? null : new Date().getTime() + expire * 1000,
      })

      return stringData
    }
  }

  return new WebStorage()
}
