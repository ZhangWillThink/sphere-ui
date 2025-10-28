<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { VNodeChild } from 'vue'

import { CloseSmall } from '@icon-park/vue-next'
import { cva } from 'class-variance-authority'

defineOptions({ name: 'SphereTag', inheritAttrs: true })

const tag = cva(
  'glass inline-flex flex-shrink-0 items-center gap-1 rounded-lg whitespace-nowrap shadow transition-all duration-200 ease-in-out',
  {
    variants: {
      size: {
        sm: 'px-1.5 py-0.5 text-xs',
        md: 'px-2 py-0.5 text-xs',
        lg: 'px-2.5 py-1 text-sm',
      },
      variant: {
        default:
          'bg-white/20 text-gray-800 backdrop-blur-sm border border-white/30 dark:bg-gray-900/20 dark:text-gray-100 dark:border-gray-700/30',
        primary:
          'bg-blue-500/20 text-blue-800 backdrop-blur-sm border border-blue-300/30 dark:bg-blue-900/20 dark:text-blue-100 dark:border-blue-700/30',
        success:
          'bg-green-500/20 text-green-800 backdrop-blur-sm border border-green-300/30 dark:bg-green-900/20 dark:text-green-100 dark:border-green-700/30',
        warning:
          'bg-yellow-500/20 text-yellow-800 backdrop-blur-sm border border-yellow-300/30 dark:bg-yellow-900/20 dark:text-yellow-100 dark:border-yellow-700/30',
        error:
          'bg-red-500/20 text-red-800 backdrop-blur-sm border border-red-300/30 dark:bg-red-900/20 dark:text-red-100 dark:border-red-700/30',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
)

type TagProps = VariantProps<typeof tag>

const {
  removable = false,
  size = 'md',
  variant = 'primary',
} = defineProps<{
  removable?: boolean
  size?: TagProps['size']
  variant?: TagProps['variant']
}>()

defineSlots<{
  default: () => VNodeChild
}>()

const emit = defineEmits<{ remove: [] }>()

const handleRemove = () => {
  emit('remove')
}
</script>

<template>
  <span v-bind="$attrs" :class="tag({ size, variant })">
    <span class="max-w-30 truncate">
      <slot name="default" />
    </span>

    <button
      v-if="removable"
      type="button"
      class="rounded-full p-0.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
      tabindex="-1"
      @click.stop="handleRemove"
    >
      <CloseSmall />
    </button>
  </span>
</template>
