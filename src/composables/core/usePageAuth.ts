import { onShow } from '@dcloudio/uni-app'
import { getCurrentInstance } from 'vue'
import { useUserStore } from '@/store/modules/user'

export function usePageAuth() {
  const userStore = useUserStore()

  const instance = getCurrentInstance()
  if (instance) {
    onShow(() => {
      // TODO
    })
  }

  console.log('usePageAuth', userStore)
}
