// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'

import { h } from 'vue'

import DefaultTheme from 'vitepress/theme'
import './style.css'

import 'sphere-ui/style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp() {
    // ...
  },
} satisfies Theme
