// @ts-check
import { existsSync, rmSync, writeFileSync } from 'node:fs'
import process from 'node:process'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import { build } from 'vite'
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

const IGNORE_EXTENSIONS = ['.vue', '.ts', '.tsx']

/**
 * 模拟启动一次构建生成 manifest.json 和 pages.json 文件
 *
 * 注意UniManifest / UniPages 插件配置需要跟项目vite.config.ts中的配置保持一致
 */
await (async () => {
  ensureJsonFile('manifest')
  ensureJsonFile('pages')

  await build({
    configFile: false,
    root: process.cwd(),
    plugins: [
      UniManifest(),
      UniPages({
        dts: 'types/uni-pages.d.ts',
        subPackages: ['src/pages-sub'],
      }),
      // 拦截文件编译
      [
        {
          name: 'mock-build-plugin',
          enforce: 'pre',
          load(id) {
            const ext = id.split('.').pop()
            if (IGNORE_EXTENSIONS.includes(`.${ext}`)) {
              return '' // 返回空内容，跳过编译
            }
            return null
          },
        },
      ],
    ],
  })

  // 删除 dist 文件夹
  const distPath = getRootPath('dist')
  if (existsSync(distPath)) {
    rmSync(distPath, {
      recursive: true,
      force: true,
    })
  }

  console.log('Uni pages and manifest files generated successfully.')
})()
