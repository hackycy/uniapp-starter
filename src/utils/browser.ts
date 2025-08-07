/**
 * 判断是否在微信内置浏览器
 */
export function isWeixin() {
  // #ifdef H5
  const ua = navigator.userAgent.toLowerCase()
  const isWXWork = ua.match(/wxwork/i) !== null
  const isWeixin = !isWXWork && ua.match(/micromessenger/i) !== null
  return isWeixin
  // #endif
}
