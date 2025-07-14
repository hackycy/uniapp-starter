import { presetUni } from '@uni-helper/unocss-preset-uni'
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUni({
      attributify: false,
    }),
    /**
     * https://icones.js.org/
     */
    presetIcons({
      prefix: 'i-',
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'overflow': 'hidden',
        'vertical-align': '-0.15em',
        'width': '1em',
        'height': '1em',
      },
    }),
  ],
  safelist: [],
  rules: [],
  shortcuts: [
    {
      'flex-center': 'flex items-center justify-center',
    },
  ],
  theme: {
    colors: {
      primary: 'var(--uni-primary-color)',
    },
  },
})
