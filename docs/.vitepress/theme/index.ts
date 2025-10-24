// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'

import { h } from 'vue'

import DefaultTheme from 'vitepress/theme'
import './style.css'

// During docs development import the source stylesheet directly so styles
// are available even when `dist/` hasn't been built yet.
import '../../../src/style.css'
import * as UI from '../../../src'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    // Register UI components globally so Vue examples in markdown can render
    // directly (e.g. using <Button> in a page). We import the source
    // components from `src/ui` and register any exported component.
    Object.entries(UI).forEach(([name, comp]) => {
      // runtime exports may include non-component values; guard by type
      if (comp && (typeof comp === 'object' || typeof comp === 'function')) {
        try {
          app.component(name, comp as any)
        } catch {
          // ignore non-components
        }
      }
    })
  },
} satisfies Theme
