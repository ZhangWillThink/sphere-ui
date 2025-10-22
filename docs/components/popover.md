````markdown
# Popover

Small overlay for contextual information.

## Basic

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<div class="demo-container">
  <Button @click="open = !open">Toggle</Button>
  <Popover v-model:open="open">
    <div class="p-2">Popover content</div>
  </Popover>
</div>

```vue
<template>
  <Button @click="open = !open">Toggle</Button>
  <Popover v-model:open="open">Popover content</Popover>
</template>
</script>
```
````
