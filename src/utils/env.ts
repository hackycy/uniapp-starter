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

let vconsole: unknown
export async function setupDevtool() {
  // #ifdef H5
  if (vconsole) {
    return
  }

  if (import.meta.hot) {
    import('vconsole').then((mod) => {
      const VConsole = mod.default
      vconsole = new VConsole()
    })
  }
  else {
    const version = '3.15.1'
    const cdns = [
      `https://unpkg.com/vconsole@${version}/dist/vconsole.min.js`,
      `https://cdn.jsdelivr.net/npm/vconsole@${version}/dist/vconsole.min.js`,
      `https://cdn.bootcdn.net/ajax/libs/vConsole/${version}/vconsole.min.js`,
    ]
    // 寻找可用cdn
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = e => reject(e)
        document.body.appendChild(script)
      })
    }

    Promise.race(cdns.map(loadScript)).then(() => {
      vconsole = new (window as any).VConsole()
    })
  }
  // #endif

  // #ifdef MP-WEIXIN
  wx.setEnableDebug({
    enableDebug: true,
  })
  // #endif
}
