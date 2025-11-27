// @ts-check
import { copyFileSync, existsSync, rmSync } from 'node:fs'
import process from 'node:process'
import { checkManifestJsonFileSync } from '@uni-aide/unplugin-uni-manifest'
import UniManifest from '@uni-aide/unplugin-uni-manifest/vite'
import { checkPagesJsonFileSync } from '@uni-aide/unplugin-uni-pages'
import UniPages from '@uni-aide/unplugin-uni-pages/vite'
import { build } from 'vite'
import { getRootPath } from './utils'

await (async () => {
  // 检测 manifest.json 和 pages.json 文件
  checkManifestJsonFileSync(getRootPath('src', 'manifest.json'))
  checkPagesJsonFileSync(getRootPath('src', 'pages.json'))

  // 创建开发环境env
  const devEnvFile = getRootPath('.env.development')
  if (!existsSync(devEnvFile)) {
    copyFileSync(getRootPath('.env'), devEnvFile)
  }

  // Mock Vite Start 创建pages.json 及 manifest.json
  const outputDir = getRootPath('node_modules/.cache/dist')
  await build({
    configFile: false,
    root: process.cwd(),
    build: {
      outDir: outputDir,
    },
    plugins: [
      UniManifest(),
      UniPages({
        scanDir: ['src/pages'],
      }),
      // 拦截文件编译
      [
        {
          name: 'mock-build-plugin',
          enforce: 'pre',
          load(id) {
            const ext = id.split('.').pop()
            if (['.vue', '.ts', '.tsx'].includes(`.${ext}`)) {
              return '' // 返回空内容，跳过编译
            }
            return null
          },
        },
      ],
    ],
  })

  // clean dist
  if (existsSync(outputDir)) {
    try {
      rmSync(outputDir, { recursive: true, force: true })
    }
    catch (err) {
      console.error(`Error cleaning up temporary files: ${err}`)
    }
  }

  console.log('Setup environment completed.')
})()
