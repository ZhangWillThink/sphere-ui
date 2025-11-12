<script setup lang="ts">
import type { VNodeChild } from 'vue'

import { isVNode, shallowRef, useTemplateRef } from 'vue'

import { onKeyStroke, watchOnce } from '@vueuse/core'

import { Button } from '..'

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

watchOnce(modelValue, v => {
  focusedIndex.value = options.findIndex(opt => opt.value === v)
})
</script>

<template>
  <div v-bind="$attrs" ref="root" class="inline-flex rounded-lg p-px shadow" role="group">
    <Button
      v-for="(option, index) in options"
      :key="index"
      :variant="isSelected(option.value) ? 'default' : 'ghost'"
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
    </Button>
  </div>
</template>
