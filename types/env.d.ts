/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

interface ImportMetaEnv {
  readonly UNI_APP_TITLE: string
  readonly UNI_APP_PORT: string
  readonly UNI_APP_PUBLIC_BASE: string
  readonly UNI_APP_PROXY_ENABLED: 'true' | 'false'
  readonly UNI_WX_APPID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
