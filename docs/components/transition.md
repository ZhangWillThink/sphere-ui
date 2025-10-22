````markdown
# Transition

Utilities for animated transitions. Example uses Collapse/Transition components.

## Example

<script setup>
import { ref } from 'vue'
const open = ref(true)
</script>

<div class="demo-container">
  <Button @click="open = !open">Toggle</Button>
  <Transition>
    <div v-if="open" class="p-3">Animated content</div>
  </Transition>
</div>

```vue
<template>
  <Transition>
    <div v-if="open">Animated content</div>
  </Transition>
</template>
</script>
```
````
