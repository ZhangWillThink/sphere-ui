# Button

Button components are used to trigger actions and events with various styles and states.

## Basic Usage

The most basic button with different variants.

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<div class="demo-container">
  <div class="flex flex-wrap gap-3">
    <Button variant="default">Default</Button>
    <Button variant="primary">Primary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive">Destructive</Button>
  </div>
</div>

```vue
<template>
  <Button variant="default">Default</Button>
  <Button variant="primary">Primary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Destructive</Button>
</template>
```

## Sizes

Buttons come in different sizes: `sm`, `md`, and `lg`.

<div class="demo-container">
  <div class="flex flex-wrap items-center gap-3">
    <Button size="sm" variant="primary">Small</Button>
    <Button size="md" variant="primary">Medium</Button>
    <Button size="lg" variant="primary">Large</Button>
  </div>
</div>

```vue
<template>
  <Button size="sm" variant="primary">Small</Button>
  <Button size="md" variant="primary">Medium</Button>
  <Button size="lg" variant="primary">Large</Button>
</template>
```

## Disabled State

Buttons can be disabled to prevent user interaction.

<div class="demo-container">
  <div class="flex flex-wrap gap-3">
    <Button disabled variant="default">Default Disabled</Button>
    <Button disabled variant="primary">Primary Disabled</Button>
    <Button disabled variant="ghost">Ghost Disabled</Button>
  </div>
</div>

```vue
<template>
  <Button disabled variant="default">Default Disabled</Button>
  <Button disabled variant="primary">Primary Disabled</Button>
</template>
```

## Loading State

Show a loading indicator when an async action is in progress.

<script setup>
const loading = ref(false)

const handleAsyncClick = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  loading.value = false
}
</script>

<div class="demo-container">
  <div class="flex flex-wrap gap-3">
    <Button loading variant="primary">Loading</Button>
    <Button :loading="loading" variant="primary" @click="handleAsyncClick">
      {{ loading ? 'Processing...' : 'Click to Load' }}
    </Button>
  </div>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)

const handleClick = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  loading.value = false
}
</script>

<template>
  <Button :loading="loading" @click="handleClick">
    {{ loading ? 'Processing...' : 'Click to Load' }}
  </Button>
</template>
```

## With Icons

Buttons can contain icons using the icon slot.

<div class="demo-container">
  <div class="flex flex-wrap gap-3">
    <Button variant="primary">
      <template #icon>
        <span>🚀</span>
      </template>
      Launch
    </Button>
    <Button variant="default">
      <template #icon>
        <span>❤️</span>
      </template>
      Like
    </Button>
    <Button variant="destructive">
      <template #icon>
        <span>🗑️</span>
      </template>
      Delete
    </Button>
  </div>
</div>

```vue
<template>
  <Button variant="primary">
    <template #icon>
      <span>🚀</span>
    </template>
    Launch
  </Button>
</template>
```

## Interactive Counter

A practical example showing button click handling.

<div class="demo-container">
  <div class="flex flex-col items-center gap-4">
    <div class="text-4xl font-bold">{{ count }}</div>
    <div class="flex gap-3">
      <Button variant="destructive" @click="count--" :disabled="count <= 0">
        Decrease
      </Button>
      <Button variant="ghost" @click="count = 0">
        Reset
      </Button>
      <Button variant="primary" @click="count++">
        Increase
      </Button>
    </div>
  </div>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="text-4xl font-bold">{{ count }}</div>
    <div class="flex gap-3">
      <Button variant="destructive" @click="count--" :disabled="count <= 0">
        Decrease
      </Button>
      <Button variant="ghost" @click="count = 0">
        Reset
      </Button>
      <Button variant="primary" @click="count++">
        Increase
      </Button>
    </div>
  </div>
</template>
```

## All Variants Showcase

Complete overview of all button variants and sizes.

<div class="demo-container">
  <div class="space-y-4">
    <div>
      <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Primary Variant</h4>
      <div class="flex flex-wrap gap-2">
        <Button size="sm" variant="primary">Small Primary</Button>
        <Button size="md" variant="primary">Medium Primary</Button>
        <Button size="lg" variant="primary">Large Primary</Button>
      </div>
    </div>

    <div>
      <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Default Variant</h4>
      <div class="flex flex-wrap gap-2">
        <Button size="sm" variant="default">Small Default</Button>
        <Button size="md" variant="default">Medium Default</Button>
        <Button size="lg" variant="default">Large Default</Button>
      </div>
    </div>

    <div>
      <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Ghost Variant</h4>
      <div class="flex flex-wrap gap-2">
        <Button size="sm" variant="ghost">Small Ghost</Button>
        <Button size="md" variant="ghost">Medium Ghost</Button>
        <Button size="lg" variant="ghost">Large Ghost</Button>
      </div>
    </div>

    <div>
      <h4 class="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Destructive Variant</h4>
      <div class="flex flex-wrap gap-2">
        <Button size="sm" variant="destructive">Small Destructive</Button>
        <Button size="md" variant="destructive">Medium Destructive</Button>
        <Button size="lg" variant="destructive">Large Destructive</Button>
      </div>
    </div>
  </div>
</div>

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'ghost' \| 'destructive'` | `'default'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Show loading state |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `click` | `(event: Event) => void` | Emitted when button is clicked (not emitted when disabled or loading) |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Button content |
| `icon` | Icon to display before the text |

## TypeScript

```typescript
import { Button, type ButtonProps } from 'sphere-ui'
import { ref } from 'vue'

// Using props type
const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
}
```

## Accessibility

The Button component follows accessibility best practices:

- Uses native `<button>` element for proper semantics
- Supports keyboard navigation (Enter and Space keys)
- Automatically prevents interaction when disabled or loading
- Focus visible styles for keyboard navigation
- Click events are properly blocked during disabled/loading states

## Best Practices

1. **Use appropriate variants**:
   - Use `primary` for the main action
   - Use `default` for secondary actions
   - Use `ghost` for tertiary actions
   - Use `destructive` for dangerous actions (delete, remove, etc.)

2. **Provide clear labels**: Button text should clearly describe the action

3. **Loading states**: Always show loading state for async operations

4. **Disable when needed**: Disable buttons when actions are not available

5. **Icon usage**: Use icons to enhance understanding, not replace text
