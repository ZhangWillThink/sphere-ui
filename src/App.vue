<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import { Button, Tabs } from './ui'

defineOptions({ name: 'App' })

const colorMode = useColorMode()
</script>

<template>
  <div class="bg-black/70">
    <Button @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'">Toggle Color Mode</Button>

    <Tabs
      :items="[
        { label: '123', value: 1 },
        { label: '456', value: 2 },
      ]"
    >
      <template #tab-1>
        <div>123</div>
      </template>
      <template #tab-2>
        <div>456</div>
      </template>
    </Tabs>
  </div>
</template>
