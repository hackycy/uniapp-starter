// @ts-check
import { existsSync, writeFileSync } from 'node:fs'
import { getRootPath } from './utils.mjs'

/**
 * @param {'manifest' | 'pages'} file
 */
function ensureJsonFile(file) {
  const jsonFile = getRootPath('src', `${file}.json`)
  if (!existsSync(jsonFile)) {
    writeFileSync(jsonFile, JSON.stringify({}, null, 2), 'utf-8')
  }
}

ensureJsonFile('manifest')
ensureJsonFile('pages')
