import type { CachePayload, IStorage, StorageInfo } from './types'
import { isNullish } from 'radashi'

export interface CreateStorageParams {
  storage: IStorage
  prefixKey: string
  hasEncrypt?: boolean
}

const uniStorage: IStorage = {
  setItem: (key: string, value: string) => {
    uni.setStorageSync(key, value)
  },
  getItem: (key: string) => {
    return uni.getStorageSync(key)
  },
  removeItem: (key: string) => {
    uni.removeStorageSync(key)
  },
  clear: () => {
    uni.clearStorageSync()
  },
  setItemAsync: (key: string, value: string) => {
    return new Promise((resolve, reject) => {
      uni.setStorage({
        key,
        data: value,
        success: () => {
          resolve()
        },
        fail: (e) => {
          reject(e)
        },
      })
    })
  },
  getItemAsync: (key: string) => {
    return new Promise((resolve, reject) => {
      uni.getStorage({
        key,
        success: (res) => {
          resolve(res.data)
        },
        fail: (e) => {
          reject(e)
        },
      })
    })
  },
  removeItemAsync: (key: string) => {
    return new Promise((resolve, reject) => {
      uni.removeStorage({
        key,
        success: () => {
          resolve()
        },
        fail: (e) => {
          reject(e)
        },
      })
    })
  },
  clearAsync: () => {
    return new Promise((resolve) => {
      uni.clearStorage()
      resolve()
    })
  },
  getStorageInfo: () => {
    return uni.getStorageInfoSync()
  },
  getStorageInfoAsync: () => {
    return new Promise((resolve, reject) => {
      uni.getStorageInfo({
        success: (res) => {
          resolve(res)
        },
        fail: (e) => {
          reject(e)
        },
      })
    })
  },
}

export function createStorage({
  storage = uniStorage,
  prefixKey = '',
  hasEncrypt = false,
}: Partial<CreateStorageParams> = {}) {
  const WebStorage = class WebStorage {
    private prefixKey: string
    private storage: IStorage
    private hasEncrypt: boolean

    constructor() {
      this.prefixKey = prefixKey
      this.storage = storage
      this.hasEncrypt = hasEncrypt
    }

    public set(key: string, value: any, expire: number | null) {
      const data = this.processValue('before', value, expire)
      this.storage.setItem(this.getKey(key), data as string)
    }

    public get<T = any>(key: string, defaultValue: any = null): T | null {
      const val = this.storage.getItem(this.getKey(key))
      return (this.processValue('after', val, null) || defaultValue) as T | null
    }

    public remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    public clear() {
      this.storage.clear()
    }

    public async setAsync(key: string, value: any, expire: number | null) {
      const data = this.processValue('before', value, expire)
      await this.storage.setItemAsync(this.getKey(key), data as string)
    }

    public async getAsync<T = any>(key: string, defaultValue: any = null): Promise<T | null> {
      const val = await this.storage.getItemAsync(this.getKey(key))
      return (this.processValue('after', val, null) || defaultValue) as T | null
    }

    public async removeAsync(key: string) {
      await this.storage.removeItemAsync(this.getKey(key))
    }

    public async clearAsync() {
      await this.storage.clearAsync()
    }

    public getStorageInfo(): StorageInfo {
      return this.storage.getStorageInfo()
    }

    public async getStorageInfoAsync(): Promise<StorageInfo> {
      return this.storage.getStorageInfoAsync()
    }

    private isExpired(expire: number | null): boolean {
      return !isNullish(expire) && expire < new Date().getTime()
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    private serialize<T>(payload: CachePayload<T>): string {
      return this.encrypt(JSON.stringify(payload))
    }

    private deserialize<T>(str: string | null): CachePayload<T> | null {
      if (str == null) {
        return null
      }
      try {
        const decoded = this.decrypt(str)
        return JSON.parse(decoded) as CachePayload<T>
      }
      catch {
        return null
      }
    }

    private processValue(point: 'before' | 'after', value: any, expire: number | null): unknown {
      if (point === 'before') {
        const stringData = this.serialize({
          value,
          time: Date.now(),
          expire: isNullish(expire) ? null : new Date().getTime() + expire * 1000,
        })

        return stringData
      }
      else {
        if (isNullish(value)) {
          return null
        }

        try {
          const { value: val, expire } = this.deserialize(value)!

          if (this.isExpired(expire)) {
            return null
          }

          return val
        }
        catch {
          return null
        }
      }
    }

    private encrypt(raw: string): string {
      if (!this.hasEncrypt) {
        return raw
      }

      try {
        // 有需要自行实现加密
        return typeof btoa === 'function' ? btoa(raw) : raw
      }
      catch {
        return raw
      }
    }

    private decrypt(raw: string): string {
      if (!this.hasEncrypt) {
        return raw
      }

      try {
        // 有需要自行实现解密
        return typeof atob === 'function' ? atob(raw) : raw
      }
      catch {
        return raw
      }
    }
  }

  return new WebStorage()
}
