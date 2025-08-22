import type { InjectionKey, ShallowReactive } from 'vue'
import type { Route, RouteLocationRaw, Router } from './types'
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
  path: '/',
  fullPath: '/',
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
export function getRouteByPath(path: string, router: Router): Route {
  const route: Route = router.routes.find((route: Route) => {
    return route.path === path
  })!

  // 深拷贝
  return JSON.parse(JSON.stringify(route))
}

/**
 * 获取当前页面路由信息
 */
export function getCurrentPageRoute(router: Router): Route {
  const page: Recordable | undefined = getCurrentPage()
  if (!page || !page.route || !router.routes) {
    return {}
  }

  const currRoute: Route = getRouteByPath(page.route, router)

  if (page.$page) {
    currRoute.fullPath = page.$page.fullPath
    const { query } = parseURL(page.$page.fullPath)
    currRoute.query = query || undefined
  }

  return currRoute
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
        query = route.query
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
): void {
  const url = resolveRouteUrl(to, router)
  switch (type) {
    case 'push':
      uni.navigateTo({
        url,
      })
      break
    case 'replace':
      uni.redirectTo({
        url,
      })
      break
    case 'switchTab':
      uni.switchTab({
        url,
      })
      break
    case 'reLaunch':
      uni.reLaunch({
        url,
      })
      break
    default:
      throw new Error(`无效的路由类型: ${type}`)
  }
}
