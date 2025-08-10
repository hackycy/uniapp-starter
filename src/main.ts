import { createSSRApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupDevtool } from './utils/env'

import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  setupRouter(app)
  setupDevtool()

  return {
    app,
  }
}
