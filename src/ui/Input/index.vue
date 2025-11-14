<script setup lang="ts">
import type { BundledLanguage } from 'shiki'
import type { InputTypeHTMLAttribute, VNodeChild } from 'vue'

import { isVNode, useTemplateRef } from 'vue'

import { computedAsync, useScroll } from '@vueuse/core'

import { HighlighterManager } from '../shared/text/highlighter'
import '../shared/text/main.css'

defineOptions({ name: 'SphereInput', inheritAttrs: true })

const { type = 'text', language = 'markdown' } = defineProps<{
  placeholder?: VNodeChild
  language?: BundledLanguage
  type?: InputTypeHTMLAttribute
  disabled?: boolean
}>()

const modelValue = defineModel<any | null>({ required: false })

const paddingClass = 'px-3 py-1'

const input = useTemplateRef('input')

const { x } = useScroll(input)

const html = computedAsync(async () => {
  const result = await HighlighterManager.renderCode(String(modelValue.value ?? ''), language)

  return result
})
</script>

<template>
  <div
    data-slot="input"
    class="text-foreground relative h-9 w-full overflow-hidden rounded-lg font-mono text-base shadow transition-all duration-200 ease-in-out md:text-sm"
  >
    <div
      v-if="!modelValue"
      :class="[
        paddingClass,
        'text-foreground/50 pointer-events-none absolute inset-0 flex size-full h-9 items-center text-nowrap',
      ]"
    >
      <slot name="placeholder">
        <component v-if="isVNode(placeholder)" :is="placeholder" />
        <template v-else-if="placeholder">{{ placeholder }}</template>
      </slot>
    </div>
    <div
      v-else-if="type !== 'password'"
      v-html="html"
      :class="[paddingClass, 'pointer-events-none absolute inset-0 flex size-full items-center']"
      :style="{ transform: `translateX(${-x}px)` }"
    />

    <input
      ref="input"
      v-model="modelValue"
      :disabled
      :class="[
        paddingClass,
        type === 'password' ? 'text-foreground' : 'text-transparent',
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive caret-card-foreground absolute h-9 w-full min-w-0 appearance-none rounded-lg border bg-transparent shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      ]"
      :type
    />
  </div>
</template>
