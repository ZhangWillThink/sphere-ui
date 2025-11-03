# Breadcrumb Component Usage Guide

This guide provides comprehensive instructions on how to effectively use the Breadcrumb component in the Sphere UI library.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Basic Usage](#basic-usage)
4. [Advanced Features](#advanced-features)
5. [API Reference](#api-reference)
6. [Best Practices](#best-practices)
7. [Real-World Examples](#real-world-examples)

## Introduction

The Breadcrumb component is a navigation aid that shows users their current location within a website or application. It helps with orientation and allows users to easily navigate back to previous sections.

## Installation

The Breadcrumb component is part of the Sphere UI library. To use it, first install Sphere UI:

```bash
npm install sphere-ui
```

Then import the component in your Vue application:

```vue
<script setup>
import { Breadcrumb } from 'sphere-ui'
</script>
```

## Basic Usage

### Using the Items Prop (Recommended)

The most straightforward way to use the Breadcrumb component is with the [items](file:///home/willzhang/code/sphere-ui/src/ui/Tabs/types.ts#L10-L10) prop:

```vue
<script setup>
import { Breadcrumb } from 'sphere-ui'

const breadcrumbItems = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'Electronics' },
]
</script>

<template>
  <Breadcrumb :items="breadcrumbItems" />
</template>
```

### Using Slots (Traditional Approach)

You can also use the traditional slot-based approach:

```vue
<script setup>
import { Breadcrumb } from 'sphere-ui'
</script>

<template>
  <Breadcrumb>
    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
    <Breadcrumb.Item>Electronics</Breadcrumb.Item>
  </Breadcrumb>
</template>
```

## Advanced Features

### Custom Separators

You can customize the separator between breadcrumb items:

```vue
<script setup>
import { Breadcrumb } from 'sphere-ui'

const items = [
  { title: 'Home', href: '/' },
  { title: 'Library', href: '/library' },
  { title: 'Data' },
]
</script>

<template>
  <!-- Text separator -->
  <Breadcrumb separator=">" :items="items" />

  <!-- Symbol separator -->
  <Breadcrumb separator="→" :items="items" />

  <!-- Emoji separator -->
  <Breadcrumb separator="👉" :items="items" />
</template>
```

### Custom Separator Slot

For more complex separators, use the separator slot:

```vue
<template>
  <Breadcrumb :items="items">
    <template #separator>
      <Breadcrumb.Separator>
        <span class="font-bold text-red-500">|</span>
      </Breadcrumb.Separator>
    </template>
  </Breadcrumb>
</template>
```

### Click Handlers

Add click handlers for interactive breadcrumb items:

```vue
<script setup>
import { Breadcrumb } from 'sphere-ui'

const items = [
  {
    title: 'Home',
    onClick: () => {
      // Navigate to home
      console.log('Navigating to home')
    },
  },
  {
    title: 'Products',
    onClick: () => {
      // Navigate to products
      console.log('Navigating to products')
    },
  },
  { title: 'Electronics' },
]
</script>

<template>
  <Breadcrumb :items="items" />
</template>
```

### Custom Link Components

For more advanced use cases, you can pass VNodes as titles:

```vue
<script setup>
import { h } from 'vue'
import { Breadcrumb } from 'sphere-ui'

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

const items = [
  { title: 'Home', href: '/' },
  {
    title: h(CustomLink, { href: '/products' }, { default: () => 'Products' }),
    onClick: () => {
      // Custom navigation logic
    },
  },
  { title: 'Electronics' },
]
</script>

<template>
  <Breadcrumb :items="items" />
</template>
```

## API Reference

### Breadcrumb Props

| Prop                                                                                   | Type                   | Default     | Description                |
| -------------------------------------------------------------------------------------- | ---------------------- | ----------- | -------------------------- |
| [items](file:///home/willzhang/code/sphere-ui/src/ui/Tabs/types.ts#L10-L10)            | `BreadcrumbItem[]`     | `[]`        | Array of breadcrumb items  |
| [separator](file:///home/willzhang/code/sphere-ui/src/ui/Breadcrumb/types.ts#L13-L13)  | `string \| VNodeChild` | `'/'`       | Custom separator character |
| [params](file:///home/willzhang/code/sphere-ui/src/ui/Breadcrumb/types.ts#L21-L21)     | `Record<string, any>`  | `{}`        | Routing parameters         |
| [routes](file:///home/willzhang/code/sphere-ui/src/ui/Breadcrumb/types.ts#L25-L25)     | `BreadcrumbRoute[]`    | `[]`        | Routing stack information  |
| [itemRender](file:///home/willzhang/code/sphere-ui/src/ui/Breadcrumb/types.ts#L29-L29) | `Function`             | `undefined` | Custom item renderer       |

### BreadcrumbItem Interface

| Property                                                                            | Type                   | Required | Description                      |
| ----------------------------------------------------------------------------------- | ---------------------- | -------- | -------------------------------- |
| [title](file:///home/willzhang/code/sphere-ui/src/ui/Breadcrumb/types.ts#L13-L13)   | `string \| VNodeChild` | Yes      | The title of the breadcrumb item |
| [href](file:///home/willzhang/code/sphere-ui/src/ui/Breadcrumb/types.ts#L35-L35)    | `string`               | No       | Target of hyperlink              |
| [class](file:///home/willzhang/code/sphere-ui/src/ui/Breadcrumb/types.ts#L39-L39)   | `string`               | No       | Additional CSS classes           |
| [onClick](file:///home/willzhang/code/sphere-ui/src/ui/Breadcrumb/types.ts#L43-L43) | `Function`             | No       | Click event handler              |

### Slots

| Name      | Description                                  |
| --------- | -------------------------------------------- |
| default   | Breadcrumb items (alternative to items prop) |
| separator | Custom separator element                     |

## Best Practices

1. **Keep it Simple**: Limit breadcrumb trails to 3-5 levels to avoid overwhelming users.

2. **Use Clear Labels**: Ensure each breadcrumb item clearly represents the page it links to.

3. **Consistent Separators**: Use the same separator throughout your application for consistency.

4. **Accessibility**: Always include `aria-label="Breadcrumb"` on the nav element for screen readers.

5. **Mobile Consideration**: On small screens, consider truncating long breadcrumb trails or using a dropdown menu.

6. **Current Page**: Don't make the current page a link in the breadcrumb trail.

7. **Logical Hierarchy**: Ensure the breadcrumb trail follows a logical hierarchy that matches your site structure.

8. **Performance**: Use the items prop approach for better performance over the slot-based approach.

## Real-World Examples

### E-commerce Navigation

```vue
<script setup>
import { ref, computed } from 'vue'
import { Breadcrumb } from 'sphere-ui'

const currentPath = ref({
  category: 'electronics',
  subcategory: 'smartphones',
  product: 'iphone-15',
})

const breadcrumbItems = computed(() => [
  { title: 'Home', href: '/' },
  { title: 'Shop', href: '/shop' },
  { title: 'Electronics', href: '/shop/electronics' },
  { title: 'Smartphones', href: '/shop/electronics/smartphones' },
  { title: 'iPhone 15' },
])
</script>

<template>
  <Breadcrumb :items="breadcrumbItems" separator=">" />
</template>
```

### Content Management System

```vue
<script setup>
import { ref, computed } from 'vue'
import { Breadcrumb } from 'sphere-ui'

const navigationState = ref({
  department: 'engineering',
  team: 'frontend',
  project: 'website-redesign',
})

const breadcrumbItems = computed(() => [
  {
    title: 'Dashboard',
    onClick: () => resetNavigation(),
  },
  {
    title: 'Engineering',
    onClick: () => {
      navigationState.value.team = null
      navigationState.value.project = null
    },
  },
  {
    title: 'Frontend Team',
    onClick: () => {
      navigationState.value.project = null
    },
  },
  { title: 'Website Redesign' },
])

function resetNavigation() {
  navigationState.value = {
    department: null,
    team: null,
    project: null,
  }
}
</script>

<template>
  <Breadcrumb :items="breadcrumbItems" separator="→" />
</template>
```

## Conclusion

The Breadcrumb component is an essential navigation tool that enhances user experience by providing clear path information. By following the examples and best practices outlined in this guide, you can effectively implement breadcrumb navigation in your Sphere UI applications.

For more examples, check out the playground examples in:

- [/playground/src/BreadcrumbExample.vue](file:///home/willzhang/code/sphere-ui/playground/src/BreadcrumbExample.vue)
- [/playground/src/RealWorldExample.vue](file:///home/willzhang/code/sphere-ui/playground/src/RealWorldExample.vue)

You can run the playground with:

```bash
cd playground
pnpm run dev
```
