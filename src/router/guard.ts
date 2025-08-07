import type { Router } from './types'
import { useUserStoreWithOut } from '@/store/modules/user'

function createAuthGuard(_router: Router): UniApp.InterceptorOptions {
  useUserStoreWithOut()

  return {
    invoke() {
      // TODO
    },
  }
}

export function setupRouterGuard(router: Router) {
  const authGuard = createAuthGuard(router)

  uni.addInterceptor('navigateTo', authGuard)
}
