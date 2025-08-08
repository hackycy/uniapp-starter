import type { InjectionKey, ShallowReactive } from 'vue'
import type { Route, Router } from './types'
import { parseURL } from '@/utils/uri'

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
 * 获取当前页面路由信息
 */
export function getCurrentPageRoute(router: Router): Route {
  const page: Recordable | undefined = getCurrentPage()
  if (!page || !page.route || !router.routes) {
    return {}
  }

  const currRoute: Route = router.routes.find((p: Recordable) => {
    return p.path === page.route
  })

  if (page.$page) {
    currRoute.fullPath = page.$page.fullPath
    const { query } = parseURL(page.$page.fullPath)
    currRoute.query = query || undefined
  }

  // 深拷贝
  return JSON.parse(JSON.stringify(currRoute))
}

/**
 * 根据path查找路由
 */
export function findRouteByPath(to: string | Pick<Partial<Route>, 'name' | 'path'>, router: Router): Recordable | undefined {
  if (typeof to === 'string') {
    return router.routes.find((route: Route) => route.path === to)
  }

  return router.routes.find((route: Route) => {
    return route.name === to.name || route.path === to.path
  })
}
