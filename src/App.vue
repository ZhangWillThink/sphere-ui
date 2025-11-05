<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import { Markdown, Select, Button } from './ui'

defineOptions({ name: 'App' })

const colorMode = useColorMode()
</script>

<template>
  <div class="bg-black/70">
    <Button @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'">Toggle Color Mode</Button>

    <Markdown content="### Hello, world!" />
    <Select
      :options="[
        { label: '123', value: 1 },
        { label: '456', value: 2 },
      ]"
    />
  </div>
</template>
