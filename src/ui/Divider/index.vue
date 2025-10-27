<script setup lang="ts">
defineOptions({ name: 'SphereDivider', inheritAttrs: true })

const {
  direction = 'horizontal',
  contentPosition = 'center',
  dashed = false,
  plain = false,
} = defineProps<{
  direction?: 'horizontal' | 'vertical'
  contentPosition?: 'left' | 'center' | 'right'
  dashed?: boolean
  plain?: boolean
}>()
</script>

<template>
  <template v-if="direction === 'horizontal'">
    <div class="my-4 flex w-full items-center">
      <!-- 左侧线条 -->
      <div
        :class="[
          'h-px grow border-0 transition-colors duration-150',
          'bg-gray-300 dark:bg-gray-700',
          dashed ? 'border-t border-dashed' : '',
        ]"
        :style="{
          maxWidth:
            contentPosition === 'left' ? '5%' : contentPosition === 'right' ? '95%' : undefined,
        }"
      />

      <!-- 中间文字 -->
      <div
        v-if="$slots.default"
        :class="[
          'glass rounded-lg px-3 text-sm whitespace-nowrap',
          plain
            ? 'text-foreground/70 dark:text-gray-400'
            : 'text-foreground font-medium dark:text-gray-100',
        ]"
      >
        <slot name="default" />
      </div>

      <!-- 右侧线条 -->
      <div
        :class="[
          'h-px grow border-0 transition-colors duration-150',
          'bg-gray-300 dark:bg-gray-700',
          dashed ? 'border-t border-dashed' : '',
        ]"
        :style="{
          maxWidth:
            contentPosition === 'left' ? '95%' : contentPosition === 'right' ? '5%' : undefined,
        }"
      />
    </div>
  </template>

  <template v-else>
    <!-- 垂直分割线 -->
    <span
      :class="[
        'mx-4 inline-block h-full w-px border-0 align-middle transition-colors duration-150',
        'bg-gray-300 dark:bg-gray-700',
        dashed ? 'border-l border-dashed' : '',
      ]"
    />
  </template>
</template>
