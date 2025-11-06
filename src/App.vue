<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import { Breadcrumb, Button } from './ui'

defineOptions({ name: 'App' })

const colorMode = useColorMode()
</script>

<template>
  <div class="bg-bg-primary h-svh w-svw">
    <Button variant="primary" @click="colorMode = colorMode === 'light' ? 'dark' : 'light'">
      {{ colorMode === 'light' ? 'Dark' : 'Light' }}
    </Button>

    <Breadcrumb
      :items="[
        { title: 'Home', href: '/' },
        { title: 'About', href: '/about' },
      ]"
    />
  </div>
</template>
