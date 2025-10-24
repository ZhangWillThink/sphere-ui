<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { VNodeChild } from 'vue'

import { isVNode, useTemplateRef } from 'vue'

import { Check } from '@icon-park/vue-next'
import { onKeyStroke, useToggle } from '@vueuse/core'
import { cva } from 'class-variance-authority'

defineOptions({ name: 'UiCheckbox', inheritAttrs: true })

const checkbox = cva(
  'relative inline-flex transform-gpu items-center justify-center rounded border-2 transition-all duration-200 ease-in-out will-change-transform focus-within:ring-4 focus-within:ring-blue-300/30',
  {
    variants: {
      size: {
        sm: 'size-4 text-xs',
        md: 'size-5 text-sm',
        lg: 'size-6 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

type CheckProps = VariantProps<typeof checkbox>

const {
  disabled,
  size = 'md',
  label,
} = defineProps<{
  label?: string
  disabled?: boolean
  size?: CheckProps['size']
  description?: VNodeChild
}>()

const slot = defineSlots<{
  default?: () => VNodeChild
  description?: () => VNodeChild
}>()

const modelValue = defineModel<boolean>({ required: false })

const root = useTemplateRef('root')

const toggle = useToggle(modelValue)

const handleToggle = () => {
  if (disabled) return
  toggle()
}

// 键盘事件处理
onKeyStroke(
  ['Enter', ' '],
  evt => {
    evt.stopPropagation()
    evt.preventDefault()
    handleToggle()
  },
  { target: root },
)
</script>

<template>
  <label
    v-bind="$attrs"
    ref="root"
    :class="[
      'inline-flex cursor-pointer items-center gap-3 select-none',
      'transition-all duration-200 ease-in-out',
      'hover:text-foreground/90',
      disabled ? 'cursor-not-allowed opacity-50' : '',
    ]"
    :aria-disabled="disabled"
    :aria-describedby="String(description) || label || 'checkbox'"
    tabindex="0"
  >
    <div
      :class="[
        checkbox({ size }),
        modelValue
          ? 'border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-600'
          : 'border-gray-300 dark:border-gray-600 dark:bg-gray-800/50',
        disabled
          ? 'border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800'
          : 'hover:scale-105 active:scale-95 dark:hover:border-blue-500',
      ]"
    >
      <input
        v-bind="$attrs"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :aria-label="label"
        :aria-describedby="description ? `${$attrs.id || 'checkbox'}-description` : undefined"
        class="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        @change="handleToggle"
      />

      <Check
        v-if="modelValue"
        :strokeWidth="7"
        class="font-bold transition-all duration-200 ease-out"
      />
    </div>

    <div class="flex flex-1 flex-col">
      <div class="text-foreground font-medium">
        <slot name="default" />
      </div>

      <div
        v-if="description || slot.description"
        :id="`${$attrs.id || 'checkbox'}-description`"
        class="text-muted-foreground mt-1 text-sm"
      >
        <slot name="description">
          <template v-if="description">
            <component v-if="isVNode(description)" :is="description" />
            <template v-else>{{ description }}</template>
          </template>
        </slot>
      </div>
    </div>
  </label>
</template>
