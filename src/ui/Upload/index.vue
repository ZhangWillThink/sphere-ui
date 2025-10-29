<script setup lang="ts">
import type { VNodeChild } from 'vue'

import { Upload } from '@icon-park/vue-next'
import { useFileDialog, useToggle } from '@vueuse/core'

import { Button } from '../..'

defineOptions({ name: 'SphereUpload', inheritAttrs: true })

const { accept, onChange } = defineProps<{
  accept?: string
  onChange?: (files: FileList | null) => Promise<void>
}>()

const slot = defineSlots<{
  default: () => VNodeChild
}>()

const { open, onChange: onFileDialogChange } = useFileDialog({ accept })

const [loading, toggleLoading] = useToggle(false)

onFileDialogChange(files => {
  try {
    toggleLoading(true)
    onChange?.(files)
  } catch (error) {
    console.error(error)
  } finally {
    toggleLoading(false)
  }
})
</script>

<template>
  <Button v-bind="$attrs" :loading @click="open()">
    <template #icon>
      <Upload />
    </template>
    <template v-if="slot.default">
      <slot name="default" />
    </template>
    <span v-else>Upload</span>
  </Button>
</template>
