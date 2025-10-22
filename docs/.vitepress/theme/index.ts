import type { Theme } from 'vitepress'

import DefaultTheme from 'vitepress/theme'
import './style.css'

// Import Sphere UI components and styles
import SphereUI from '../../../src'
import '../../../src/style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register all Sphere UI components
    Object.entries(SphereUI).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
  setup() {},
} satisfies Theme
