import { getAppEnvConfig } from '@/utils/env'

export interface GlobalSettings {
  appName?: string
  wxAppId?: string
  openWxAppId?: string
  apiBaseUrl?: string
  apiPath?: string
}

export function useGlobalSetting(): GlobalSettings {
  const env = getAppEnvConfig()

  const glob: Readonly<GlobalSettings> = {
    appName: env.VITE_APP_NAME,
    wxAppId: env.VITE_WX_APPID,
    openWxAppId: env.VITE_OPENWX_APPID,
    apiBaseUrl: env.VITE_API_BASE_URL,
    apiPath: env.VITE_API_PATH,
  }

  return glob
}
