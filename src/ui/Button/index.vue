<script lang="ts">
const button = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary backdrop-blur-lg text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonVariant = VariantProps<typeof button>
</script>

<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { VNodeChild } from 'vue'

import { isVNode } from 'vue'

import { cva } from 'class-variance-authority'

import Loading from '../Loading/index.vue'

defineOptions({ name: 'SphereButton', inheritAttrs: true })

const {
  size = 'default',
  variant = 'default',
  loading,
  disabled,
  icon,
} = defineProps<{
  size?: ButtonVariant['size']
  variant?: ButtonVariant['variant']
  loading?: boolean
  disabled?: boolean
  icon?: VNodeChild
}>()

const slot = defineSlots<{
  default?: () => VNodeChild
  icon?: () => VNodeChild
}>()

const emit = defineEmits<{
  click: [Event]
}>()

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
    :class="button({ size: slot?.default ? size : slot?.icon || icon ? 'icon' : size, variant })"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <Loading v-if="loading" size="sm" />
    <slot name="icon">
      <component v-if="isVNode(icon)" :is="icon" />
    </slot>

    <slot name="default" />
  </button>
</template>
