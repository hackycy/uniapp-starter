import type { InjectionKey, ShallowReactive } from 'vue'
import type { Route, RouteLocationRaw, Router } from './types'
import { isPromise } from 'radashi'
import { parseURL, stringifyURL } from '@/utils/uri'

/**
 * useRouter
 */
export const routerKey = Symbol('__ROUTER__') as InjectionKey<Router>

/**
 * useRoute
 */
export const routeKey = Symbol('__ROUTE__') as InjectionKey<ShallowReactive<Route>>

export const START_LOCATION_NORMALIZED: Route = {
  fullPath: '/',
  path: '',
  name: undefined,
  query: {},
  meta: {},
}

/**
 * 获取当前页面
 */
export function getCurrentPage() {
  const pages = getCurrentPages()
  return pages.length > 0 ? pages[pages.length - 1] : undefined
}

/**
 * 根据路径获取路由
 */
export function getRouteByPath(path: string, router: Router): Route | null {
  const route = router.routes.find((route: Route) => {
    return route.path === path
  })

  // 深拷贝
  return route ? JSON.parse(JSON.stringify(route)) : null
}

/**
 * 获取当前页面路由信息
 */
export function getCurrentPageRoute(router: Router): Route {
  const page: Recordable | undefined = getCurrentPage()
  if (!page || !page.route || !router.routes) {
    return {}
  }

  const currRoute = getRouteByPath(page.route, router)!

  if (page.$page) {
    currRoute.fullPath = page.$page.fullPath
    const { query } = parseURL(page.$page.fullPath)
    currRoute.query = query || undefined
  }

  return currRoute
}

/**
 * @see https://github.com/dcloudio/uni-app/blob/next/packages/uni-api/src/helpers/interceptor.ts
 */
export async function invokeGuards(args: any, router: Router) {
  const hooks = router.guards.map(guard => guard.interceptor.invoke)
  // queue invoke guard
  let result = args
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i] as (...args: any[]) => any
    if (!hook) {
      continue
    }

    const res = hook(result)
    if (isPromise(res)) {
      result = await res
    }
    else {
      result = res || result
    }

    if (res === false) {
      return
    }
  }
}

export function resolveRouteUrl(to: RouteLocationRaw, router: Router): string {
  let url = ''
  let query: Record<string, any> | undefined
  if (typeof to === 'string') {
    url = to
  }
  else {
    // 判断to是否为对象且是否存在name属性
    if (typeof to === 'object' && to !== null && 'name' in to) {
      const route = router.routes.find((r: Recordable) => r.name === to.name)
      if (route && route.path) {
        url = `/${route.path}`
        query = to.query
      }
      else {
        throw new Error(`路由: ${to.name}未定义`)
      }
    }
    else if (typeof to === 'object' && to !== null && 'path' in to) {
      const parsed = parseURL(`${to.path}`)
      url = parsed.path
      query = { ...to.query, ...parsed.query }
    }

    if (query) {
      url = stringifyURL({
        path: url,
        query,
      })
    }
  }
  return url
}

export function navigateTo(
  to: RouteLocationRaw,
  router: Router,
  type: 'push' | 'replace' | 'switchTab' | 'reLaunch',
): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = resolveRouteUrl(to, router)
    switch (type) {
      case 'push':
        uni.navigateTo({
          url,
          success: () => resolve(),
          fail: () => reject(new Error('Navigation failed')),
        })
        break
      case 'replace':
        uni.redirectTo({
          url,
          success: () => resolve(),
          fail: () => reject(new Error('Navigation failed')),
        })
        break
      case 'switchTab':
        uni.switchTab({
          url,
          success: () => resolve(),
          fail: () => reject(new Error('Navigation failed')),
        })
        break
      case 'reLaunch':
        uni.reLaunch({
          url,
          success: () => resolve(),
          fail: () => reject(new Error('Navigation failed')),
        })
        break
      default:
        reject(new Error(`无效的路由类型: ${type}`))
    }
  })
}
