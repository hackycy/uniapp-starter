/// <reference types="vite/client" />
/// <reference types="@uni-aide/unplugin-uni-pages/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_SHORT_NAME: string
  readonly VITE_APP_ID: string
  readonly VITE_APP_PORT: string
  readonly VITE_APP_PUBLIC_BASE: string
  readonly VITE_APP_PROXY: string
  readonly VITE_WX_APPID: string
  readonly VITE_OPENWX_APPID: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_PATH: string
  readonly VITE_DEVTOOL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
