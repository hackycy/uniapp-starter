import type { NavigationGuard, Router } from './types'
import { isNullish } from 'radashi'
import { useUserStoreWithOut } from '@/store/modules/user'
import { parseURL } from '@/utils/uri'

function createAuthGuard(_router: Router): NavigationGuard {
  useUserStoreWithOut()

  return {
    name: 'Auth',
    interceptor: {
      /**
       * 这里的url是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
       */
      invoke({ url }: { url: string }) {
        if (isNullish(url)) {
          return
        }

        const { path, query } = parseURL(url, url.startsWith('/') ? undefined : '/')
        console.log('[Auth Guard] Parsed URL:', { path, query })
      },
    },
  }
}

export function setupRouterGuard(router: Router) {
  const authGuard = createAuthGuard(router)

  // register navigation guards
  router.guards.push(authGuard)

  // register uni-app router interceptors
  router.guards.forEach((guard) => {
    uni.addInterceptor('navigateTo', guard.interceptor)
    uni.addInterceptor('redirectTo', guard.interceptor)
    uni.addInterceptor('switchTab', guard.interceptor)
    uni.addInterceptor('reLaunch', guard.interceptor)
  })
}
