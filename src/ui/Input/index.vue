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
}>()

const modelValue = defineModel<any | null>({ required: false })

const paddingClass = 'px-3 py-2'

const input = useTemplateRef('input')

const { x } = useScroll(input)

const html = computedAsync(async () => {
  const result = await HighlighterManager.renderCode(String(modelValue.value ?? ''), language)

  return result
})
</script>

<template>
  <div
    class="glass text-card-foreground hover:glass-light focus-within:ring-primary-300/30 relative h-11 overflow-hidden rounded-lg font-mono shadow transition-all duration-200 ease-in-out focus-within:ring-3"
  >
    <div
      v-if="!modelValue"
      :class="[
        paddingClass,
        'text-card-foreground/50 pointer-events-none absolute inset-0 flex size-full h-11 items-center text-nowrap',
      ]"
    >
      <slot name="placeholder">
        <template v-if="placeholder">
          <component v-if="isVNode(placeholder)" :is="placeholder" />
          <template v-else>{{ placeholder }}</template>
        </template>
      </slot>
    </div>
    <div
      v-else-if="type !== 'password'"
      v-html="html"
      :class="[
        paddingClass,
        'pointer-events-none absolute inset-0 flex size-full h-11 items-center',
      ]"
      :style="{
        transform: `translateX(${-x}px)`,
      }"
    />

    <input
      ref="input"
      v-model="modelValue"
      :class="[
        paddingClass,
        type === 'password' ? 'text-card-foreground' : 'text-transparent',
        'absolute z-10 h-11 w-full appearance-none bg-transparent outline-none',
        'dark:caret-primary-400 caret-gray-900',
      ]"
      :type
    />
  </div>
</template>
