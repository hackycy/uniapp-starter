import type { Ref } from 'vue'

export interface Route {
  fullPath?: string
  aliasPath?: string
  name?: string
  path?: string
  query?: Record<string, any>
}

export interface Router {
  route: Ref<Route>
  routes: any
}
