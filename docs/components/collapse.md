````markdown
# Collapse

Collapse is used to show and hide content with an animated transition.

## Basic

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<div class="demo-container">
  <Button @click="open = !open">Toggle</Button>
  <Collapse :open="open" class="mt-3">
    <div class="p-3 bg-gray-50">Hidden content revealed.</div>
  </Collapse>
</div>

```vue
<template>
  <Button @click="open = !open">Toggle</Button>
  <Collapse :open="open">
    <div class="p-3">Hidden content revealed.</div>
  </Collapse>
</template>
</script>
```
````

## Props

| Prop   | Type      | Default | Description         |
| ------ | --------- | ------- | ------------------- |
| `open` | `boolean` | `false` | Controls open state |

```

```
