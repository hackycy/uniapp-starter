// @ts-check
import path from 'node:path'
import process from 'node:process'

/**
 * Get user root directory
 * @param {string[]} dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}

/**
 * Turn an object into an envfile string.
 * @link https://github.com/bevry/envfile/blob/3c27f93b85b9b9ec7d90a00f48dd12817664d01c/source/index.ts#L38
 */
export function stringify(obj: Record<string, any>): string {
  let result = ''
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      const line = `${key}=${jsonValueToEnv(value)}`
      result += `${line}\n`
    }
  }
  return result
}

function jsonValueToEnv(value: any): string {
  let processedValue = String(value)
  processedValue = processedValue.replace(/\n/g, '\\n')
  processedValue = processedValue.includes('\\n')
    ? `"${processedValue}"`
    : processedValue
  return processedValue
}
