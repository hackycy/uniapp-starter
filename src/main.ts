import { createSSRApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupDevtool } from './utils/env'

import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App)

  // Configure store
  setupStore(app)

  // Configure routing
  setupRouter(app)

  // Configure devtool (vconsole)
  if (import.meta.env.VITE_DEVTOOL === 'true') {
    setupDevtool()
  }

  return {
    app,
  }
}
