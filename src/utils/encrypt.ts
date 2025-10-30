const b64re = /^(?:[A-Z\d+/]{4})*?(?:[A-Z\d+/]{2}(?:==)?|[A-Z\d+/]{3}=?)?$/i
const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

/**
 * https://github.com/equicy/weapp-jwt-decode/blob/master/weapp-jwt.js
 */
export function atob(input: string): string {
  // #ifdef H5
  return window.atob(input)
  // #endif

  // #ifndef H5
  input = String(input).replace(/[\t\n\f\r ]+/g, '')
  if (!b64re.test(input))
    throw new TypeError('Failed to execute \'atob\' on \'Window\': The string to be decoded is not correctly encoded.')

  input += '=='.slice(2 - (input.length & 3))
  let bitmap
  let result = ''
  let r1
  let r2
  let i = 0
  for (; i < input.length;) {
    bitmap = b64.indexOf(input.charAt(i++)) << 18 | b64.indexOf(input.charAt(i++)) << 12
      | (r1 = b64.indexOf(input.charAt(i++))) << 6 | (r2 = b64.indexOf(input.charAt(i++)))
    result += r1 === 64
      ? String.fromCharCode(bitmap >> 16 & 255)
      : r2 === 64
        ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255)
        : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255)
  }
  return result
  // #endif
}

export function btoa(input: string): string {
  // #ifdef H5
  return window.btoa(input)
  // #endif

  // #ifndef H5
  input = String(input)
  let bitmap
  let a
  let b
  let c
  let result = ''
  let i = 0
  const rest = input.length % 3
  for (; i < input.length;) {
    a = input.charCodeAt(i++)
    b = input.charCodeAt(i++)
    c = input.charCodeAt(i++)

    if (a > 255 || b > 255 || c > 255) {
      throw new TypeError('Failed to execute \'btoa\' on \'Window\': The string to be encoded contains characters outside of the Latin1 range.')
    }
    bitmap = (a << 16) | (b << 8) | c
    result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63)
      + b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63)
  }
  return rest ? result.slice(0, rest - 3) + '==='.substring(rest) : result
  // #endif
}
