````markdown
# Dialog

Modal dialog for user interactions.

## Basic

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<div class="demo-container">
  <Button @click="open = true">Open Dialog</Button>
  <Dialog v-model:open="open">
    <template #header>Dialog Title</template>
    <div class="p-4">Dialog content goes here.</div>
    <template #footer>
      <Button variant="ghost" @click="open = false">Close</Button>
    </template>
  </Dialog>
</div>

```vue
<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog v-model:open="open">
    <template #header>Dialog Title</template>
    <div>Dialog content</div>
  </Dialog>
</template>
</script>
```
````
