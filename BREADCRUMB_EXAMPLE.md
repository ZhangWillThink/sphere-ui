# Breadcrumb Component - Practical Usage Guide

This guide demonstrates how to effectively use the Breadcrumb component in real-world applications with the Sphere UI library.

## Overview

The Breadcrumb component provides navigation aids that show the user's current location within a website or application hierarchy. It helps users understand their position and navigate back to higher-level pages.

## Basic Usage

### 1. Simple Breadcrumb Navigation

```vue
<script setup lang="ts">
import { Breadcrumb } from 'sphere-ui'

const breadcrumbItems = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'Electronics', href: '/products/electronics' },
  { title: 'Smartphones' },
]
</script>

<template>
  <Breadcrumb :items="breadcrumbItems" />
</template>
```

### 2. Breadcrumb with Click Handlers

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Breadcrumb } from 'sphere-ui'

const currentPath = ref('home')

const breadcrumbItems = [
  {
    title: 'Home',
    onClick: () => {
      currentPath.value = 'home'
      // Navigate to home page
    },
  },
  {
    title: 'Products',
    onClick: () => {
      currentPath.value = 'products'
      // Navigate to products page
    },
  },
  { title: 'Current Product' },
]
</script>

<template>
  <Breadcrumb :items="breadcrumbItems" />
</template>
```

## Advanced Usage

### 1. Custom Separators

```vue
<script setup lang="ts">
import { Breadcrumb } from 'sphere-ui'

const breadcrumbItems = [
  { title: 'Home', href: '/' },
  { title: 'Library', href: '/library' },
  { title: 'Data' },
]
</script>

<template>
  <!-- Using text separator -->
  <Breadcrumb separator=">" :items="breadcrumbItems" />

  <!-- Using symbol separator -->
  <Breadcrumb separator="→" :items="breadcrumbItems" />

  <!-- Using emoji separator -->
  <Breadcrumb separator="👉" :items="breadcrumbItems" />
</template>
```

### 2. Custom Link Components

```vue
<script setup lang="ts">
import { h } from 'vue'
import { Breadcrumb } from 'sphere-ui'

// Create custom link component
const CustomLink = (props, { slots }) => {
  return h(
    'a',
    {
      href: props.href,
      class: 'text-blue-600 hover:text-blue-800 font-medium',
    },
    slots.default?.(),
  )
}

const breadcrumbItems = [
  { title: 'Home', href: '/' },
  {
    title: h(CustomLink, { href: '/products' }, { default: () => 'Products' }),
    onClick: () => {
      // Custom navigation logic
    },
  },
  { title: 'Product Detail' },
]
</script>

<template>
  <Breadcrumb :items="breadcrumbItems" />
</template>
```

### 3. Dynamic Breadcrumb Updates

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { Breadcrumb } from 'sphere-ui'
import { useRoute } from 'vue-router' // If using Vue Router

const route = useRoute()
const breadcrumbItems = ref([])

// Update breadcrumb based on route changes
watch(
  route,
  newRoute => {
    updateBreadcrumb(newRoute)
  },
  { immediate: true },
)

function updateBreadcrumb(route) {
  const pathParts = route.path.split('/').filter(Boolean)

  breadcrumbItems.value = [
    { title: 'Home', href: '/' },
    ...pathParts.map((part, index) => {
      const path = '/' + pathParts.slice(0, index + 1).join('/')
      const isLast = index === pathParts.length - 1

      return {
        title: formatTitle(part),
        href: isLast ? undefined : path,
        onClick: isLast
          ? undefined
          : () => {
              // Navigate to path
            },
      }
    }),
  ]
}

function formatTitle(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ')
}
</script>

<template>
  <Breadcrumb :items="breadcrumbItems" />
</template>
```

## Real-World Implementation Example

Here's a complete example showing how to implement breadcrumb navigation in an e-commerce application:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Breadcrumb, Button } from 'sphere-ui'

// Mock data
const categories = {
  electronics: { name: 'Electronics', parentId: null },
  smartphones: { name: 'Smartphones', parentId: 'electronics' },
  laptops: { name: 'Laptops', parentId: 'electronics' },
}

const products = {
  'iphone-15': { name: 'iPhone 15', categoryId: 'smartphones' },
  'macbook-pro': { name: 'MacBook Pro', categoryId: 'laptops' },
}

