import { isEmpty as _isEmpty } from 'radashi'
import { ref } from 'vue'

export type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty'

export interface UseAsyncDataOptions<T> {
  /** 数据是否为空的判断函数 */
  isEmpty?: (data: unknown) => boolean
  /** 默认数据 */
  defaultValue?: T
  /** 是否立即执行 */
  immediate?: boolean
  /** 错误重试次数 */
  maxRetries?: number
  /** 重试延迟时间(毫秒) */
  retryDelay?: number
}

export function useAsyncData<T = any>(factoryFn: () => Promise<T>, options: UseAsyncDataOptions<T> = {}) {
  const {
    isEmpty = (data: unknown) => {
      return _isEmpty(data)
    },
    defaultValue = null as T,
    immediate = true,
    maxRetries = 3,
    retryDelay = 1000,
  } = options

  const dataRef = ref<T>(defaultValue)
  const stateRef = ref<LoadingState>('idle')
  const errorRef = ref<unknown | null>(null)
  const retryCountRef = ref(0)

  async function execute() {
    stateRef.value = 'loading'
    errorRef.value = null

    try {
      const result: T = await factoryFn()
      dataRef.value = result

      if (isEmpty(result)) {
        stateRef.value = 'empty'
      }
      else {
        stateRef.value = 'success'
      }

      // 重置重试计数
      retryCountRef.value = 0
    }
    catch (error: unknown) {
      stateRef.value = 'error'
      errorRef.value = error

      if (retryCountRef.value < maxRetries) {
        retryCountRef.value += 1

        setTimeout(() => {
          execute()
        }, retryDelay)
      }
    }
  }

  // 立即执行
  if (immediate) {
    execute()
  }

  return {
    stateRef,
    errorRef,
    dataRef,
    isIdle: () => stateRef.value === 'idle',
    isLoading: () => stateRef.value === 'loading',
    isError: () => stateRef.value === 'error',
    isEmpty: () => stateRef.value === 'empty',
    isSuccess: () => stateRef.value === 'success',
  }
}
