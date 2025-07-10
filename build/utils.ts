import { existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export function ensureManifestFile() {
  const file = getRootPath('src', 'manifest.json')
  if (!existsSync(file)) {
    writeFileSync(file, JSON.stringify({}, null, 2), 'utf-8')
  }
}

/**
 * Get user root directory
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}
