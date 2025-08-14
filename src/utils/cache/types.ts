export interface CachePayload<T = any> {
  value: T
  time: number
  expire: number | null
}

export interface StorageInfo {
  keys?: string[]
  currentSize?: number
  limitSize?: number
}

export interface IStorage extends Pick<Storage, 'getItem' | 'setItem' | 'removeItem' | 'clear'> {
  getItemAsync: (key: string) => Promise<string | null>
  setItemAsync: (key: string, value: string) => Promise<void>
  removeItemAsync: (key: string) => Promise<void>
  clearAsync: () => Promise<void>

  getStorageInfo: () => StorageInfo
  getStorageInfoAsync: () => Promise<StorageInfo>
}
