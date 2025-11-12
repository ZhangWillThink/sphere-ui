<script setup lang="ts">
import type { VNodeChild } from 'vue'

import { computed, isVNode, shallowRef, useTemplateRef, watch } from 'vue'

import { Check, Down } from '@icon-park/vue-next'
import { onClickOutside, onKeyStroke, useToggle } from '@vueuse/core'
import { isNil, isString } from 'lodash-es'

import { Input } from '..'
import useFixedPosition from '../shared/hooks/useFixedPosition'
import UiTag from '../Tag/index.vue'
import { CollapseTransition } from '../Transition'

defineOptions({ name: 'SphereSelect', inheritAttrs: true })

const {
  options,
  multiple,
  placeholder = undefined,
  searchable,
} = defineProps<{
  disabled?: boolean
  searchable?: boolean
  options: Array<{ label: VNodeChild; value: any; disabled?: boolean }>
  multiple?: boolean
  placeholder?: VNodeChild
}>()

const modelValue = defineModel<any>({ required: false })

const trigger = useTemplateRef('trigger')
const content = useTemplateRef('content')

const [contentPosition, triggerBounding] = useFixedPosition('bottom-center', trigger, content)

const [open, toggleOpen] = useToggle(false)
const highlighted = shallowRef<number>(-1)
const searchQuery = shallowRef('')

