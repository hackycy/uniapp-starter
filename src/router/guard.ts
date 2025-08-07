import type { Router } from './types'
import { useUserStoreWithOut } from '@/store/modules/user'

function createAuthGuard(_router: Router): UniApp.InterceptorOptions {
  useUserStoreWithOut()

  return {
    invoke(args: UniApp.NavigateToOptions) {
      console.log('Auth Guard invoked', args)
    },
  }
}

export function setupRouterGuard(router: Router) {
  const authGuard = createAuthGuard(router)

  uni.addInterceptor('navigateTo', authGuard)
  uni.addInterceptor('redirectTo', authGuard)
}
