<script setup lang="ts">
import type { BundledLanguage } from 'shiki'
import type { VNodeChild } from 'vue'

import { isVNode, useTemplateRef, watch } from 'vue'

import { computedAsync, useElementSize, useScroll } from '@vueuse/core'

import '../shared/text/main.css'
import { HighlighterManager } from '../shared/text/hgihtlighter'

defineOptions({ name: 'SphereTextarea', inheritAttrs: true })

const { language = 'markdown', autoResize = true } = defineProps<{
  placeholder?: VNodeChild
  language?: BundledLanguage
  autoResize?: boolean
}>()

const modelValue = defineModel<string>({ required: false })

const paddingClass = 'px-3 py-2'

const textarea = useTemplateRef('textarea')
const { height: textareaHeight } = useElementSize(textarea)

const { x, y } = useScroll(textarea)

const html = computedAsync(async () => {
  const result = await HighlighterManager.renderCode(modelValue.value ?? '', language)

  return result
})

watch(
  [modelValue, () => autoResize],
  ([, enabled]) => {
    if (!enabled || !textarea.value) return

    textarea.value.style.height = 'auto'
    textarea.value.style.height = `${textarea.value.scrollHeight}px`
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="glass text-text-primary hover:glass-light relative min-h-30 overflow-hidden rounded-lg font-mono shadow backdrop-blur-sm transition-all duration-200 ease-in-out focus-within:ring-3 focus-within:ring-blue-300/30"
    :style="{ height: `${textareaHeight}px` }"
  >
    <div
      v-if="!modelValue"
      :class="[
        paddingClass,
        'text-text-primary/50 pointer-events-none absolute inset-0 size-full wrap-break-word whitespace-pre-wrap select-none',
      ]"
    >
      <slot name="placeholder">
        <template v-if="placeholder">
          <component v-if="isVNode(placeholder)" :is="placeholder" />
          <p v-else-if="placeholder">{{ placeholder }}</p>
        </template>
      </slot>
    </div>
    <div
      v-else
      v-html="html"
      :class="[paddingClass, 'scrollbar-hide pointer-events-none absolute inset-0']"
      :style="{
        transform: `translate(${-x}px, ${-y}px)`,
      }"
    />

    <textarea
      ref="textarea"
      v-model="modelValue"
      :class="[
        paddingClass,
        'absolute z-10 min-h-30 w-full resize-none appearance-none bg-transparent text-transparent outline-none',
        'caret-gray-900 dark:caret-blue-400',
        autoResize ? 'overflow-hidden' : '',
      ]"
    />
  </div>
</template>
