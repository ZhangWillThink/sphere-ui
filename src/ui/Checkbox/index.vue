<script setup lang="ts">
import type { VNodeChild } from 'vue'

import { isVNode, useId, useTemplateRef } from 'vue'

import { Check } from '@icon-park/vue-next'
import { onKeyStroke, useToggle } from '@vueuse/core'

defineOptions({ name: 'SphereCheckbox', inheritAttrs: true })

const { disabled } = defineProps<{
  disabled?: boolean
  description?: VNodeChild
}>()

defineSlots<{
  default?: () => VNodeChild
  description?: () => VNodeChild
}>()

const modelValue = defineModel<boolean>({ required: false, default: false })

const root = useTemplateRef('root')

const id = useId()

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
  <div ref="root" class="flex items-start gap-3" @click="handleToggle">
    <button
      type="button"
      role="checkbox"
      :aria-checked="modelValue"
      :data-state="modelValue ? 'checked' : ''"
      value="on"
      data-slot="checkbox"
      class="border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 cursor-pointer rounded-lg border shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
      :disabled
      :id
    >
      <span
        :data-state="modelValue ? 'checked' : ''"
        data-slot="checkbox-indicator"
        class="pointer-events-none grid place-content-center text-current transition-none"
      >
        <Check v-show="modelValue" size="10" :stroke-width="10" />
      </span>
    </button>

    <div class="grid gap-2">
      <label
        data-slot="label"
        class="disabled:text-primary-foreground/50 text-foreground flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        :for="id"
      >
        <slot name="default" />
      </label>
      <p v-if="description || $slots.description" class="text-muted-foreground text-sm">
        <slot name="description">
          <component v-if="isVNode(description)" :is="description" />
          <template v-else-if="description">{{ description }}</template>
        </slot>
      </p>
    </div>
  </div>
</template>
