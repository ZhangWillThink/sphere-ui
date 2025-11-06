<script lang="ts">
const button = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2.5 leading-6 transition-all duration-150 ease-in-out select-none focus-visible:outline-none disabled:scale-100 disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-700 disabled:shadow-none disabled:dark:bg-gray-700 disabled:dark:text-gray-200',
  {
    variants: {
      size: {
        sm: 'text-xs px-3 py-1.5 rounded-md',
        md: 'text-sm px-4 py-2 rounded-lg',
        lg: 'text-base px-5 py-2.5 rounded-xl',
        icon: 'p-2.5 rounded-lg',
      },
      variant: {
        primary: [
          'bg-blue-600 text-white shadow-md',
          'hover:bg-blue-700',
          'active:bg-blue-800 active:shadow-sm active:scale-[0.99]',
          'focus-visible:ring-4 focus-visible:ring-blue-300',
          'dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700',
          'dark:focus-visible:ring-blue-300',
        ],
        default: [
          'glass text-text-primary shadow',
          'hover:glass-light',
          'active:shadow-none active:scale-[0.99]',
          'focus-visible:ring-4 focus-visible:ring-blue-300',
          'dark:text-text-primary',
        ],
        ghost: [
          'bg-transparent text-text-primary',
          'hover:glass',
          'active:scale-[0.99]',
          'focus-visible:ring-4 focus-visible:ring-blue-300',
          'dark:text-text-primary',
        ],
        destructive: [
          'bg-red-600 text-white shadow-md',
          'hover:bg-red-700',
          'active:bg-red-800 active:shadow-sm active:scale-[0.99]',
          'focus-visible:ring-4 focus-visible:ring-red-300',
          'dark:bg-red-500 dark:hover:bg-red-600',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
)
</script>

<script setup lang="ts">
import type { ButtonProps, ButtonSlots, ButtonEmits } from './types'

import { cva } from 'class-variance-authority'

import Loading from '../Loading/index.vue'

defineOptions({ name: 'SphereButton', inheritAttrs: true })

const { size = 'md', variant = 'default', loading, disabled } = defineProps<ButtonProps>()

const slot = defineSlots<ButtonSlots>()

const emit = defineEmits<ButtonEmits>()

const handleClick = (evt: Event) => {
  if (disabled || loading) {
    evt.preventDefault()
    evt.stopPropagation()
    return
  }
  emit('click', evt)
}
</script>

<template>
  <button
    v-bind="$attrs"
    :class="button({ size, variant })"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <Loading v-if="loading" size="sm" />
    <slot v-else-if="slot.icon" name="icon" />

    <slot name="default" />
  </button>
</template>
