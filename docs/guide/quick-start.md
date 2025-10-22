# Quick Start

This guide will help you get up and running with Sphere UI in just a few minutes.

## Full Import

The easiest way to use Sphere UI is to import all components globally.

### Step 1: Import Sphere UI

In your `main.ts` or `main.js` file:

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// Import Sphere UI
import SphereUI from 'sphere-ui'
import 'sphere-ui/style.css'

const app = createApp(App)

// Register all components globally
Object.entries(SphereUI).forEach(([name, component]) => {
  app.component(name, component)
})

app.mount('#app')
```

### Step 2: Configure Tailwind CSS

Create or update your `tailwind.config.js`:

```javascript
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

### Step 3: Add Tailwind to Vite

Update your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

### Step 4: Use Components

Now you can use any Sphere UI component in your Vue files:

```vue
<template>
  <div class="p-4">
    <Button variant="primary">Click me</Button>
    <Input v-model="text" placeholder="Enter text..." />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>
```

## On-Demand Import (Recommended)

For better tree-shaking and smaller bundle sizes, import only the components you need.

### Step 1: Import Components

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Card, Dialog } from 'sphere-ui'
import 'sphere-ui/style.css'

const visible = ref(false)
const inputValue = ref('')
</script>

<template>
  <div class="p-8">
    <Card class="max-w-md">
      <h2 class="text-2xl font-bold mb-4">Welcome to Sphere UI</h2>
      
      <Input 
        v-model="inputValue" 
        placeholder="Enter your name"
        class="mb-4"
      />
      
      <Button 
        variant="primary" 
        @click="visible = true"
      >
        Open Dialog
      </Button>
    </Card>

    <Dialog v-model:visible="visible" title="Hello!">
      <p>Hello, {{ inputValue || 'Guest' }}!</p>
      <p class="mt-2 text-gray-600">Welcome to Sphere UI</p>
    </Dialog>
  </div>
</template>
```

### Step 2: Import Types (Optional)

Sphere UI exports TypeScript types for better type checking:

```typescript
import { Button, type ButtonProps, type ButtonInstance } from 'sphere-ui'
import type { TableColumn, TableProps } from 'sphere-ui'
```

## Using with TypeScript

Sphere UI is built with TypeScript and provides full type support.

### Component Props Types

```vue
<script setup lang="ts">
import { Button, type ButtonProps } from 'sphere-ui'
import { ref } from 'vue'

const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'md',
  disabled: false,
}

const handleClick = () => {
  console.log('Button clicked!')
}
</script>

<template>
  <Button v-bind="buttonProps" @click="handleClick">
    Click me
  </Button>
</template>
```

### Component Instance Types

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Input, type InputInstance } from 'sphere-ui'

const inputRef = ref<InputInstance>()

const focusInput = () => {
  inputRef.value?.focus()
}
</script>

<template>
  <div>
    <Input ref="inputRef" placeholder="Type here..." />
    <Button @click="focusInput">Focus Input</Button>
  </div>
</template>
```

## Starter Templates

### Vite + Vue 3 + TypeScript

```bash
# Create a new Vite project
npm create vite@latest my-app -- --template vue-ts
cd my-app

# Install dependencies
npm install

# Install Sphere UI and peer dependencies
npm install sphere-ui vue @icon-park/vue-next @tailwindcss/vite @vueuse/core class-variance-authority lodash-es tailwindcss

# Start development server
npm run dev
```

### Nuxt 3

```bash
# Create a new Nuxt project
npx nuxi init my-app
cd my-app

# Install dependencies
npm install

# Install Sphere UI
npm install sphere-ui

# Create a plugin file: plugins/sphere-ui.ts
```

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

## Complete Example

Here's a complete example showcasing multiple components:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  Card,
  Input,
  Select,
  Checkbox,
  Radio,
  Table,
  Dialog,
  Tabs,
  Tag,
} from 'sphere-ui'
import 'sphere-ui/style.css'

// Form state
const name = ref('')
const email = ref('')
const role = ref('')
const agree = ref(false)
const gender = ref('male')

// Dialog state
const dialogVisible = ref(false)

// Table data
const columns = [
  { key: 'id', title: 'ID', sortable: true },
  { key: 'name', title: 'Name', sortable: true },
  { key: 'role', title: 'Role' },
  { key: 'status', title: 'Status' },
]

const tableData = ref([
  { id: 1, name: 'John Doe', role: 'Developer', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'Designer', status: 'Active' },
  { id: 3, name: 'Bob Johnson', role: 'Manager', status: 'Away' },
])

// Tabs
const tabItems = [
  { key: 'profile', label: 'Profile' },
  { key: 'settings', label: 'Settings' },
  { key: 'data', label: 'Data' },
]

const activeTab = ref('profile')

// Form submit
const handleSubmit = () => {
  if (!agree.value) {
    alert('Please agree to terms')
    return
  }
  dialogVisible.value = true
}
</script>

<template>
  <div class="p-8 max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">Sphere UI Demo</h1>

    <Tabs v-model="activeTab" :items="tabItems" class="mb-8" />

    <!-- Profile Tab -->
    <div v-if="activeTab === 'profile'">
      <Card class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">User Profile</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Name</label>
            <Input v-model="name" placeholder="Enter your name" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Email</label>
            <Input v-model="email" type="email" placeholder="your@email.com" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Role</label>
            <Select
              v-model="role"
              :options="[
                { label: 'Developer', value: 'dev' },
                { label: 'Designer', value: 'design' },
                { label: 'Manager', value: 'manager' },
              ]"
              placeholder="Select role"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Gender</label>
            <div class="space-x-4">
              <Radio v-model="gender" value="male" label="Male" />
              <Radio v-model="gender" value="female" label="Female" />
              <Radio v-model="gender" value="other" label="Other" />
            </div>
          </div>

          <div>
            <Checkbox v-model="agree" label="I agree to the terms and conditions" />
          </div>

          <div class="flex gap-2">
            <Button variant="primary" @click="handleSubmit">Submit</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </Card>
    </div>

    <!-- Settings Tab -->
    <div v-if="activeTab === 'settings'">
      <Card>
        <h2 class="text-2xl font-semibold mb-4">Settings</h2>
        <p class="text-gray-600">Settings content goes here...</p>
        
        <div class="mt-4 flex gap-2">
          <Tag variant="success">Enabled</Tag>
          <Tag variant="warning">Beta</Tag>
          <Tag variant="error">Deprecated</Tag>
        </div>
      </Card>
    </div>

    <!-- Data Tab -->
    <div v-if="activeTab === 'data'">
      <Card>
        <h2 class="text-2xl font-semibold mb-4">User Data</h2>
        <Table :columns="columns" :data="tableData" />
      </Card>
    </div>

    <!-- Success Dialog -->
    <Dialog v-model:visible="dialogVisible" title="Success!">
      <div class="space-y-2">
        <p>Your profile has been updated successfully!</p>
        <p class="text-gray-600">Name: {{ name }}</p>
        <p class="text-gray-600">Email: {{ email }}</p>
      </div>
      <template #footer>
        <Button variant="primary" @click="dialogVisible = false">OK</Button>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}
</style>
```

## Next Steps

- Explore the [Components](/components/button) documentation
- Learn about [Configuration](/guide/configuration)
- Check out [Theming](/guide/theming) options
- Read the [TypeScript](/guide/typescript) guide

## Need Help?

- Check the [FAQ](/guide/faq)
- Report issues on [GitHub](https://github.com/yourusername/sphere-ui/issues)
- Join our community discussions