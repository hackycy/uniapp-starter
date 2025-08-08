import type { Ref } from 'vue'

export interface Route {
  fullPath?: string
  name?: string
  path?: string
  query?: Record<string, any>
  meta?: Record<string, any>
}

export interface Router {
  route: Ref<Route>
  routes: any
}
