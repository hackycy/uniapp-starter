import type { Route } from './types'
import { inject, reactive, watch } from 'vue'
import { routeKey, routerKey } from './helper'

export function useRoute(): Route {
  const currentRoute = inject(routeKey)

  if (currentRoute) {
    const route = reactive(currentRoute.value)
    watch(currentRoute, (newRoute) => {
      Object.assign(route, newRoute)
    })

    return route
  }
  else {
    throw new Error('useRoute: No route provided. Make sure it is being used inside a Vue component.')
  }
}

export function useRouter() {
  const router = inject(routerKey)
  if (router) {
    return router
  }
  else {
    throw new Error('useRouter: No router provided. it is being used inside a Vue component.')
  }
}
