export function getAppEnvConfig() {
  return {
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_API_PATH: import.meta.env.VITE_API_PATH,
    VITE_DEVTOOL: import.meta.env.VITE_DEVTOOL,

    // #ifdef H5
    VITE_OPENWX_APPID: import.meta.env.VITE_OPENWX_APPID,
    // #endif

    // #ifdef MP-WEIXIN
    VITE_WX_APPID: import.meta.env.VITE_WX_APPID,
    // #endif
  }
}

let vconsole: unknown
export async function setupDevtool() {
  if (import.meta.env.VITE_DEVTOOL !== 'true') {
    return
  }

  // #ifdef H5
  if (vconsole) {
    return
  }
  const { default: VConsole } = await import('vconsole')
  vconsole = new VConsole()
  // #endif
}
