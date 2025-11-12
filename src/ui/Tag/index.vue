<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { VNodeChild } from 'vue'

import { CloseSmall } from '@icon-park/vue-next'
import { cva } from 'class-variance-authority'

defineOptions({ name: 'SphereTag', inheritAttrs: true })

const tag = cva(
  'inline-flex items-center border-border justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type TagProps = VariantProps<typeof tag>

const { removable = false, variant = 'default' } = defineProps<{
  removable?: boolean
  variant?: TagProps['variant']
}>()

defineSlots<{
  default: () => VNodeChild
}>()

const emit = defineEmits<{ remove: [] }>()

const handleRemove = () => emit('remove')
</script>

<template>
  <span v-bind="$attrs" data-slot="tag" :class="tag({ variant })">
    <span class="truncate">
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
