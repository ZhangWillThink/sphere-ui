# Table 组件

一个功能丰富的表格组件，类似于 Ant Design 的 Table 组件，支持排序、选择、自定义渲染等功能。

## 特性

- ✅ 支持数据展示和排序
- ✅ 支持行选择（单选/多选）
- ✅ 支持自定义列渲染（插槽和渲染函数）
- ✅ 支持固定表头
- ✅ 支持加载状态
- ✅ 支持边框、斑马纹、悬停效果
- ✅ 支持多种尺寸（sm/md/lg）
- ✅ 支持空状态自定义
- ✅ 完整的 TypeScript 类型支持
- ✅ 响应式设计，深色模式支持
- ✅ 现代化毛玻璃效果（Glassmorphism）
- ✅ 流畅的动画和过渡效果

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Table, { type TableColumn } from '@/components/ui/Table/index.vue'

interface DataType {
  id: number
  name: string
  age: number
  address: string
}

const columns: TableColumn<DataType>[] = [
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    width: 150,
    sortable: true,
  },
  {
    key: 'age',
    title: '年龄',
    dataIndex: 'age',
    width: 100,
    align: 'center',
    sortable: true,
  },
  {
    key: 'address',
    title: '地址',
    dataIndex: 'address',
  },
]

const dataSource = ref<DataType[]>([
  { id: 1, name: '张三', age: 28, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, address: '上海市浦东新区' },
])
</script>

<template>
  <Table v-model="dataSource" :columns="columns" />
</template>
```

## API

### Props

| 属性           | 说明               | 类型                                          | 默认值       |
| -------------- | ------------------ | --------------------------------------------- | ------------ |
| `v-model`      | 数据源（双向绑定） | `T[]`                                         | `[]`         |
| `dataSource`   | 数据源（单向）     | `T[]`                                         | `[]`         |
| `columns`      | 表格列的配置       | `TableColumn<T>[]`                            | `[]`         |
| `bordered`     | 是否显示边框       | `boolean`                                     | `false`      |
| `striped`      | 是否显示斑马纹     | `boolean`                                     | `false`      |
| `hoverable`    | 是否显示悬停效果   | `boolean`                                     | `true`       |
| `size`         | 表格尺寸           | `'sm' \| 'md' \| 'lg'`                        | `'md'`       |
| `loading`      | 是否显示加载状态   | `boolean`                                     | `false`      |
| `emptyText`    | 空数据时显示的文本 | `string`                                      | `'暂无数据'` |
| `rowKey`       | 行数据的 Key       | `string \| ((record: T) => string \| number)` | `'id'`       |
| `rowSelection` | 行选择配置         | `RowSelection`                                | -            |
| `sticky`       | 是否固定表头       | `boolean`                                     | `false`      |

### TableColumn

列配置对象的属性：

| 属性        | 说明                 | 类型                            | 默认值   |
| ----------- | -------------------- | ------------------------------- | -------- |
| `key`       | 列的唯一标识（必填） | `string`                        | -        |
| `title`     | 列标题               | `string`                        | -        |
| `dataIndex` | 数据字段名           | `string \| string[]`            | -        |
| `width`     | 列宽度               | `string \| number`              | -        |
| `minWidth`  | 列最小宽度           | `string \| number`              | -        |
| `align`     | 对齐方式             | `'left' \| 'center' \| 'right'` | `'left'` |
| `fixed`     | 固定列（暂未实现）   | `'left' \| 'right'`             | -        |
| `sortable`  | 是否可排序           | `boolean`                       | `false`  |
| `ellipsis`  | 是否自动省略         | `boolean`                       | `false`  |
| `render`    | 自定义渲染函数       | `(params) => VNodeChild`        | -        |

### RowSelection

行选择配置对象：

```typescript
interface RowSelection {
  selectedRowKeys?: (string | number)[]
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void
  getCheckboxProps?: (record: T) => { disabled?: boolean }
}
```

### Events

| 事件名     | 说明                   | 回调参数                                   |
| ---------- | ---------------------- | ------------------------------------------ |
| `rowClick` | 点击行时触发           | `(record: T, index: number)`               |
| `change`   | 表格变化时触发（排序） | `(pagination, filters, sorter: SortState)` |

### Slots

| 插槽名         | 说明         | 参数                                      |
| -------------- | ------------ | ----------------------------------------- |
| `column-{key}` | 自定义列内容 | `{ text: any, record: T, index: number }` |
| `empty`        | 自定义空状态 | -                                         |

## 使用示例

### 1. 带边框和悬停效果

```vue
<Table v-model="dataSource" :columns="columns" :bordered="true" :hoverable="true" />
```

### 2. 斑马纹表格

```vue
<Table v-model="dataSource" :columns="columns" :striped="true" />
```

### 3. 不同尺寸

```vue
<!-- 小尺寸 -->
<Table v-model="dataSource" :columns="columns" size="sm" />

