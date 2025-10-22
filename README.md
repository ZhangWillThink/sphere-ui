# Sphere UI

<p align="center">
  <img src="https://img.shields.io/npm/v/sphere-ui" alt="npm version">
  <img src="https://img.shields.io/npm/dm/sphere-ui" alt="npm downloads">
  <img src="https://img.shields.io/github/license/willzhang/sphere-ui" alt="license">
  <img src="https://img.shields.io/badge/vue-3.x-brightgreen" alt="vue 3">
</p>

A modern, lightweight, and customizable UI component library for Vue 3, built with Tailwind CSS.

## ✨ Features

- 🎨 **Beautiful Design** - Modern and clean component designs
- 🚀 **Vue 3 Composition API** - Built with the latest Vue 3 features
- 💨 **Tailwind CSS** - Powered by Tailwind CSS for easy customization
- 📦 **Tree-shakable** - Import only what you need
- 🔧 **TypeScript** - Full TypeScript support with comprehensive type definitions
- 🎯 **Easy to Use** - Simple and intuitive API
- 🌈 **Rich Components** - 20+ high-quality components

## 📦 Installation

```bash
# Using npm
npm install sphere-ui

# Using yarn
yarn add sphere-ui

# Using pnpm
pnpm add sphere-ui

# Using bun
bun add sphere-ui
```

## 🔨 Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install vue @icon-park/vue-next @tailwindcss/vite @vueuse/core class-variance-authority lodash-es tailwindcss
```

## 🚀 Quick Start

### Full Import

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// Import Sphere UI
import SphereUI from 'sphere-ui'
import 'sphere-ui/style.css'

const app = createApp(App)
app.use(SphereUI)
app.mount('#app')
```

### On-Demand Import

```vue
<script setup lang="ts">
import { Button, Input, Card } from 'sphere-ui'
import 'sphere-ui/style.css'
</script>

<template>
  <Card>
    <Input placeholder="Enter your name" />
    <Button variant="primary">Submit</Button>
  </Card>
</template>
```

## 🎯 Components

Sphere UI provides a rich set of components:

### Basic Components

- **Button** - Versatile button component with multiple variants
- **Card** - Container for content
- **Divider** - Separator for content sections
- **Tag** - Label for categorizing or markup

### Form Components

- **Input** - Text input field
- **Textarea** - Multi-line text input
- **Select** - Dropdown select menu
- **Checkbox** - Checkbox input
- **Radio** - Radio button input
- **Form** - Form container with validation support

### Data Display

- **Table** - Data table with sorting and selection
- **Description** - Display key-value pairs
- **Tabs** - Tab navigation component
- **Collapse** - Collapsible content panels
- **Pagination** - Pagination for data lists

### Feedback

- **Dialog** - Modal dialog
- **Tooltip** - Hover tooltip
- **Popover** - Popover overlay
- **Loading** - Loading indicator

### Navigation

- **ContextMenu** - Right-click context menu

### Utilities

- **Transition** - Animation transitions

## 📚 Documentation

Visit our [documentation site](https://your-docs-url.com) for detailed guides, API references, and examples.

## 🎨 Tailwind CSS Configuration

Sphere UI uses Tailwind CSS. Make sure to configure Tailwind in your project:

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/sphere-ui/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add Tailwind to your Vite config:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

## 💡 Usage Examples

### Button

```vue
<template>
  <Button variant="primary" size="md">Primary Button</Button>
  <Button variant="secondary">Secondary Button</Button>
  <Button variant="outline">Outline Button</Button>
</template>
```

### Input

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <Input v-model="value" placeholder="Enter text..." />
</template>
```

### Table

```vue
<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', sortable: true },
  { key: 'email', title: 'Email' },
]

const data = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
]
</script>

<template>
  <Table :columns="columns" :data="data" />
</template>
```

### Dialog

```vue
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <Button @click="visible = true">Open Dialog</Button>
  <Dialog v-model:visible="visible" title="Dialog Title">
    <p>Dialog content goes here</p>
  </Dialog>
</template>
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/yourusername/sphere-ui.git
cd sphere-ui

# Install dependencies
bun install

# Start development server
bun run dev

# Build library
bun run build

# Build documentation
cd docs
bun run docs:dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vue 3](https://vuejs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [@icon-park/vue-next](https://iconpark.oceanengine.com/)
- Utilities from [VueUse](https://vueuse.org/)

## 📮 Contact

- Author: WillZhang
- GitHub: [@WillZhang](https://github.com/ZhangWillThink)
- Issues: [GitHub Issues](https://github.com/ZhangWillThink/sphere-ui/issues)

---

Made with ❤️ by WillZhang
