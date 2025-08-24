import type { NavigationGuard, Router } from './types'
import { isNullish } from 'radashi'
import { useUserStoreWithOut } from '@/store/modules/user'
import { parseURL, stringifyURL } from '@/utils/uri'
import { getRouteByPath } from './helper'

function createAuthGuard(router: Router): NavigationGuard {
  const userStore = useUserStoreWithOut()

  return {
    name: 'Auth',
    interceptor: {
      /**
       * 这里的url是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
       */
      invoke({ url, query }: { url: string, query?: Recordable }) {
        if (isNullish(url)) {
          return
        }

        const { path, query: _query } = parseURL(url, url.startsWith('/') ? undefined : '/')
        const mergeQuery = { ..._query, ...query }

        // 查找页面信息
        const page = getRouteByPath(path.slice(1), router)
        if (!page) {
          return
        }

        console.log('[Auth Guard] Redirect URL:', mergeQuery, router.route.value)

        if (page.meta?.auth && !userStore.isLoggedIn) {
          const redirectUrl = stringifyURL({
            path: '/pages/index/login',
            query: {
              redirect: url,
            },
          })

          uni.redirectTo({
            url: redirectUrl,
          })

          return false
        }
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
