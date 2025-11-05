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
        { key: 'item', label: 'Item 1' },
        { key: 2, label: 'Item 2' },
      ]"
    >
      <template #panel-item>
        <div>Content 1</div>
      </template>
      <template #panel-2>
        <div>Content 2</div>
      </template>
    </Collapse>
  </div>
</template>
