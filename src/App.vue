<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import { Tag, Button } from './ui'

defineOptions({ name: 'App' })

const colorMode = useColorMode()
</script>

<template>
  <div class="bg-bg-primary h-svh w-svw">
    <Button variant="primary" @click="colorMode = colorMode === 'light' ? 'dark' : 'light'">
      {{ colorMode === 'light' ? 'Dark' : 'Light' }}
    </Button>

    <Tag variant="primary">Primary</Tag>
    <Tag variant="success">Success</Tag>
    <Tag variant="warning">Warning</Tag>
    <Tag variant="error">Error</Tag>
    <Tag variant="default">Default</Tag>
  </div>
</template>
