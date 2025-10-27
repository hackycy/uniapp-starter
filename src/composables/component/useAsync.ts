import { debounce as _debounce, isEmpty as _isEmpty } from 'radashi'
import { ref } from 'vue'

export type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty'

export interface UseAsyncOptions<T> {
  /* 数据是否为空的判断函数 */
  isEmpty?: (data: unknown) => boolean
  /* 默认数据 */
  defaultValue?: T
  /* 初始状态 */
  initialState?: LoadingState
  /* 是否立即执行 */
  immediate?: boolean
  /* 错误重试次数 */
  maxRetries?: number
  /* 重试延迟时间(毫秒) */
  retryDelay?: number
  /* 防抖开启时间(毫秒) */
  debounce?: number

  /* Event */
  onComplete?: () => void
  onSuccess?: () => void
  onError?: () => void
}

export function useAsync<T = any>(factoryFn: () => Promise<T>, options: UseAsyncOptions<T> = {}) {
  const {
    isEmpty = (data: unknown) => {
      return _isEmpty(data)
    },
    defaultValue = null as T,
    initialState = 'idle',
    immediate = true,
    maxRetries = 3,
    retryDelay = 1000,
    debounce,
    onComplete,
    onError,
    onSuccess,
  } = options

  const dataRef = ref<T>(defaultValue)
  const stateRef = ref<LoadingState>(initialState)
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

      onSuccess?.()
    }
    catch (error: unknown) {
      if (retryCountRef.value < maxRetries) {
        retryCountRef.value += 1

        setTimeout(() => {
          execute()
        }, retryDelay * retryCountRef.value) // 指数退避
      }
      else {
        stateRef.value = 'error'
        errorRef.value = error

        onError?.()
      }
    }
    finally {
      onComplete?.()
    }
  }

  // 立即执行
  if (immediate) {
    execute()
  }

  function run() {
    // reset retry count
    retryCountRef.value = 0
    execute()
  }

  return {
    stateRef,
    errorRef,
    dataRef,
    run: typeof debounce === 'number' ? _debounce({ delay: debounce }, run) : run,
    isIdle: () => stateRef.value === 'idle',
    isLoading: () => stateRef.value === 'loading',
    isError: () => stateRef.value === 'error',
    isEmpty: () => stateRef.value === 'empty',
    isSuccess: () => stateRef.value === 'success',
  }
}
