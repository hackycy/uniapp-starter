export function getAppEnvConfig() {
  return {
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_API_PATH: import.meta.env.VITE_API_PATH,

    // #ifdef H5
    VITE_OPENWX_APPID: import.meta.env.VITE_OPENWX_APPID,
    // #endif

    // #ifdef MP-WEIXIN
    VITE_WX_APPID: import.meta.env.VITE_WX_APPID,
    // #endif
  }
}
