<script setup lang="ts">
defineOptions({ name: 'SphereBreadcrumbSeparator' })

defineProps<{
  /**
   * Custom separator content
   */
  children?: string
}>()

defineSlots<{
  /**
   * Custom separator content
   */
  default?: () => any
}>()
</script>

<template>
  <span class="text-text-secondary mx-2">
    <slot name="default">{{ children }}</slot>
  </span>
</template>
