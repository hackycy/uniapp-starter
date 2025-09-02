import type { Ref } from 'vue'

export interface RouteNameLocation {
  name: string
  query?: Record<string, any>
}

export interface RoutePathLocation {
  path: string
  query?: Record<string, any>
}

export interface RouteBackLocation {
  delta?: number
}

export type RouteUrlLocation = string
export type RouteLocationRaw = RouteUrlLocation | RouteNameLocation | RoutePathLocation

export interface Route {
  fullPath?: string
  name?: string
  path?: string
  query?: Record<string, any>
  meta?: Record<string, any>
}

/**
 * 守卫名称
 */
export type Guard = 'Auth'

export interface NavigationGuard {
  name: Guard
  interceptor: UniApp.InterceptorOptions
}

export interface Router {
  route: Ref<Route>
  routes: Route[]
  guards: NavigationGuard[]
  push: (to: RouteLocationRaw) => Promise<void>
  replace: (to: RouteLocationRaw) => Promise<void>
  switchTab: (to: RouteLocationRaw) => Promise<void>
  reLaunch: (to: RouteLocationRaw) => Promise<void>
  back: (to?: RouteBackLocation) => Promise<void>
  isReady: () => Promise<boolean>
}
