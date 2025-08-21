import { tryOnUnmounted } from '@vueuse/core'
import { ref } from 'vue'

type Fn = () => any

export function usePolling(pollingFunction: Fn, interval: number = 2000) {
  const isPollingRef = ref(false)
  let timerId: number | null = null

  // 内部递归函数，执行轮询
  const executePoll = async () => {
    try {
      await pollingFunction()
    }
    catch (error) {
      console.error('Polling error:', error)
    }
    finally {
      if (isPollingRef.value) {
        timerId = setTimeout(executePoll, interval) as unknown as number
      }
    }
  }

  async function startPolling() {
    if (isPollingRef.value) {
      return
    }

    isPollingRef.value = true
    executePoll()
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
