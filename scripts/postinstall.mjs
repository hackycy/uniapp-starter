// @ts-check
import { copyFileSync, existsSync } from 'node:fs'
import { checkManifestJsonFileSync } from '@uni-aide/vite-plugin-manifest'
import { checkPagesJsonFileSync } from '@uni-aide/vite-plugin-pages'
import { getRootPath } from './utils.mjs'

await (async () => {
  // 检测 manifest.json 和 pages.json 文件
  checkManifestJsonFileSync(getRootPath('src', 'manifest.json'))
  checkPagesJsonFileSync(getRootPath('src', 'pages.json'))

  // 创建开发环境env
  const devEnvFile = getRootPath('.env.development')
  if (!existsSync(devEnvFile)) {
    copyFileSync(getRootPath('.env'), devEnvFile)
  }

  console.log('Development env create successfully.')
})()
