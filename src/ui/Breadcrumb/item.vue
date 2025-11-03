<script setup lang="ts">
import type { BreadcrumbItemProps, BreadcrumbItemSlots } from './types'

defineOptions({ name: 'SphereBreadcrumbItem' })

const { onClick } = defineProps<BreadcrumbItemProps>()

defineSlots<BreadcrumbItemSlots>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (onClick) {
    onClick(event)
  }
  emit('click', event)
}
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    v-bind="href ? { href } : {}"
    :class="[
      href
        ? 'cursor-pointer text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
        : 'text-text-primary dark:text-text-primary',
      $props.class || '',
    ]"
    @click="handleClick"
  >
    <slot name="default" />
  </component>
</template>
