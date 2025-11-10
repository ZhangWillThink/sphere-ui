<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import { Button, Select } from './ui'

defineOptions({ name: 'App' })

const colorMode = useColorMode()
</script>

<template>
  <div class="bg-bg-primary h-svh w-svw">
    <Button variant="primary" @click="colorMode = colorMode === 'light' ? 'dark' : 'light'">
      {{ colorMode === 'light' ? 'Dark' : 'Light' }}
    </Button>

    <div class="w-1/2">
      <Select
        :options="[
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 },
        ]"
      />
    </div>
  </div>
</template>
