<script setup lang="ts">
import { Breadcrumb } from './ui'

defineOptions({ name: 'App' })
</script>

<template>
  <Breadcrumb
    :items="[
      { title: 'Home' },
      { title: 'Products', href: '/products' },
      { title: 'Electronics', href: '/products/electronics' },
    ]"
  />
</template>
