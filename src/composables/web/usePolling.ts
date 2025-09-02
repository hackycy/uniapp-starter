import { tryOnUnmounted } from '@vueuse/core'
import { isNullish } from 'radashi'
import { ref } from 'vue'

export interface PollingOptions {
  immediate?: boolean
  maxAttempts?: number
  interval?: number
}

type Fn = () => any

export function usePolling(pollingFunction: Fn, options: PollingOptions = {}) {
  const { immediate = false, maxAttempts, interval = 2000 } = options

  const isPollingRef = ref(false)
  const attemptsRef = ref(0)
  let timerId: number | null = null

  // 内部递归函数，执行轮询
  const executePoll = async () => {
    attemptsRef.value++

    try {
      await pollingFunction()
    }
    catch (error) {
      console.error('Polling error:', error)
    }
    finally {
      if (isPollingRef.value && (isNullish(maxAttempts) || attemptsRef.value < maxAttempts)) {
        timerId = setTimeout(executePoll, interval) as unknown as number
      }
    }
  }

  async function startPolling() {
    if (isPollingRef.value) {
      return
    }

    attemptsRef.value = 0
    isPollingRef.value = true
    if (immediate) {
      executePoll()
    }
    else {
      timerId = setTimeout(executePoll, interval) as unknown as number
    }
  }

  function stopPolling() {
    isPollingRef.value = false

    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
  }

  tryOnUnmounted(() => {
    stopPolling()
  })

  return {
    startPolling,
    stopPolling,
  }
}
