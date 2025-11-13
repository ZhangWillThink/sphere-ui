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
  <div
    v-bind="$attrs"
    class="group/field data-[invalid=true]:text-destructive flex w-full flex-col gap-3 *:w-full [&>.sr-only]:w-auto"
  >
    <label
      v-if="label || slot.label"
      :for="name"
      data-slot="field-label"
      class="group/field-label peer/field-label has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10 flex w-fit items-center gap-2 text-sm leading-snug font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 group-data-[disabled=true]/field:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-4"
      :aria-describedby="name"
    >
      <slot name="label">
        <component v-if="isVNode(label)" :is="label" />
        <template v-else-if="label">{{ label }}</template>
      </slot>
    </label>

    <p v-if="description || slot.description" class="text-foreground/40 text-xs">
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
        isError ? 'text-destructive' : 'text-transparent',
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
