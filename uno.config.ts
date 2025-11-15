import path from 'node:path'
import process from 'node:process'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { presetUni } from '@uni-helper/unocss-preset-uni'
import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'
import Icons from './src/components/Icon/icon.data'

export default defineConfig({
  presets: [
    presetUni({
      attributify: false,
      uno: {
        presetOptions: {
          dark: {
            dark: '.wot-theme-dark',
          },
        },
      },
    }),
    /**
     * https://icones.js.org/
     */
    presetIcons({
      prefix: 'i-',
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'overflow': 'hidden',
        'width': '1em',
        'height': '1em',
        'vertical-align': '-0.15em',
      },
      collections: {
        /**
         * 项目内如需自定义svg，请先自行处理svg格式，移除width / height
         * 单色图标需要将颜色至改为 currentColor
         * 如 fill="currentColor"
         */
        custom: FileSystemIconLoader(path.resolve(process.cwd(), 'src', 'assets', 'icons')),
      },
    }),
  ],
  transformers: [
    // 启用指令功能：主要用于支持 @apply、@screen 和 theme() 等 CSS 指令
    transformerDirectives(),
    // 启用 () 分组功能
    // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup(),
  ],
  safelist: [...Icons],
  rules: [
    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
  ],
  shortcuts: [
    {
      'flex-center': 'flex items-center justify-center',
    },
  ],
  theme: {
    colors: {
      primary: 'var(--wot-color-theme)',
      // 文本颜色
      label: {
        primary: '#333333',
        secondary: '#666666',
        tertiary: '#999999',
        disabled: '#cccccc',
        error: '#ff3434',
      },
    },
  },
})
