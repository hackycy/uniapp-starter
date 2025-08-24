import { computed, onMounted, onUnmounted, ref } from 'vue'

export interface ProgressOptions {
  /**
   * 初始进度值 (默认0.08)
   * @default 0.08
   */
  initialProgress?: number
  /**
   * 完成动画速度ms (默认200)
   * @default 200
   */
  completionSpeed?: number
  /**
   * 自动增量比率 (默认0.02)
   * @default 0.02
   */
  autoIncrementRate?: number
  /**
   * 自动增量间隔ms (默认300)
   * @default 300
   */
  autoIncrementDelay?: number
  /**
   * 是否立即完成进度 (默认true)
   * @default true
   */
  immediate?: boolean
}

/**
 * 非线性的增量算法模拟加载，视觉欺骗进度
 */
export function useProgressSimulator(options?: ProgressOptions) {
  const cfg: Required<ProgressOptions> = Object.assign(
    {
      initialProgress: 0.08,
      completionSpeed: 200,
      autoIncrementRate: 0.02,
      autoIncrementDelay: 300,
      immediate: true,
    },
    options || {},
  )

  const progressRef = ref(0)
  const getProgress = computed(() => progressRef.value * 100)

  let autoIncrementTimer: number | null = null
  let completionTimer: number | null = null

  const smartIncrement = () => {
    const remaining = 1 - progressRef.value
    const incrementAmount = remaining * cfg.autoIncrementRate
    progressRef.value = Math.min(0.994, progressRef.value + incrementAmount)
  }

  const startAutoProgress = () => {
    if (autoIncrementTimer) {
      return
    }
    autoIncrementTimer = setInterval(
      smartIncrement,
      cfg.autoIncrementDelay,
    ) as unknown as number
  }

  const stopAutoProgress = () => {
    if (autoIncrementTimer) {
      clearInterval(autoIncrementTimer)
      autoIncrementTimer = null
    }
  }

  const beginLoading = () => {
    if (progressRef.value > 0) {
      return
    }
    progressRef.value = cfg.initialProgress
    startAutoProgress()
  }

  const completeLoading = (immediate = false) => {
    stopAutoProgress()

    if (immediate) {
      progressRef.value = 1
    }
    else {
      // 模拟自然完成的冲刺效果
      progressRef.value += (1 - progressRef.value) * 0.3
    }

    // 延迟重置进度条
    completionTimer = setTimeout(() => {
      progressRef.value = 0
    }, cfg.completionSpeed) as unknown as number
  }

  const updateProgress = (value: number) => {
    progressRef.value = Math.min(1, Math.max(cfg.initialProgress, value))
    if (progressRef.value === 1) {
      completeLoading()
    }
  }

  if (cfg.immediate) {
    onMounted(() => {
      beginLoading()
    })
  }

  onUnmounted(() => {
    stopAutoProgress()
    if (completionTimer) {
      clearTimeout(completionTimer)
    }
  })

  return {
    getProgress,
    beginLoading,
    completeLoading,
    updateProgress,
  }
}