const filteredOptions = computed(() => {
  if (!searchQuery.value) return options

  return options.filter(opt => {
    const label = isString(opt.label) ? opt.label : String(opt.label)
    const value = String(opt.value)
    return (
      label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      value.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})

const selectedValues = computed({
  get() {
    if (multiple) return Array.isArray(modelValue.value) ? modelValue.value : []
    return modelValue.value
  },
  set(val) {
    modelValue.value = val
  },
})

function getLabelByValue(value: any) {
  const option = options.find(opt => opt.value === value)
  return option?.label
}

function isSelected(opt: { value: any }) {
  if (multiple) {
    return Array.isArray(selectedValues.value) && selectedValues.value.includes(opt.value)
  }
  return selectedValues.value === opt.value
}

function toggleOption(opt: { value: any; disabled?: boolean }) {
  if (opt.disabled) return
  if (multiple) {
    const arr = Array.isArray(selectedValues.value) ? [...selectedValues.value] : []
    const idx = arr.findIndex(v => v === opt.value)
    if (idx >= 0) arr.splice(idx, 1)
    else arr.push(opt.value)
    selectedValues.value = arr
  } else {
    selectedValues.value = opt.value === selectedValues.value ? null : opt.value
    toggleOpen(false)
  }
}

function removeOption(value: any) {
  if (multiple && Array.isArray(selectedValues.value)) {
    selectedValues.value = selectedValues.value.filter(v => v !== value)
  }
}

function openDropdown() {
  toggleOpen(true)
  highlightSelected()
  searchQuery.value = '' // 打开下拉框时清空搜索
}

function closeDropdown() {
  toggleOpen(false)
  highlighted.value = -1
  searchQuery.value = '' // 关闭下拉框时清空搜索
}

function highlightSelected() {
  if (!open.value) return
  const idx = filteredOptions.value.findIndex(o => isSelected(o))
  highlighted.value = idx >= 0 ? idx : 0
}

function moveHighlight(dir: 1 | -1) {
  if (!filteredOptions.value.length) return
  let i = highlighted.value
  const len = filteredOptions.value.length
  for (let attempts = 0; attempts < len; attempts++) {
    i = (i + dir + len) % len
    const candidate = filteredOptions.value[i]
    if (candidate && !candidate.disabled) {
      highlighted.value = i
      break
    }
  }
}

// 监听选项变化，确保高亮索引有效
watch(filteredOptions, () => {
  if (highlighted.value >= filteredOptions.value.length) {
    highlighted.value = filteredOptions.value.length - 1
  }
})

onKeyStroke(
  ['ArrowDown', 'ArrowUp', 'Enter', ' '],
  (e: KeyboardEvent) => {
    if (!open.value) {
      e.preventDefault()
      openDropdown()
    }
  },
  { target: trigger },
)

const keyHandler = (e: KeyboardEvent) => {
  if (!open.value) return

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      moveHighlight(1)
      break
    case 'ArrowUp':
      e.preventDefault()
      moveHighlight(-1)
      break
    case 'Home':
      e.preventDefault()
      highlighted.value = 0
      break
    case 'End':
      e.preventDefault()
      highlighted.value = filteredOptions.value.length - 1
      break
    case 'Enter':
    case ' ':
      e.preventDefault()
      if (highlighted.value >= 0) {
        const opt = filteredOptions.value[highlighted.value]
        if (opt) toggleOption(opt)
      }
      break
    case 'Escape':
      e.preventDefault()
      closeDropdown()
      break
  }
}

onKeyStroke(['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' ', 'Escape'], keyHandler, {
  target: trigger,
})
onKeyStroke(['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' ', 'Escape'], keyHandler, {
  target: content,
})
onClickOutside(content, closeDropdown, { ignore: [trigger] })
</script>

<template>
  <button
    v-bind="$attrs"
    ref="trigger"
    class="border-input data-placeholder:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-[180px] cursor-pointer items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
    role="combobox"
    :aria-expanded="open"
    aria-autocomplete="none"
    aria-haspopup="listbox"
    dir="ltr"
    :data-placeholder="String(placeholder)"
    data-slot="select-trigger"
    data-size="default"
    :disabled
    type="button"
    @click="openDropdown"
  >
    <div class="flex flex-wrap items-center gap-1">
      <template v-if="!multiple">
        <span v-if="!isNil(selectedValues)">
          <component
            v-if="getLabelByValue(selectedValues) === 'object'"
            :is="getLabelByValue(selectedValues)"
          />
          <template v-else>{{ getLabelByValue(selectedValues) }}</template>
        </span>
        <span v-else class="text-card-foreground/60">
          <template v-if="isVNode(placeholder)"><component :is="placeholder" /></template>
          <template v-else>{{ placeholder ?? 'Select' }}</template>
        </span>
      </template>

      <template v-else>
        <template v-if="Array.isArray(selectedValues) && selectedValues.length">
          <UiTag
            v-for="value in selectedValues"
            :key="value"
            size="sm"
            removable
            @remove="removeOption(value)"
          >
            {{ getLabelByValue(value) }}
          </UiTag>
        </template>
        <span v-else class="text-card-foreground/60">{{ placeholder }}</span>
      </template>
    </div>

    <Down :class="[open ? 'rotate-180' : '', 'transition-transform']" />
  </button>

  <Teleport to="body">
    <CollapseTransition>
      <ul
        v-if="open"
        ref="content"
        role="listbox"
        data-slot="select-content"
        :style="{
          ...contentPosition,
          width: `${triggerBounding.width.value}px`,
          left: `${triggerBounding.left.value}px`,
        }"
        class="bg-popover/70 border-border text-popover-foreground relative z-50 min-w-32 overflow-x-hidden overflow-y-auto rounded-md border p-px shadow-md backdrop-blur-lg"
      >
        <li
          v-if="searchable"
          data-slot="select-search"
          class="sticky top-0 z-10 p-2 backdrop-blur-lg"
        >
          <Input
            v-model="searchQuery"
            type="text"
            placeholder="搜索选项..."
            class="focus:ring-primary-300 dark:focus:ring-primary-400 w-full rounded-md border border-gray-300 px-2 py-1 text-sm transition-all duration-150 ease-in-out focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            @keydown.stop
          />
        </li>

        <li
          v-for="(opt, i) in filteredOptions"
          :key="i"
          role="option"
          data-slot="select-item"
          :aria-selected="isSelected(opt)"
          class="hover:bg-accent/70 focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden transition-[background] select-none disabled:cursor-not-allowed data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2"
          @click="
            () => {
              if (!opt.disabled) toggleOption(opt)
            }
          "
          @mouseenter="
            () => {
              if (!opt.disabled) highlighted = i
            }
          "
        >
          <Check :class="[isSelected(opt) ? 'opacity-100' : 'opacity-0', 'transition-opacity']" />

          <p class="truncate">
            <component v-if="isVNode(opt.label)" :is="opt.label" />
            <template v-else>{{ opt.label }}</template>
          </p>
        </li>

        <li
          v-if="filteredOptions.length === 0"
          class="px-3 py-2 text-center text-gray-500 dark:text-gray-400"
        >
          未找到匹配的选项
        </li>
      </ul>
    </CollapseTransition>
  </Teleport>
</template>
