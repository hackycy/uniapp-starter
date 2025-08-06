import type { App, ObjectPlugin } from 'vue'
import type { Route, Router } from './types'
import { isEmpty } from 'radashi'
import { pages } from 'virtual:uni-pages'
import { shallowRef } from 'vue'
import { setupRouterGuard } from './guard'
import { routeKey, routerKey, saveCurrentRoute } from './helper'

export * from './core'

export function setupRouter(app: App<Element>) {
  const router: ObjectPlugin & Router = {
    install($app) {
      $app.provide(routerKey, this)
      $app.provide(routeKey, this.route)

      app.mixin({
        beforeCreate() {
          if (this.$mpType === 'page') {
            saveCurrentRoute(router)
          }
        },
        onLoad(option) {
          if (!isEmpty(option)) {
            router.route.value = {
              ...router.route.value,
              query: option,
            }
          }
        },
        onShow() {
          if (this.$mpType === 'page') {
            saveCurrentRoute(router)
          }
        },
      })
    },
    route: shallowRef<Route>({ path: '/' }),
    routes: pages,
  }

  setupRouterGuard(router)
  app.use(router)
}
