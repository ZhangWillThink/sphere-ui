# Configuration

Learn how to configure Sphere UI to match your project's needs.

## Tailwind CSS Configuration

Sphere UI is built with Tailwind CSS, so proper configuration is essential.

### Basic Setup

Create or update your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    // Include Sphere UI components in the content
    './node_modules/sphere-ui/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Custom Theme

Extend Tailwind's theme to customize colors, spacing, and more:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/sphere-ui/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Add more custom colors
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
```

## Vite Configuration

Configure Vite to work with Sphere UI and Tailwind CSS.

### Basic Vite Config

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

### Advanced Configuration

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  build: {
    // Optimize build
    rollupOptions: {
      output: {
        manualChunks: {
          'sphere-ui': ['sphere-ui'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['sphere-ui', 'vue', '@vueuse/core'],
  },
})
```

## Component Registration

### Global Registration

Register all components globally in your main file:

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import SphereUI from 'sphere-ui'
import 'sphere-ui/style.css'

const app = createApp(App)

// Register all components
Object.entries(SphereUI).forEach(([name, component]) => {
  app.component(name, component)
})

app.mount('#app')
```

### Selective Registration

Register only specific components:

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { Button, Input, Card, Table } from 'sphere-ui'
import 'sphere-ui/style.css'

const app = createApp(App)

// Register selected components
app.component('Button', Button)
app.component('Input', Input)
app.component('Card', Card)
app.component('Table', Table)

app.mount('#app')
```

### Plugin Style Registration

Create a plugin for better organization:

```typescript
// plugins/sphere-ui.ts
import type { App } from 'vue'
import SphereUI from 'sphere-ui'
import 'sphere-ui/style.css'

export default {
  install(app: App) {
    Object.entries(SphereUI).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}
```

Then use it in your main file:

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import SphereUIPlugin from './plugins/sphere-ui'

const app = createApp(App)
app.use(SphereUIPlugin)
app.mount('#app')
```

## TypeScript Configuration

Configure TypeScript for optimal development experience.

### Basic tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    /* Vite */
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Vue Shims

Create a type declaration file for Vue components:

```typescript
// env.d.ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Auto-import Sphere UI types
declare module 'sphere-ui' {
  export * from 'sphere-ui'
}
```

## CSS Configuration

### Import Styles

You can import Sphere UI styles in different ways:

**In JavaScript/TypeScript:**

```typescript
// main.ts
import 'sphere-ui/style.css'
```

**In CSS:**

```css
/* style.css */
@import 'sphere-ui/style.css';
```

**In Vue SFC:**

```vue
<style>
@import 'sphere-ui/style.css';
</style>
```

### Custom CSS Variables

Override Sphere UI CSS variables:

```css
:root {
  /* Custom colors */
  --sphere-primary: #3b82f6;
  --sphere-secondary: #6366f1;
  --sphere-success: #10b981;
  --sphere-warning: #f59e0b;
  --sphere-error: #ef4444;
  
  /* Spacing */
  --sphere-spacing-sm: 0.5rem;
  --sphere-spacing-md: 1rem;
  --sphere-spacing-lg: 1.5rem;
  
  /* Border radius */
  --sphere-radius-sm: 0.25rem;
  --sphere-radius-md: 0.375rem;
  --sphere-radius-lg: 0.5rem;
  
  /* Shadows */
  --sphere-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --sphere-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --sphere-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

## Environment-Specific Configuration

### Development

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },
})
```

### Production

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})
```

## Framework-Specific Configuration

### Nuxt 3

Create a plugin file:

```typescript
// plugins/sphere-ui.ts
import SphereUI from 'sphere-ui'
import 'sphere-ui/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries(SphereUI).forEach(([name, component]) => {
    nuxtApp.vueApp.component(name, component)
  })
})
```

Update `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  css: ['sphere-ui/style.css'],
  modules: ['@nuxtjs/tailwindcss'],
})
```

### Vite SSR

Configure for server-side rendering:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    noExternal: ['sphere-ui'],
  },
})
```

## Tree-Shaking

Ensure proper tree-shaking for optimal bundle size:

```json
// package.json
{
  "sideEffects": [
    "*.css",
    "*.scss",
    "*.vue"
  ]
}
```

In your build configuration:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('sphere-ui')) {
            return 'sphere-ui'
          }
        },
      },
    },
  },
})
```

## Troubleshooting

### Styles Not Loading

Make sure you import the CSS file:

```typescript
import 'sphere-ui/style.css'
```

### Tailwind Classes Not Working

Ensure Sphere UI is included in your Tailwind content:

```javascript
// tailwind.config.js
export default {
  content: [
    './node_modules/sphere-ui/**/*.{vue,js,ts,jsx,tsx}',
  ],
}
```

### TypeScript Errors

Add Sphere UI to your types:

```json
{
  "compilerOptions": {
    "types": ["vite/client", "node"]
  }
}
```

### Build Errors

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- Learn about [Theming](/guide/theming)
- Explore [TypeScript](/guide/typescript) integration
- Check out [Components](/components/button)