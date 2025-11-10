<script setup lang="ts">
import type { VNodeChild } from 'vue'

import { isVNode } from 'vue'

defineOptions({ name: 'SphereLoading', inheritAttrs: true })

const classes = {
  sm: 'size-4 border-2',
  md: 'size-8 border-[3px]',
  lg: 'size-12 border-4',
} as const

const { size = 'md', fullscreen = false } = defineProps<{
  message?: VNodeChild
  size?: keyof typeof classes
  fullscreen?: boolean
}>()
</script>

<template>
  <div
    v-bind="$attrs"
    :class="
      fullscreen ? 'fixed inset-0 z-50 grid place-items-center p-6' : 'flex items-center gap-3'
    "
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <div
      :class="
        fullscreen
          ? 'glass flex items-center gap-4 rounded-lg border p-6 shadow-sm dark:shadow-lg dark:shadow-black/20'
          : 'flex items-center gap-3'
      "
    >
      <span
        :class="[
          'border-t-primary-600 dark:border-t-primary-400 inline-block animate-spin rounded-full border-gray-300 dark:border-gray-700',
          classes[size],
        ]"
      />
      <span v-if="message" class="text-text-primary/90 text-sm sm:text-base">
        <component v-if="isVNode(message)" :is="message" />
        <template v-else-if="message">{{ message }}</template>
      </span>
    </div>
  </div>
</template>
