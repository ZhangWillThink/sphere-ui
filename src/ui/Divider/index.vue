<script setup lang="ts">
defineOptions({ name: 'UiDivider', inheritAttrs: true })

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
          'bg-foreground/30 h-px flex-grow border-0',
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
          plain ? 'text-foreground/70' : 'text-foreground font-medium',
        ]"
      >
        <slot name="default" />
      </div>

      <!-- 右侧线条 -->
      <div
        :class="[
          'bg-foreground/30 h-px flex-grow border-0',
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
        'bg-foreground/30 mx-4 inline-block h-full w-px border-0 align-middle',
        dashed ? 'border-l border-dashed' : '',
      ]"
    />
  </template>
</template>
