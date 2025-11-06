<script lang="ts">
const slider = cva('relative flex items-center h-6 touch-none select-none', {
  variants: {
    size: {
      sm: 'h-5',
      md: 'h-6',
      lg: 'h-7',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
</script>

<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'

import { computed, useTemplateRef } from 'vue'

import { useMouseInElement, useMousePressed, useToggle } from '@vueuse/core'
import { cva } from 'class-variance-authority'

import useFixedPosition from '../shared/hooks/useFixedPosition'

defineOptions({ name: 'SphereSlider', inheritAttrs: true })

type SliderProps = VariantProps<typeof slider>

const {
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  size = 'md',
} = defineProps<{
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: SliderProps['size']
}>()

const modelValue = defineModel<number>({ required: false, default: 0 })

const track = useTemplateRef('track')
const thumb = useTemplateRef('thumb')
const tooltip = useTemplateRef('tooltip')

const { isOutside: isMouseOutsideTrack } = useMouseInElement(track)

const { pressed } = useMousePressed({ target: thumb })

// 显示工具提示
const showTooltip = computed(() => !isMouseOutsideTrack.value || pressed.value)

// 拖动状态
const [isDragging, toggleDragging] = useToggle(false)

// 计算百分比
const percentage = computed(() => {
  const range = max - min
  if (range === 0) return 0
  return ((modelValue.value - min) / range) * 100
})

// 将百分比转换为值
const percentageToValue = (percent: number) => {
  const range = max - min
  const rawValue = min + (range * percent) / 100

  // 根据 step 对齐值
  const steppedValue = Math.round((rawValue - min) / step) * step + min

  // 确保值在范围内
  return Math.max(min, Math.min(max, steppedValue))
}

// 处理轨道点击
const handleTrackClick = (event: MouseEvent) => {
  if (disabled) return

  const rect = track.value?.getBoundingClientRect()
  if (!rect) return

  const percent = ((event.clientX - rect.left) / rect.width) * 100
  modelValue.value = percentageToValue(percent)
}

// 处理拖拽开始
const handleMouseDown = () => {
  if (disabled) return
  toggleDragging(true)

  // 添加全局鼠标移动和抬起事件
  const handleMouseMoveGlobal = (event: MouseEvent) => {
    if (!isDragging.value) return

    const rect = track.value?.getBoundingClientRect()
    if (!rect) return

    const percent = ((event.clientX - rect.left) / rect.width) * 100
    modelValue.value = percentageToValue(percent)
  }

  const handleMouseUp = () => {
    toggleDragging(false)
    document.removeEventListener('mousemove', handleMouseMoveGlobal)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMoveGlobal)
  document.addEventListener('mouseup', handleMouseUp)
}

// 处理拖拽（保留用于轨道上的移动）
const handleMouseMove = (event: MouseEvent) => {
  if (disabled || !isDragging.value) return

  const rect = track.value?.getBoundingClientRect()
  if (!rect) return

  const percent = ((event.clientX - rect.left) / rect.width) * 100
  modelValue.value = percentageToValue(percent)
}

// 处理键盘事件
const handleKeyDown = (event: KeyboardEvent) => {
  if (disabled) return

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      event.preventDefault()
      modelValue.value = Math.max(min, modelValue.value - step)
      break
    case 'ArrowRight':
    case 'ArrowUp':
      event.preventDefault()
      modelValue.value = Math.min(max, modelValue.value + step)
      break
    case 'Home':
      event.preventDefault()
      modelValue.value = min
      break
    case 'End':
      event.preventDefault()
      modelValue.value = max
      break
  }
}

// 工具提示定位
const [tooltipStyle] = useFixedPosition('top-center', thumb, tooltip)

// 格式化显示值
const displayValue = computed(() => Math.round(modelValue.value * 100) / 100)
</script>

<template>
  <div v-bind="$attrs" :class="slider({ size })" class="w-full">
    <!-- 轨道 -->
    <div
      ref="track"
      :class="[
        'relative h-2 w-full cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700',
        disabled ? 'cursor-not-allowed opacity-50' : '',
      ]"
      @click="handleTrackClick"
      @mousemove="handleMouseMove"
    >
      <!-- 进度条 -->
      <div
        :class="[
          'absolute h-full rounded-full bg-blue-600 dark:bg-blue-500',
          disabled ? 'bg-gray-400 dark:bg-gray-600' : '',
        ]"
        :style="{ width: `${percentage}%` }"
      />

      <!-- 滑块手柄 -->
      <div
        ref="thumb"
        :class="[
          'absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-md',
          'focus:ring-2 focus:ring-blue-500 focus:outline-none',
          disabled
            ? 'cursor-not-allowed'
            : 'cursor-grab hover:scale-110 hover:shadow-lg active:cursor-grabbing',
          pressed ? 'scale-110 shadow-lg' : '',
        ]"
        :style="{ left: `calc(${percentage}% - 8px)` }"
        tabindex="0"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="modelValue"
        :aria-disabled="disabled"
        @keydown="handleKeyDown"
        @mousedown="handleMouseDown"
      >
        <!-- 工具提示 -->
        <Teleport to="body">
          <Transition
            appear
            enterActiveClass="animate__animated animate__fadeIn animate__faster"
            leaveActiveClass="animate__animated animate__fadeOut animate__faster"
          >
            <div
              v-if="showTooltip"
              ref="tooltip"
              :style="tooltipStyle"
              class="pointer-events-none rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white dark:bg-gray-700"
            >
              {{ displayValue }}
            </div>
          </Transition>
        </Teleport>
      </div>
    </div>
  </div>
</template>
