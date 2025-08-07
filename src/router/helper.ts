import type { InjectionKey, ShallowReactive } from 'vue'
import type { Route, Router } from './types'

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
  aliasPath: '/',
  name: undefined,
  query: {},
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
  }

  return JSON.parse(JSON.stringify(currRoute))
}
