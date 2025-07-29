export const platform = __APP_INFO__.platform
export const version = __APP_INFO__.version
export const lastBuildTime = __APP_INFO__.lastBuildTime

export const isH5 = platform === 'h5'
export const isApp = platform === 'app'
export const isMp = platform.startsWith('mp-')
export const isMpWeixin = platform.startsWith('mp-weixin')
export const isMpAplipay = platform.startsWith('mp-alipay')
export const isMpToutiao = platform.startsWith('mp-toutiao')

const PLATFORM = {
  platform,
  version,
  lastBuildTime,
  isH5,
  isApp,
  isMp,
  isMpWeixin,
  isMpAplipay,
  isMpToutiao,
}

export default PLATFORM
