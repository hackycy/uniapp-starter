import type { PropType as VuePropType } from 'vue'

declare global {
  declare type PropType<T> = VuePropType<T>
  declare type Nullable<T> = T | null | undefined
  declare type NonNullable<T> = T extends null | undefined ? never : T
  declare type Recordable<T = any> = Record<string, T>
  declare type Arrayable<T> = T | T[]

  /**
   * Void function
   */
  export type Fn = () => void

  /**
   * Any function
   */
  export type AnyFn = (...args: any[]) => any

  declare const __APP_INFO__: {
    platform: string
    lastBuildTime: string
    version: string
  }
}

export { }
