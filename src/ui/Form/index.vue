<script setup lang="ts">
import type { VNodeChild } from 'vue'

import { useFormProvider } from './context'

defineOptions({ name: 'SphereForm', inheritAttrs: true })

defineSlots<{
  default?: () => VNodeChild
}>()

const emit = defineEmits<{
  submit: [SubmitEvent]
  submitFail: [SubmitEvent]
}>()

const modelValue = defineModel<Record<string, any>>({ required: false })

const { handleValidate } = useFormProvider({ value: modelValue.value })

const handleSubmit = (evt: SubmitEvent) => {
  evt.preventDefault()
  const valid = handleValidate()

  if (valid) {
    emit('submit', evt)
  } else {
    emit('submitFail', evt)
  }
}
</script>

<template>
  <form v-bind="$attrs" class="space-y-4" @submit="handleSubmit">
    <slot name="default" />
  </form>
</template>
