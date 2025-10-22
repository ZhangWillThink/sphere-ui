````markdown
# Checkbox

Checkboxes allow users to select one or more items from a set.

## Basic

<script setup>
import { ref } from 'vue'
const checked = ref(true)
</script>

<div class="demo-container">
  <Checkbox v-model="checked">Accept terms</Checkbox>
  <div class="mt-2">Checked: {{ checked }}</div>
</div>

```vue
<template>
  <Checkbox v-model="checked">Accept terms</Checkbox>
  <div>Checked: {{ checked }}</div>
</template>
</script>
```
````

## API

| Prop         | Type      | Default | Description              |
| ------------ | --------- | ------- | ------------------------ |
| `modelValue` | `boolean` | `false` | Controlled checked state |

```

```
