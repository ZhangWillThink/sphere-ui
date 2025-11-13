<script setup lang="ts">
import type { BundledLanguage } from 'shiki'
import type { VNodeChild } from 'vue'

import { isVNode, useTemplateRef, watch } from 'vue'

import { computedAsync, useElementSize, useScroll } from '@vueuse/core'

import { HighlighterManager } from '../shared/text/highlighter'
import '../shared/text/main.css'

defineOptions({ name: 'SphereTextarea', inheritAttrs: true })

const { language = 'markdown', autoResize = true } = defineProps<{
  placeholder?: VNodeChild
  language?: BundledLanguage
  autoResize?: boolean
}>()

const modelValue = defineModel<string | null>({ required: false })

const paddingClass = 'px-3 py-1'

const textarea = useTemplateRef('textarea')
const { height: textareaHeight } = useElementSize(textarea, undefined, { box: 'border-box' })

const { x, y } = useScroll(textarea)

const html = computedAsync(async () => {
  const result = await HighlighterManager.renderCode(modelValue.value ?? '', language)

  return result
})

watch(
  [modelValue, () => autoResize],
  ([, enabled]) => {
    setTimeout(() => {
      if (!enabled || !textarea.value) return
      textarea.value.style.height = 'auto'
      textarea.value.style.height = `${textarea.value.scrollHeight}px`
    })
  },
  { immediate: true },
)
</script>

<template>
  <div
    data-slot="textarea"
    class="text-foreground relative overflow-hidden rounded-lg font-mono text-base shadow transition-all duration-200 ease-in-out md:text-sm"
    :style="{ height: `${textareaHeight}px` }"
  >
    <div
      v-if="!modelValue"
      :class="[
        paddingClass,
        'text-foreground/50 pointer-events-none absolute inset-0 size-full wrap-break-word whitespace-pre-wrap select-none',
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
      data-slot="content"
      :class="[paddingClass, 'scrollbar-hide pointer-events-none absolute inset-0']"
      :style="{ transform: `translate(${-x}px, ${-y}px)` }"
    />

    <textarea
      ref="textarea"
      v-model="modelValue"
      :class="[
        paddingClass,
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 absolute flex field-sizing-content min-h-16 w-full rounded-lg border bg-transparent shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        { 'overflow-hidden': autoResize },
      ]"
      :placeholder="String(placeholder)"
    />
  </div>
</template>