<!-- 中等尺寸（默认） -->
<Table v-model="dataSource" :columns="columns" size="md" />

<!-- 大尺寸 -->
<Table v-model="dataSource" :columns="columns" size="lg" />
```

### 4. 加载状态

```vue
<script setup lang="ts">
const loading = ref(false)

const loadData = async () => {
  loading.value = true
  try {
    // 加载数据...
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Table v-model="dataSource" :columns="columns" :loading="loading" />
</template>
```

### 5. 排序功能

```vue
<script setup lang="ts">
const columns: TableColumn[] = [
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    sortable: true, // 启用排序
  },
  {
    key: 'age',
    title: '年龄',
    dataIndex: 'age',
    sortable: true,
  },
]

const handleChange = (pagination: any, filters: any, sorter: any) => {
  console.log('排序状态:', sorter)
  // sorter: { key: 'age', order: 'ascend' | 'descend' | null }
}
</script>

<template>
  <Table v-model="dataSource" :columns="columns" @change="handleChange" />
</template>
```

### 6. 行选择

```vue
<script setup lang="ts">
const selectedRowKeys = ref<number[]>([])

const rowSelection = {
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: (string | number)[], selectedRows: DataType[]) => {
    selectedRowKeys.value = keys as number[]
    console.log('选中的行:', selectedRows)
  },
  // 禁用某些行的选择
  getCheckboxProps: (record: DataType) => ({
    disabled: record.status === 'inactive',
  }),
}
</script>

<template>
  <Table v-model="dataSource" :columns="columns" :row-selection="rowSelection" />
</template>
```

### 7. 自定义列渲染（使用插槽）

```vue
<template>
  <Table v-model="dataSource" :columns="columns">
    <!-- 自定义标签列 -->
    <template #column-tags="{ text, record, index }">
      <div class="flex gap-1">
        <Tag v-for="tag in text" :key="tag">{{ tag }}</Tag>
      </div>
    </template>

    <!-- 自定义操作列 -->
    <template #column-actions="{ record }">
      <Button size="sm" @click="handleEdit(record)">编辑</Button>
      <Button size="sm" @click="handleDelete(record)">删除</Button>
    </template>
  </Table>
</template>
```

**💡 类型推导提示：**

如果你希望在插槽中获得完整的类型推导和智能提示，可以在插槽参数中添加类型注解：

```vue
<script setup lang="ts">
interface User {
  id: number
  name: string
  tags: string[]
  status: 'active' | 'inactive'
}

const columns: TableColumn<User>[] = [...]
const dataSource = ref<User[]>([...])
</script>

<template>
  <Table v-model="dataSource" :columns="columns">
    <!-- 通过类型注解，text 会被推导为 string[] -->
    <template #column-tags="{ text }: { text: string[]; record: User; index: number }">
      <Tag v-for="tag in text" :key="tag">{{ tag }}</Tag>
    </template>

    <!-- record 会被推导为 User 类型 -->
    <template #column-status="{ text }: { text: User['status']; record: User; index: number }">
      <!-- text 的类型是 'active' | 'inactive'，可以获得完整的类型检查 -->
      <Tag>{{ text }}</Tag>
    </template>
  </Table>
</template>
```

### 8. 自定义列渲染（使用 render 函数）

```vue
<script setup lang="ts">
import { h } from 'vue'

const columns: TableColumn[] = [
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    render: ({ text, record }) => {
      return h('div', { class: 'flex items-center gap-2' }, [
        h('img', { src: record.avatar, class: 'w-8 h-8 rounded-full' }),
        h('span', { class: 'font-medium' }, text),
      ])
    },
  },
  {
    key: 'email',
    title: '邮箱',
    dataIndex: 'email',
    render: ({ text }) => {
      return h(
        'a',
        {
          href: `mailto:${text}`,
          class: 'text-blue-600 hover:underline',
        },
        text,
      )
    },
  },
]
</script>
```

### 9. 自定义空状态

```vue
<template>
  <Table v-model="dataSource" :columns="columns">
    <template #empty>
      <div class="flex flex-col items-center gap-4 py-12">
        <div class="text-6xl">📭</div>
        <div class="text-lg font-medium text-gray-500">暂无数据</div>
        <Button variant="default" @click="addData">添加数据</Button>
      </div>
    </template>
  </Table>
