````markdown
# Pagination

Pagination controls for navigating pages.

## Basic

<script setup>
import { ref } from 'vue'
const page = ref(1)
</script>

<div class="demo-container">
  <Pagination v-model:page="page" :total="50" />
  <div class="mt-2">Page: {{ page }}</div>
</div>

```vue
<template>
  <Pagination v-model:page="page" :total="50" />
</template>
</script>
```
````
