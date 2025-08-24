import type { App, ObjectPlugin } from 'vue'
import type { Route, Router } from './types'
import { isEmpty } from 'radashi'
import { pages } from 'virtual:uni-pages'
import { shallowReactive, shallowRef } from 'vue'
import { setupRouterGuard } from './guard'
import { getCurrentPageRoute, navigateTo, routeKey, routerKey, START_LOCATION_NORMALIZED } from './helper'

export * from './core'

function createRouter(): Router & ObjectPlugin {
  const reactiveRoute = {} as Route
  const currentRoute = shallowRef<Route>(START_LOCATION_NORMALIZED)

  for (const key in START_LOCATION_NORMALIZED) {
    Object.defineProperty(reactiveRoute, key, {
      get: () => currentRoute.value[key as keyof Route],
      enumerable: true,
    })
  }

  const router: ObjectPlugin & Router = {
    guards: [],
    push(to) {
      navigateTo(to, this, 'push')
    },
    replace(to) {
      navigateTo(to, this, 'replace')
    },
    switchTab(to) {
      navigateTo(to, this, 'switchTab')
    },
    reLaunch(to) {
      navigateTo(to, this, 'reLaunch')
    },
    back(to) {
      uni.navigateBack(to)
    },
    install(app) {
      app.provide(routerKey, this)
      app.provide(routeKey, shallowReactive(reactiveRoute))

      app.mixin({
        beforeCreate() {
          if (this.$mpType === 'page') {
            currentRoute.value = getCurrentPageRoute(router)
          }
        },
        onLoad(option) {
          if (!isEmpty(option)) {
            currentRoute.value = {
              ...currentRoute.value,
              query: option,
            }
          }
        },
        onShow() {
          if (this.$mpType === 'page') {
            currentRoute.value = getCurrentPageRoute(router)
          }
        },
      })
    },
    route: currentRoute,
    routes: pages,
  }

  return router
}

export const router = createRouter()

export function setupRouter(app: App<Element>) {
  setupRouterGuard(router)
  app.use(router)
}