</template>
```

### 10. 固定表头

```vue
<template>
  <div class="max-h-96 overflow-auto">
    <Table v-model="dataSource" :columns="columns" :sticky="true" />
  </div>
</template>
```

### 11. 行点击事件

```vue
<script setup lang="ts">
const handleRowClick = (record: DataType, index: number) => {
  console.log('点击了行:', record, index)
  // 可以在这里处理行点击，比如跳转到详情页
}
</script>

<template>
  <Table v-model="dataSource" :columns="columns" @rowClick="handleRowClick" />
</template>
```

### 12. 嵌套数据访问

```vue
<script setup lang="ts">
const columns: TableColumn[] = [
  {
    key: 'userName',
    title: '用户名',
    dataIndex: ['user', 'name'], // 访问 record.user.name
  },
  {
    key: 'city',
    title: '城市',
    dataIndex: ['address', 'city', 'name'], // 访问 record.address.city.name
  },
]
</script>
```

## 完整示例

查看以下示例文件获取更多用法：

- `examples/BasicUsage.vue` - 基础用法示例
- `examples/AdvancedUsage.vue` - 高级用法示例（自定义渲染、插槽等）

## 注意事项

1. **rowKey**: 确保每行数据有唯一的 key，默认使用 `id` 字段
2. **性能**: 对于大量数据，建议配合分页组件使用
3. **排序**: 内置排序只支持本地排序，服务端排序需要自行处理 `change` 事件
4. **固定列**: 目前 `fixed` 属性暂未实现，将在后续版本中添加
5. **响应式**: 表格在小屏幕上会自动横向滚动

## TypeScript 支持

组件提供完整的类型定义：

```typescript
import Table, { type TableColumn, type SortState } from '@/components/ui/Table/index.vue'

interface MyDataType {
  id: number
  name: string
  // ...
}

// 泛型支持
const columns: TableColumn<MyDataType>[] = [...]
const dataSource: MyDataType[] = [...]
```

## 样式定制

组件使用 Tailwind CSS 构建，支持深色模式，并采用现代化毛玻璃效果设计。

### 毛玻璃效果（Glassmorphism）

表格采用了流行的毛玻璃设计风格：

- **半透明背景**：`bg-white/80 dark:bg-gray-900/80` - 80% 不透明度
- **模糊效果**：`backdrop-blur-xl` - 背景模糊创造毛玻璃质感
- **柔和阴影**：`shadow-xl shadow-gray-200/50` - 带透明度的阴影
- **渐变表头**：`bg-gradient-to-br from-gray-50/90 to-gray-100/90` - 渐变色表头
- **悬停动画**：`hover:backdrop-blur-lg` - 悬停时增强模糊效果

### 主要样式类

- **表格容器**：`backdrop-blur-xl bg-white/80 shadow-xl`
- **表头**：`bg-gradient-to-br from-gray-50/90 to-gray-100/90 backdrop-blur-xl`
- **边框**：`border-white/20 dark:border-gray-700/50` - 半透明边框
- **悬停行**：`hover:bg-gradient-to-r hover:from-gray-50/80 hover:shadow-md`
- **选中行**：`bg-gradient-to-r from-blue-50/80 to-blue-50/20 shadow-md`
- **斑马纹**：`bg-gradient-to-r from-gray-50/30 to-transparent`

### 动画效果

组件内置了流畅的过渡动画：

```css
transition-all duration-300  /* 平滑过渡 */
hover:scale-105             /* 悬停缩放 */
animate-in fade-in          /* 淡入动画 */
```

### 自定义样式

可以通过覆盖 Tailwind 类来自定义样式：

```vue
<Table class="my-custom-table" :columns="columns">
  <!-- 在全局 CSS 中覆盖样式 -->
</Table>
```

```css
/* 自定义毛玻璃效果 */
.my-custom-table {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.7);
}

/* 自定义悬停效果 */
.my-custom-table tbody tr:hover {
  background: linear-gradient(to right, rgba(59, 130, 246, 0.1), transparent);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
```

### 完整示例

查看 `examples/ModernStyle.vue` 了解完整的毛玻璃效果展示。
