<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import { Button, Collapse } from './ui'

defineOptions({ name: 'App' })

const colorMode = useColorMode()
</script>

<template>
  <div class="bg-bg-primary h-svh w-svw">
    <Button variant="primary" @click="colorMode = colorMode === 'light' ? 'dark' : 'light'">
      {{ colorMode === 'light' ? 'Dark' : 'Light' }}
    </Button>

    <Collapse
      :items="[
        { key: 1, label: 'Item 1', children: 'Content 1' },
        { key: 2, label: 'Item 2', children: 'Content 2' },
      ]"
    >
    </Collapse>
  </div>
</template>
