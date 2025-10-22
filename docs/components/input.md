````markdown
# Input

Text input with v-model support.

## Basic

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>

<div class="demo-container">
  <Input v-model="value" placeholder="Type here" />
  <div class="mt-2">Value: {{ value }}</div>
</div>

```vue
<template>
  <Input v-model="value" placeholder="Type here" />
</template>
</script>
```
````
