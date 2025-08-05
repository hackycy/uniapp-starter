import type { App, ObjectPlugin } from 'vue'
import type { Route, Router } from './types'
import { isEmpty } from 'radashi'
import { pages } from 'virtual:uni-pages'
import { shallowRef } from 'vue'
import { routeKey, saveCurrentRoute } from './helper'

export * from './core'

export function setupRouter(app: App<Element>) {
  const router: ObjectPlugin & Router = {
    install(app) {
      app.provide(routeKey, this.route)

      app.mixin({
        beforeCreate() {
          if (this.$mpType) {
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
          if (this.$mpType) {
            saveCurrentRoute(router)
          }
        },
      })
    },
    route: shallowRef<Route>({ path: '/' }),
    routes: pages,
  }

  app.use(router)
}
