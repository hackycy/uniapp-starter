import { inject, reactive, watch } from 'vue'
import { routeKey } from './helper'

export function useRoute() {
  const currentRoute = inject(routeKey)

  if (currentRoute) {
    const route = reactive(currentRoute.value)
    watch(currentRoute, (newRoute) => {
      Object.assign(route, newRoute)
    })

    return route
  }
  else {
    console.warn('useRoute: No route provided. Make sure to call setupRouter before using this function.')
  }
}