// State
const currentView = ref('category')
const currentCategory = ref('electronics')
const currentProduct = ref(null)

// Computed breadcrumb items
const breadcrumbItems = computed(() => {
  const items = [{ title: 'Home', onClick: () => navigateTo('home') }]

  if (currentView.value === 'category' || currentView.value === 'product') {
    // Add category breadcrumbs
    const categoryPath = getCategoryPath(currentCategory.value)
    items.push(
      ...categoryPath.map(cat => ({
        title: categories[cat].name,
        onClick: () => {
          currentView.value = 'category'
          currentCategory.value = cat
          currentProduct.value = null
        },
      })),
    )
  }

  if (currentView.value === 'product' && currentProduct.value) {
    // Add product breadcrumb
    items.push({
      title: products[currentProduct.value].name,
    })
  }

  return items
})

// Helper functions
function getCategoryPath(categoryId) {
  const path = []
  let current = categoryId

  while (current) {
    path.unshift(current)
    current = categories[current].parentId
  }

  return path
}

function navigateTo(view, params = {}) {
  currentView.value = view
  if (params.category) currentCategory.value = params.category
  if (params.product) currentProduct.value = params.product
}
</script>

<template>
  <div class="p-6">
    <!-- Breadcrumb Navigation -->
    <Breadcrumb :items="breadcrumbItems" separator=">" class="mb-6" />

    <!-- Content Area -->
    <div v-if="currentView === 'home'">
      <h1 class="mb-4 text-2xl font-bold">Welcome to Our Store</h1>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Button @click="navigateTo('category', { category: 'electronics' })">
          Browse Electronics
        </Button>
      </div>
    </div>

    <div v-else-if="currentView === 'category'">
      <h1 class="mb-4 text-2xl font-bold">{{ categories[currentCategory].name }}</h1>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="product in getProductsByCategory(currentCategory)" :key="product.id">
          <Button @click="navigateTo('product', { product: product.id })">
            {{ product.name }}
          </Button>
        </div>
      </div>
    </div>

    <div v-else-if="currentView === 'product'">
      <h1 class="mb-4 text-2xl font-bold">{{ products[currentProduct].name }}</h1>
      <p class="text-gray-600">Product details would be displayed here.</p>
    </div>
  </div>
</template>
```

## Best Practices

1. **Keep it Simple**: Don't overload breadcrumbs with too many levels. Aim for 3-5 levels maximum.

2. **Use Clear Labels**: Make sure each breadcrumb item clearly represents the page it links to.

3. **Consistent Separators**: Use the same separator throughout your application for consistency.

4. **Accessibility**: Always include `aria-label="Breadcrumb"` on the nav element for screen readers.

5. **Mobile Consideration**: On small screens, consider truncating long breadcrumb trails or using a dropdown menu.

6. **Current Page**: Don't make the current page a link in the breadcrumb trail.

## API Reference

### Props

| Prop       | Type                  | Default     | Description                |
| ---------- | --------------------- | ----------- | -------------------------- |
| items      | `BreadcrumbItem[]`    | `[]`        | Array of breadcrumb items  |
| separator  | `string`              | `'/'`       | Custom separator character |
| params     | `Record<string, any>` | `{}`        | Routing parameters         |
| routes     | `BreadcrumbRoute[]`   | `[]`        | Routing stack information  |
| itemRender | `Function`            | `undefined` | Custom item renderer       |

### BreadcrumbItem Interface

| Property | Type       | Required | Description                      |
| -------- | ---------- | -------- | -------------------------------- |
| title    | `string`   | Yes      | The title of the breadcrumb item |
| href     | `string`   | No       | Target of hyperlink              |
| class    | `string`   | No       | Additional CSS classes           |
| onClick  | `Function` | No       | Click event handler              |

### Slots

| Name      | Description                                  |
| --------- | -------------------------------------------- |
| default   | Breadcrumb items (alternative to items prop) |
| separator | Custom separator element                     |

## Conclusion

The Breadcrumb component is an essential navigation aid that enhances user experience by providing clear path information. By following the examples and best practices outlined in this guide, you can effectively implement breadcrumb navigation in your Sphere UI applications.
