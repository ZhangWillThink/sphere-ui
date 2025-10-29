<script setup lang="ts">
import type { VNodeChild } from 'vue'

import { computed, isVNode, ref, shallowRef, useTemplateRef, watch } from 'vue'

import { Check, Down } from '@icon-park/vue-next'
import { onClickOutside, onKeyStroke, useToggle } from '@vueuse/core'
import { isString } from 'lodash-es'

import useFixedPosition from '../shared/hooks/useFixedPosition'
import UiTag from '../Tag/index.vue'
import { CollapseTransition } from '../Transition'

defineOptions({ name: 'SphereSelect', inheritAttrs: true })

const { options, multiple, placeholder, searchable } = defineProps<{
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
const searchQuery = ref('')

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
    if (multiple) {
      return Array.isArray(modelValue.value) ? modelValue.value : []
    }
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
    type="button"
    class="glass text-text-primary flex w-full items-center justify-between rounded-lg px-3 py-2 shadow transition-all duration-150 ease-in-out focus-within:ring-3 focus-within:ring-blue-300/30 dark:focus-within:ring-blue-400/40"
    :aria-expanded="open"
    aria-haspopup="listbox"
    @click="openDropdown"
  >
    <div class="flex flex-wrap items-center gap-1">
      <template v-if="!multiple">
        <span v-if="selectedValues !== undefined && selectedValues !== null">
          <component
            v-if="getLabelByValue(selectedValues) === 'object'"
            :is="getLabelByValue(selectedValues)"
          />
          <template v-else>{{ getLabelByValue(selectedValues) }}</template>
        </span>
        <span v-else class="text-text-primary/60">{{ placeholder ?? 'Select' }}</span>
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
        <span v-else class="text-text-primary/60">{{ placeholder ?? 'Select' }}</span>
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
        :style="{
          ...contentPosition,
          width: `${triggerBounding.width.value}px`,
          left: `${triggerBounding.left.value}px`,
        }"
        class="glass mt-2 max-h-48 overflow-auto rounded-lg p-1 shadow dark:shadow-lg dark:shadow-black/30"
      >
        <li
          v-if="searchable"
          class="sticky top-0 z-10 bg-white/80 p-2 backdrop-blur-sm dark:bg-gray-800/80"
        >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索选项..."
            class="w-full rounded-md border border-gray-300 px-2 py-1 text-sm transition-all duration-150 ease-in-out focus:ring-2 focus:ring-blue-300 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-400"
            @keydown.stop
          />
        </li>

        <li
          v-for="(opt, i) in filteredOptions"
          :key="i"
          role="option"
          :aria-selected="isSelected(opt)"
          :class="[
            'flex items-center space-x-2 rounded-md px-3 py-2 transition-all select-none',
            opt.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            highlighted === i && !opt.disabled
              ? 'bg-blue-100 dark:bg-blue-900/40 dark:text-blue-100'
              : '',
          ]"
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
