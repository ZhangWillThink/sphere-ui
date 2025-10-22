# TypeScript

Sphere UI is built with TypeScript and provides comprehensive type definitions for all components.

## Type Safety

Sphere UI exports TypeScript types for all components, props, emits, slots, and instances.

## Component Props Types

### Importing Props Types

```typescript
import { Button, type ButtonProps } from 'sphere-ui'
import { Input, type InputProps } from 'sphere-ui'
import { Table, type TableProps } from 'sphere-ui'
```

### Using Props Types

```vue
<script setup lang="ts">
import { Button, type ButtonProps } from 'sphere-ui'
import { ref } from 'vue'

// Define props with proper types
const buttonProps = ref<ButtonProps>({
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

// Type-safe prop updates
const updateVariant = (variant: ButtonProps['variant']) => {
  buttonProps.value.variant = variant
}
</script>

<template>
  <Button v-bind="buttonProps">
    Click Me
  </Button>
</template>
```

## Component Instance Types

Access component instance methods and properties with proper typing.

### Button Instance

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, type ButtonInstance } from 'sphere-ui'

const buttonRef = ref<ButtonInstance>()

const focusButton = () => {
  buttonRef.value?.focus()
}

const blurButton = () => {
  buttonRef.value?.blur()
}
</script>

<template>
  <Button ref="buttonRef">Button</Button>
  <button @click="focusButton">Focus Button</button>
</template>
```

### Input Instance

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Input, type InputInstance } from 'sphere-ui'

const inputRef = ref<InputInstance>()

const operations = {
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
}
</script>

<template>
  <Input ref="inputRef" placeholder="Type here..." />
  <Button @click="operations.focus">Focus</Button>
</template>
```

## Table Types

Working with complex data structures like tables.

### Column Definition

```typescript
import { type TableColumn } from 'sphere-ui'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const columns: TableColumn<User>[] = [
  {
    key: 'id',
    title: 'ID',
    sortable: true,
    width: 80,
  },
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
  },
  {
    key: 'role',
    title: 'Role',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
  },
]
```

### Table Props

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Table, type TableProps, type SortState } from 'sphere-ui'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const tableData = ref<User[]>([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
])

const sortState = ref<SortState>({
  key: 'name',
  order: 'asc',
})

const handleSort = (state: SortState) => {
  sortState.value = state
  // Sort data...
}
</script>

<template>
  <Table
    :columns="columns"
    :data="tableData"
    :sort="sortState"
    @sort="handleSort"
  />
</template>
```

## Event Types

Type-safe event handlers.

### Button Events

```vue
<script setup lang="ts">
import { Button, type ButtonEmits } from 'sphere-ui'

const handleClick: ButtonEmits['click'] = (event) => {
  console.log('Button clicked', event)
}
</script>

<template>
  <Button @click="handleClick">Click Me</Button>
</template>
```

### Table Events

```vue
<script setup lang="ts">
import { type TableEmits, type RowSelection } from 'sphere-ui'

const handleSelectionChange: TableEmits['selection-change'] = (selection) => {
  console.log('Selected rows:', selection)
}

const handleSort: TableEmits['sort'] = (sortState) => {
  console.log('Sort state:', sortState)
}
</script>
```

## Slot Types

Type definitions for component slots.

### Button Slots

```vue
<script setup lang="ts">
import { Button, type ButtonSlots } from 'sphere-ui'
import { defineSlots } from 'vue'

defineSlots<ButtonSlots>()
</script>

<template>
  <Button>
    <template #icon>
      <span>🚀</span>
    </template>
    Launch
  </Button>
</template>
```

## Generic Components

Working with generic component types.

### Custom Table Component

```vue
<script setup lang="ts" generic="T extends Record<string, any>">
import { Table, type TableColumn } from 'sphere-ui'

interface Props {
  data: T[]
  columns: TableColumn<T>[]
}

defineProps<Props>()
</script>

<template>
  <Table :data="data" :columns="columns" />
</template>
```

### Usage

```vue
<script setup lang="ts">
import CustomTable from './CustomTable.vue'

interface Product {
  id: number
  name: string
  price: number
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 99 },
  { id: 2, name: 'Product 2', price: 149 },
]

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name' },
  { key: 'price', title: 'Price' },
]
</script>

<template>
  <CustomTable :data="products" :columns="columns" />
</template>
```

## Enum Types

Using TypeScript enums with components.

### Button Variants

```typescript
export enum ButtonVariant {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Outline = 'outline',
  Ghost = 'ghost',
  Danger = 'danger',
}

export enum ButtonSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}
```

### Usage

```vue
<script setup lang="ts">
import { Button } from 'sphere-ui'

enum ButtonVariant {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
}

const variant = ButtonVariant.Primary
</script>

<template>
  <Button :variant="variant">Button</Button>
</template>
```

## Utility Types

Useful utility types for working with Sphere UI.

### Extract Component Props

```typescript
import { type ComponentProps } from 'vue'
import { Button } from 'sphere-ui'

type ButtonProps = ComponentProps<typeof Button>

