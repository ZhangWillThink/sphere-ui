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
        default: 'bg-gray-100/80! text-gray-800 dark:bg-gray-700/80 dark:text-gray-200',
        primary: 'bg-blue-100/80! text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
        success: 'bg-green-100/80! text-green-800 dark:bg-green-900/20 dark:text-green-200',
        warning: 'bg-yellow-100/80! text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
        error: 'bg-red-100/80! text-red-800 dark:bg-red-900/20 dark:text-red-200',
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
