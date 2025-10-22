# Collapse 折叠面板

可以折叠/展开的内容区域。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Collapse } from '@/components/ui'

const activeKeys = ref(['1'])

const items = [
  {
    key: '1',
    label: '一致性 Consistency',
    children: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念。',
  },
  {
    key: '2',
    label: '反馈 Feedback',
    children: '控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作。',
  },
  {
    key: '3',
    label: '效率 Efficiency',
    children: '简化流程：设计简洁直观的操作流程。',
  },
]
</script>

<template>
  <Collapse v-model="activeKeys" :items="items" />
</template>
```

## 手风琴模式

通过 `accordion` 属性设置手风琴模式，每次只能展开一个面板。

```vue
<script setup>
import { ref } from 'vue'
import { Collapse } from '@/components/ui'

const activeKey = ref('1')

const items = [
  {
    key: '1',
    label: '一致性 Consistency',
    children: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念。',
  },
  {
    key: '2',
    label: '反馈 Feedback',
    children: '控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作。',
  },
  {
    key: '3',
    label: '效率 Efficiency',
    children: '简化流程：设计简洁直观的操作流程。',
  },
]
</script>

<template>
  <Collapse v-model="activeKey" :items="items" accordion />
</template>
```

## 无边框

通过 `ghost` 属性设置无边框样式。

```vue
<script setup>
import { Collapse } from '@/components/ui'

const items = [
  {
    key: '1',
    label: '一致性 Consistency',
    children: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念。',
  },
  {
    key: '2',
    label: '反馈 Feedback',
    children: '控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作。',
  },
]
</script>

<template>
  <Collapse :items="items" ghost />
</template>
```

## 禁用状态

通过 `disabled` 属性禁用某个面板。

```vue
<script setup>
import { Collapse } from '@/components/ui'

const items = [
  {
    key: '1',
    label: '一致性 Consistency',
    children: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念。',
  },
  {
    key: '2',
    label: '反馈 Feedback',
    children: '控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作。',
    disabled: true,
  },
  {
    key: '3',
    label: '效率 Efficiency',
    children: '简化流程：设计简洁直观的操作流程。',
  },
]
</script>

<template>
  <Collapse :items="items" />
</template>
```

## 自定义面板内容

支持使用 VNode 自定义 label 和 children。

```vue
<script setup>
import { h } from 'vue'
import { Collapse } from '@/components/ui'

const items = [
  {
    key: '1',
    label: h('div', { class: 'font-bold text-primary' }, '自定义标题'),
    children: h('div', { class: 'space-y-2' }, [
      h('p', '这是自定义的内容'),
      h('p', { class: 'text-muted-foreground' }, '可以包含任意 Vue 组件'),
    ]),
  },
  {
    key: '2',
    label: '普通标题',
    children: '普通内容',
  },
]
</script>

<template>
  <Collapse :items="items" />
</template>
```

## 自定义展开图标

通过 `expandIcon` 插槽自定义展开图标。

```vue
<script setup>
import { Collapse } from '@/components/ui'

const items = [
  {
    key: '1',
    label: '一致性 Consistency',
    children: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念。',
  },
  {
    key: '2',
    label: '反馈 Feedback',
    children: '控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作。',
  },
]
</script>

<template>
  <Collapse :items="items">
    <template #expandIcon="{ isActive }">
      <span class="text-lg">{{ isActive ? '−' : '+' }}</span>
    </template>
  </Collapse>
</template>
```

## API

### Props

| 属性名               | 说明                 | 类型                                           | 默认值  |
| -------------------- | -------------------- | ---------------------------------------------- | ------- |
| items                | 折叠面板数据         | `Item[]`                                       | `[]`    |
| modelValue (v-model) | 当前激活的面板的 key | `accordion` 模式：`any` <br> 普通模式：`any[]` | -       |
| accordion            | 是否开启手风琴模式   | `boolean`                                      | `false` |
| bordered             | 是否显示边框         | `boolean`                                      | `true`  |
| ghost                | 是否使用无边框样式   | `boolean`                                      | `false` |

### Item

| 属性名   | 说明       | 类型                   | 默认值  |
| -------- | ---------- | ---------------------- | ------- |
| key      | 唯一标识符 | `any`                  | -       |
| label    | 面板标题   | `VNodeChild \| string` | -       |
| children | 面板内容   | `VNodeChild \| string` | -       |
| disabled | 是否禁用   | `boolean`              | `false` |

### Events

| 事件名            | 说明               | 类型                            |
| ----------------- | ------------------ | ------------------------------- |
| update:modelValue | 激活面板变化时触发 | `(value: any \| any[]) => void` |
| change            | 激活面板变化时触发 | `(value: any \| any[]) => void` |

### Slots

| 插槽名     | 说明           | 参数                    |
| ---------- | -------------- | ----------------------- |
| expandIcon | 自定义展开图标 | `{ isActive: boolean }` |

## 样式定制

组件使用 Tailwind CSS 类，可以通过修改以下 CSS 变量来定制样式：

- `--foreground`: 文字颜色
- `--muted`: 背景色
- `--border`: 边框颜色
- `--primary`: 主题色