// Use in your code
const props: ButtonProps = {
  variant: 'primary',
  size: 'md',
}
```

### Partial Props

```typescript
import { type ButtonProps } from 'sphere-ui'

// Make all props optional
type PartialButtonProps = Partial<ButtonProps>

const partialProps: PartialButtonProps = {
  variant: 'primary',
  // size is optional
}
```

### Required Props

```typescript
import { type ButtonProps } from 'sphere-ui'

// Make all props required
type RequiredButtonProps = Required<ButtonProps>
```

## Type Guards

Creating type guards for component types.

```typescript
import { type TableColumn } from 'sphere-ui'

function isTableColumn<T>(column: any): column is TableColumn<T> {
  return (
    typeof column === 'object' &&
    'key' in column &&
    'title' in column
  )
}

// Usage
const column = { key: 'name', title: 'Name' }
if (isTableColumn(column)) {
  // TypeScript knows column is TableColumn
  console.log(column.key, column.title)
}
```

## Composable Types

Type definitions for composables.

```typescript
import { ref, type Ref } from 'vue'
import { type ButtonProps } from 'sphere-ui'

interface UseButtonOptions {
  initialVariant?: ButtonProps['variant']
  initialSize?: ButtonProps['size']
}

interface UseButtonReturn {
  variant: Ref<ButtonProps['variant']>
  size: Ref<ButtonProps['size']>
  setVariant: (variant: ButtonProps['variant']) => void
  setSize: (size: ButtonProps['size']) => void
}

export function useButton(options: UseButtonOptions = {}): UseButtonReturn {
  const variant = ref<ButtonProps['variant']>(options.initialVariant || 'default')
  const size = ref<ButtonProps['size']>(options.initialSize || 'md')

  const setVariant = (newVariant: ButtonProps['variant']) => {
    variant.value = newVariant
  }

  const setSize = (newSize: ButtonProps['size']) => {
    size.value = newSize
  }

  return {
    variant,
    size,
    setVariant,
    setSize,
  }
}
```

### Usage

```vue
<script setup lang="ts">
import { Button } from 'sphere-ui'
import { useButton } from './composables/useButton'

const { variant, size, setVariant, setSize } = useButton({
  initialVariant: 'primary',
  initialSize: 'lg',
})
</script>

<template>
  <Button :variant="variant" :size="size">
    Dynamic Button
  </Button>
</template>
```

## Declaration Files

Create custom declaration files for global types.

### Global Types

```typescript
// types/sphere-ui.d.ts
import 'vue'
import type { ButtonProps, InputProps, TableProps } from 'sphere-ui'

declare module 'vue' {
  interface GlobalComponents {
    Button: typeof import('sphere-ui')['Button']
    Input: typeof import('sphere-ui')['Input']
    Table: typeof import('sphere-ui')['Table']
    // Add other components...
  }
}

export {}
```

### Auto-Import Types

```typescript
// types/auto-imports.d.ts
export {}

declare global {
  const Button: typeof import('sphere-ui')['Button']
  const Input: typeof import('sphere-ui')['Input']
  const Table: typeof import('sphere-ui')['Table']
}
```

## Best Practices

### 1. Always Import Types

```typescript
// Good
import { Button, type ButtonProps } from 'sphere-ui'

// Avoid
import { Button, ButtonProps } from 'sphere-ui'
```

### 2. Use Const Assertions

```typescript
// Good
const variants = ['primary', 'secondary', 'outline'] as const
type Variant = typeof variants[number]

// Better type safety
const variant: Variant = 'primary' // ✓
const invalid: Variant = 'invalid' // ✗ Type error
```

### 3. Define Interfaces for Complex Data

```typescript
// Good
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

const users: User[] = []

// Avoid
const users: any[] = []
```

### 4. Use Generic Constraints

```typescript
// Good
function processData<T extends Record<string, any>>(data: T): T {
  return data
}

// Type-safe
const result = processData({ id: 1, name: 'John' })
```

### 5. Leverage Type Inference

```typescript
// Good - Let TypeScript infer
const columns = [
  { key: 'id', title: 'ID', sortable: true },
  { key: 'name', title: 'Name' },
]

// Unnecessary - Explicit type when inference works
const columns: TableColumn[] = [
  { key: 'id', title: 'ID', sortable: true },
]
```

## Troubleshooting

### Module Resolution

If TypeScript can't find Sphere UI types:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "types": ["vite/client"],
    "skipLibCheck": false
  }
}
```

### Missing Types

If component types are missing:

```bash
# Reinstall packages
rm -rf node_modules
npm install

# Clear TypeScript cache
rm -rf node_modules/.cache
```

### Type Errors

If you encounter type errors:

```typescript
// Use type assertion as a last resort
const props = ref({
  variant: 'primary'
} as ButtonProps)

// Or use unknown first
const data = response as unknown as TableData
```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Vue 3 TypeScript Guide](https://vuejs.org/guide/typescript/overview.html)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

## Next Steps

- Explore [Components](/components/button)
- Learn about [Theming](/guide/theming)
- Check out [Best Practices](/guide/best-practices)