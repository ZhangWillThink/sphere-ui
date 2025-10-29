<script setup lang="ts">
import type { CollapseProps } from './types'
import type { VNodeChild } from 'vue'

import { computed, isVNode, ref } from 'vue'

import { Down } from '@icon-park/vue-next'
import { cva } from 'class-variance-authority'

import { CollapseTransition } from '../Transition'

defineOptions({ name: 'SphereCollapse' })

const { items, accordion = false, bordered = true, ghost = false } = defineProps<CollapseProps>()

const modelValue = defineModel<any | any[]>()

const emit = defineEmits<{
  change: [value: any | any[]]
}>()

defineSlots<{
  expandIcon?: (props: { isActive: boolean }) => VNodeChild
}>()

// 内部状态管理
const internalActiveKeys = ref<Set<any>>(new Set())

// 计算当前激活的 keys
const activeKeys = computed(() => {
  if (modelValue.value !== undefined) {
    if (accordion) {
      return new Set(modelValue.value !== null ? [modelValue.value] : [])
    } else {
      return new Set(Array.isArray(modelValue.value) ? modelValue.value : [])
    }
  }
  return internalActiveKeys.value
})

// 切换面板
const togglePanel = (key: any, disabled?: boolean) => {
  if (disabled) return

  const newActiveKeys = new Set(activeKeys.value)

  if (accordion) {
    // 手风琴模式：只能展开一个
    if (newActiveKeys.has(key)) {
      newActiveKeys.delete(key)
      const newValue = null
      modelValue.value = newValue
      emit('change', newValue)
    } else {
      newActiveKeys.clear()
      newActiveKeys.add(key)
      modelValue.value = key
      emit('change', key)
    }
  } else {
    // 普通模式：可以展开多个
    if (newActiveKeys.has(key)) {
      newActiveKeys.delete(key)
    } else {
      newActiveKeys.add(key)
    }
    const newValue = Array.from(newActiveKeys)
    modelValue.value = newValue
    emit('change', newValue)
  }

  internalActiveKeys.value = newActiveKeys
}

// 判断面板是否激活
const isActive = (key: any) => activeKeys.value.has(key)

// 容器样式 — 现代化毛玻璃风格（默认无边框）
const containerClasses = cva(
  'glass text-text-primary rounded-lg shadow-sm dark:shadow-lg dark:shadow-black/20',
  {
    variants: {
      bordered: {
        // 保留属性以兼容 API，但默认不显示边框
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      bordered: false,
    },
  },
)

// 每个项目样式 — 毛玻璃风格，移除分隔线，使用间距与圆角进行分隔
const itemClasses = cva('bg-transparent', {
  variants: {
    ghost: {
      true: 'mb-2 last:mb-0 rounded-lg border-0',
      false: 'mb-2 last:mb-0 rounded-lg',
    },
    bordered: {
      true: '',
      false: '',
    },
  },
})

// 头部样式 — 与 Card/Button 保持一致的内边距、圆角和交互反馈
const headerClasses = cva(
  'flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-in-out select-none cursor-pointer',
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed opacity-50',
      },
      ghost: {
        true: 'glass rounded-lg hover:glass-light',
        false: '',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // 非 ghost 激活时使用 stronger glass
      {
        ghost: false,
        active: true,
        class: 'glass-strong text-text-primary',
      },
      // 非 ghost 非激活时 hover 使用轻微 glass-light
      {
        ghost: false,
        active: false,
        class: 'hover:glass-light',
      },
    ],
  },
)

// 内容盒子样式 — 留白与文本颜色保持项目一致
const contentBoxClasses = cva(
  'text-text-primary/80 dark:text-gray-300 px-4 pt-0 pb-4 text-sm transition-colors duration-150',
  {
    variants: {
      ghost: {
        true: 'pl-4',
        false: 'pl-[52px]',
      },
    },
  },
)
</script>

<template>
  <div :class="containerClasses({ bordered: bordered && !ghost })">
    <div v-for="item in items" :key="item.key" :class="itemClasses({ ghost, bordered })">
      <div
        :class="headerClasses({ disabled: item.disabled, ghost, active: isActive(item.key) })"
        @click="togglePanel(item.key, item.disabled)"
      >
        <slot name="expandIcon" :is-active="isActive(item.key)">
          <Down
            :class="[
              'text-text-primary/60 shrink-0 transition-transform duration-200',
              { 'rotate-180': isActive(item.key) },
            ]"
          />
        </slot>
        <div class="text-text-primary flex-1 text-sm font-medium">
          <component v-if="isVNode(item.label)" :is="item.label" />
          <template v-else>{{ item.label }}</template>
        </div>
      </div>

      <KeepAlive>
        <CollapseTransition>
          <div v-if="isActive(item.key)" class="overflow-hidden">
            <div :class="contentBoxClasses({ ghost })">
              <component v-if="isVNode(item.children)" :is="item.children" />
              <template v-else>{{ item.children }}</template>
            </div>
          </div>
        </CollapseTransition>
      </KeepAlive>
    </div>
  </div>
</template>
