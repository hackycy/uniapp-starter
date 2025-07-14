// @ts-check
import path from 'node:path'
import process from 'node:process'

/**
 * Get user root directory
 * @param {string[]} dir file path
 */
export function getRootPath(...dir) {
  return path.resolve(process.cwd(), ...dir)
}
