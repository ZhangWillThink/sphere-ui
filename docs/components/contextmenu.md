````markdown
# ContextMenu

ContextMenu displays a contextual menu at a trigger position.

## Basic

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<div class="demo-container">
  <div style="position:relative">
    <Button @click="open = !open">Open Menu</Button>
    <ContextMenu v-if="open" class="mt-2">
      <div class="p-2">Item 1</div>
      <div class="p-2">Item 2</div>
    </ContextMenu>
  </div>
</div>

```vue
<template>
  <Button @click="open = !open">Open Menu</Button>
  <ContextMenu v-if="open">
    <div>Item 1</div>
    <div>Item 2</div>
  </ContextMenu>
</template>
</script>
```
````
