<script setup lang="ts">
import type { BundledLanguage } from 'shiki'

import { computedAsync } from '@vueuse/core'

import { HighlighterManager } from '../shared/text/highlighter'

defineOptions({ name: 'SphereMarkdown', inheritAttrs: true })

const { content, language = 'markdown' } = defineProps<{
  content: string
  language?: BundledLanguage
}>()

const html = computedAsync(async () => {
  const result = await HighlighterManager.renderCode(content, language)
  return result
}, '')
</script>

<template>
  <div v-html="html" />
</template>
