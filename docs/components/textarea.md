````markdown
# Textarea

Multi-line input field.

## Basic

<script setup>
import { ref } from 'vue'
const text = ref('')
</script>

<div class="demo-container">
  <Textarea v-model="text" placeholder="Write something..." />
  <div class="mt-2">Length: {{ text.length }}</div>
</div>

```vue
<template>
  <Textarea v-model="text" />
</template>
</script>
```
````
