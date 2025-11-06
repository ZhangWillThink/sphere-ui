<script setup lang="ts">
import type { VNodeChild } from 'vue'

import { isVNode, shallowRef, useTemplateRef } from 'vue'

import { onKeyStroke, watchOnce } from '@vueuse/core'

defineOptions({ name: 'SphereRadio', inheritAttrs: true })

const { options, disabled } = defineProps<{
  options: Array<{ label: VNodeChild; value: any; disabled?: boolean }>
  disabled?: boolean
}>()

const modelValue = defineModel<any>({ required: true })

const root = useTemplateRef('root')

const focusedIndex = shallowRef<number>(-1)

function moveFocus(dir: 1 | -1) {
  if (!options || !options.length) return
  let i = focusedIndex.value
  const len = options.length
  for (let attempts = 0; attempts < len; attempts++) {
    i = (i + dir + len) % len
    const candidate = options[i]
    if (candidate && !(candidate.disabled || disabled)) {
      focusedIndex.value = i
      break
    }
  }
}

function onKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      e.preventDefault()
      moveFocus(1)
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault()
      moveFocus(-1)
      break
    case 'Home':
      e.preventDefault()
      focusedIndex.value = 0
      break
    case 'End':
      e.preventDefault()
      focusedIndex.value = options.length - 1
      break
    case 'Enter':
    case ' ':
      e.preventDefault()
      if (focusedIndex.value >= 0) {
        const opt = options[focusedIndex.value]
        if (opt && !opt.disabled) handleChange(opt.value)
      }
      break
  }
}

const handleChange = (value: any) => {
  if (disabled) return
  modelValue.value = value
}

const isSelected = (value: any) => modelValue.value === value

onKeyStroke(
  ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End', 'Enter'],
  onKeydown,
  { target: root },
)

watchOnce(
  () => modelValue.value,
  v => {
    focusedIndex.value = options.findIndex(opt => opt.value === v)
  },
)
</script>

<template>
  <div
    ref="root"
    class="glass inline-flex rounded-lg shadow dark:shadow-lg dark:shadow-black/20"
    role="group"
  >
    <button
      v-for="(option, index) in options"
      :key="index"
      :class="[
        'flex items-center px-3 py-2 text-sm font-medium transition-all duration-150 ease-in-out outline-none',
        index === 0 ? 'rounded-l-lg' : index === options.length - 1 ? 'rounded-r-lg' : '',
        isSelected(option.value)
          ? 'bg-blue-600/80 text-white shadow-inner dark:bg-blue-600 dark:shadow-blue-900/30'
          : 'text-text-primary border-transparent bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50',
        option.disabled || disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        focusedIndex === index ? 'ring-4 ring-blue-400/30' : '',
      ]"
      type="button"
      role="radio"
      :aria-checked="isSelected(option.value)"
      :tabindex="option.disabled || disabled ? -1 : 0"
      @click="
        () => {
          if (!option.disabled && !disabled) handleChange(option.value)
        }
      "
      @focus="focusedIndex = index"
      @blur="focusedIndex = -1"
    >
      <span class="flex items-center gap-2">
        <component v-if="isVNode(option.label)" :is="option.label" />
        <template v-else-if="option.label">{{ option.label }}</template>
      </span>
    </button>
  </div>
</template>
