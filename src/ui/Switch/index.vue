<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'

import { useTemplateRef } from 'vue'

import { onKeyStroke, useToggle } from '@vueuse/core'
import { cva } from 'class-variance-authority'

defineOptions({ name: 'SphereSwitch', inheritAttrs: true })

const trackClasses = cva(
  [
    'relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300/30',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
      checked: {
        true: 'bg-primary-600 dark:bg-primary-500',
        false: 'bg-gray-200 dark:bg-gray-700',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'md',
      checked: false,
      disabled: false,
    },
  },
)

type TrackProps = VariantProps<typeof trackClasses>

const knobClasses = cva(
  [
    'absolute rounded-full bg-white shadow transition-all duration-200 ease-in-out left-0.5',
    'dark:bg-gray-300',
  ],
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
      },
      checked: {
        true: 'translate-x-[calc(100%)]',
        false: 'translate-x-0',
      },
    },
    defaultVariants: {
      size: 'md',
      checked: false,
    },
  },
)

const { disabled = false, size = 'md' } = defineProps<{
  disabled?: boolean
  size?: TrackProps['size']
}>()

const modelValue = defineModel<boolean>({ required: false, default: false })

const root = useTemplateRef('root')

const toggle = useToggle(modelValue)

const handleClick = () => {
  if (disabled) return
  toggle()
}

onKeyStroke(
  ['Enter', ' '],
  evt => {
    if (disabled) return
    evt.preventDefault()
    evt.stopPropagation()
    toggle()
  },
  { target: root },
)
</script>

<template>
  <div
    v-bind="$attrs"
    ref="root"
    :class="trackClasses({ size, checked: modelValue, disabled })"
    role="switch"
    tabindex="0"
    :aria-checked="modelValue"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <div :class="knobClasses({ size, checked: modelValue })" />
  </div>
</template>
