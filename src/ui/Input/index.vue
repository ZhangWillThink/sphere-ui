<script setup lang="ts">
import type { BundledLanguage } from 'shiki'
import type { InputTypeHTMLAttribute, VNodeChild } from 'vue'

import { isVNode, useTemplateRef } from 'vue'

import { computedAsync, useScroll } from '@vueuse/core'

import '../shared/text/main.css'
import { HighlighterManager } from '../shared/text/highlighter'

defineOptions({ name: 'SphereInput', inheritAttrs: true })

const { type = 'text', language = 'markdown' } = defineProps<{
  placeholder?: VNodeChild
  language?: BundledLanguage
  type?: InputTypeHTMLAttribute
}>()

const modelValue = defineModel<string>({ required: false })

const paddingClass = 'px-3 py-2'

const input = useTemplateRef('input')

const { x } = useScroll(input)

const html = computedAsync(async () => {
  const result = await HighlighterManager.renderCode(modelValue.value ?? '', language)

  return result
})
</script>

<template>
  <div
    class="glass text-text-primary hover:glass-light relative h-11 overflow-hidden rounded-lg font-mono shadow transition-all duration-200 ease-in-out focus-within:ring-3 focus-within:ring-blue-300/30"
  >
    <div
      v-if="!modelValue"
      :class="[
        paddingClass,
        'text-text-primary/50 pointer-events-none absolute inset-0 flex size-full h-11 items-center text-nowrap',
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
        type === 'password' ? 'text-text-primary' : 'text-transparent',
        'absolute z-10 h-11 w-full appearance-none bg-transparent outline-none',
        'caret-gray-900 dark:caret-blue-400',
      ]"
      :type
    />
  </div>
</template>
