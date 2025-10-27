<script setup lang="ts">
import type { FormRule } from './type'
import type { VNodeChild } from 'vue'

import { computed, isVNode, watch } from 'vue'

import { useFormContext } from './context'

defineOptions({ name: 'SphereFormItem', inheritAttrs: true })

const {
  name,
  label,
  description,
  rules: rule,
} = defineProps<{
  name?: string
  label?: string
  description?: string
  rules?: FormRule[]
}>()

const slot = defineSlots<{
  label?: () => VNodeChild
  description?: () => VNodeChild
  default?: () => VNodeChild
}>()

const { validateInfo, validateResult, validateErrors } = useFormContext()

const isError = computed(() => (name ? validateResult.get(name) === false : false))

watch(
  () => [name, rule],
  () => {
    if (name && rule && rule.length > 0) {
      validateInfo.set(name, rule)
    } else if (name) {
      validateInfo.delete(name)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div v-bind="$attrs" class="flex flex-col gap-2">
    <label
      v-if="label || slot.label"
      :for="name"
      class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      :aria-describedby="name"
    >
      <slot name="label">
        <template v-if="label">
          <component v-if="isVNode(label)" :is="label" />
          <template v-else>{{ label }}</template>
        </template>
      </slot>
    </label>

    <p v-if="description || slot.description" class="text-foreground/60 text-xs">
      <slot name="description">
        <template v-if="description">
          <component v-if="isVNode(description)" :is="description" />
          <template v-else>{{ description }}</template>
        </template>
      </slot>
    </p>

    <div :class="isError ? 'error' : ''">
      <slot name="default" />
    </div>

    <p
      v-if="rule && rule.length > 0 && name"
      :class="[
        'text-xs transition-[color] select-none',
        isError ? 'text-red-500' : 'text-transparent',
      ]"
    >
      {{
        (name && validateErrors.get(name)?.message) ||
        rule.find(r => r.message)?.message ||
        rule[0]?.message
      }}
    </p>
  </div>
</template>
