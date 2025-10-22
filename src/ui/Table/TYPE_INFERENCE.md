# Table 组件 - 类型推导指南

本指南说明如何在使用 Table 组件时获得完整的 TypeScript 类型推导和智能提示。

## 问题

默认情况下，插槽参数的类型可能是 `any`，这会导致失去类型检查和智能提示：

```vue
<template>
  <Table v-model="dataSource" :columns="columns">
    <!-- ❌ text 的类型是 any，没有类型提示 -->
    <template #column-status="{ text }">
      <Tag>{{ text }}</Tag>
    </template>
  </Table>
</template>
```

## 解决方案

通过在插槽参数中添加类型注解，可以获得完整的类型推导：

### 1. 定义数据类型

首先，为你的数据定义明确的 TypeScript 类型：

```typescript
interface User {
  id: number
  name: string
  age: number
  email: string
  status: 'active' | 'inactive' | 'pending'
  tags: string[]
}
```

### 2. 使用泛型约束

在定义 columns 时使用泛型：

```typescript
import { type TableColumn } from '@/components/ui'

const columns: TableColumn<User>[] = [
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'status', title: '状态', dataIndex: 'status' },
  { key: 'tags', title: '标签', dataIndex: 'tags' },
]

const dataSource = ref<User[]>([...])
```

### 3. 插槽中添加类型注解

在插槽参数中显式声明类型：

```vue
<template>
  <Table v-model="dataSource" :columns="columns">
    <!-- ✅ text 的类型是 string[]，record 的类型是 User -->
    <template #column-tags="{ text }: { text: string[]; record: User; index: number }">
      <Tag v-for="tag in text" :key="tag">{{ tag }}</Tag>
    </template>

    <!-- ✅ text 的类型是 'active' | 'inactive' | 'pending' -->
    <template #column-status="{ text }: { text: User['status']; record: User; index: number }">
      <!-- 完整的类型检查和智能提示 -->
      <Tag :variant="text === 'active' ? 'success' : 'error'">{{ text }}</Tag>
    </template>

    <!-- ✅ record 具有完整的 User 类型 -->
    <template #column-actions="{ record }: { text: any; record: User; index: number }">
      <Button @click="handleEdit(record)"> 编辑 {{ record.name }} </Button>
    </template>
  </Table>
</template>
```

## 完整示例

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Table, type TableColumn } from '@/components/ui'

// 1. 定义数据类型
interface User {
  id: number
  name: string
  age: number
  email: string
  status: 'active' | 'inactive' | 'pending'
  tags: string[]
}

// 2. 使用泛型约束
const columns: TableColumn<User>[] = [
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'age', title: '年龄', dataIndex: 'age' },
  { key: 'status', title: '状态', dataIndex: 'status' },
  { key: 'tags', title: '标签', dataIndex: 'tags' },
  { key: 'actions', title: '操作' },
]

const dataSource = ref<User[]>([
  {
    id: 1,
    name: '张三',
    age: 28,
    email: 'zhangsan@example.com',
    status: 'active',
    tags: ['前端', 'Vue'],
  },
])

const handleEdit = (user: User) => {
  console.log('编辑用户:', user)
}
</script>

<template>
  <Table v-model="dataSource" :columns="columns">
    <!-- 3. 在插槽中添加类型注解 -->
    <template #column-status="{ text }: { text: User['status']; record: User; index: number }">
      <span :class="text === 'active' ? 'text-green-600' : 'text-red-600'">
        {{ text }}
      </span>
    </template>

    <template #column-tags="{ text }: { text: string[]; record: User; index: number }">
      <span v-for="tag in text" :key="tag" class="tag">{{ tag }}</span>
    </template>

    <template #column-actions="{ record }: { text: any; record: User; index: number }">
      <button @click="handleEdit(record)">编辑</button>
    </template>
  </Table>
</template>
```

## 类型推导的好处

添加类型注解后，你将获得：

### ✅ 智能提示

在 VSCode 中编辑时，会获得完整的智能提示：

```vue
<template #column-status="{ text }: { text: User['status']; ... }">
  <!-- 输入 text. 时会提示 'active' | 'inactive' | 'pending' -->
  <Tag :variant="text === 'active' ? 'success' : 'error'">
    {{ text }}
  </Tag>
</template>
```

### ✅ 类型检查

TypeScript 会检查类型使用是否正确：

```vue
<template #column-age="{ text }: { text: number; ... }">
  <!-- ✅ 正确：number 类型可以调用 toFixed -->
  <span>{{ text.toFixed(0) }}</span>

  <!-- ❌ 错误：TypeScript 会报错 -->
  <span>{{ text.toUpperCase() }}</span>
</template>
```

### ✅ 重构安全

当修改数据类型时，所有使用该类型的地方都会得到错误提示：

```typescript
// 修改 User 接口
interface User {
  status: 'enabled' | 'disabled' | 'pending'  // 改变了状态值
}

// 插槽中的代码会立即报错，提示你需要更新
<template #column-status="{ text }: { text: User['status']; ... }">
  <!-- TypeScript 会提示 'active' 不是有效的状态值 -->
  <Tag :variant="text === 'active' ? 'success' : 'error'">
</template>
```

### ✅ 联合类型支持

对于联合类型，可以获得精确的类型推导：

```vue
<template #column-status="{ text }: { text: 'active' | 'inactive' | 'pending'; ... }">
  <!-- VSCode 会在你输入时提示这三个可能的值 -->
  <span v-if="text === 'active'">活跃</span>
  <span v-else-if="text === 'inactive'">禁用</span>
  <span v-else>待审核</span>
</template>
```

## 使用 render

在列配置中使用 `render` 时，也可以添加类型注解：

```typescript
const columns: TableColumn<User>[] = [
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    render: ({ text, record, index }) => {
      // text 是 User['name']，即 string
      // record 是 User
      // index 是 number
      return text.toUpperCase()
    },
  },
]
```

虽然 `render` 函数参数的类型推导不如插槽完善，但你仍然可以：

1. 在函数内部使用 TypeScript 的类型推导
2. 利用 `record` 参数的 `User` 类型获取其他字段
3. 使用类型断言来明确类型

## 最佳实践

### 1. 始终定义数据类型

```typescript
// ✅ 好
interface User {
  id: number
  name: string
  status: 'active' | 'inactive'
}

// ❌ 不好
const dataSource = ref([{ id: 1, name: '张三', status: 'active' }])
```

### 2. 使用泛型约束

```typescript
// ✅ 好
const columns: TableColumn<User>[] = [...]

// ❌ 不好
const columns = [...]
```

### 3. 在插槽中显式标注类型

```vue
<!-- ✅ 好 -->
<template #column-status="{ text }: { text: User['status']; record: User; index: number }">
  <!-- ❌ 不好 -->
  <template #column-status="{ text }"></template>
</template>
```

### 4. 使用类型索引访问

```typescript
// ✅ 好：使用类型索引
{ text }: { text: User['status']; ... }

// ✅ 也可以：直接使用字面量类型
{ text }: { text: 'active' | 'inactive' | 'pending'; ... }
```

### 5. 提取公共类型

对于复杂的插槽参数类型，可以提取为类型别名：

```typescript
import type { TableSlotParams } from '@/components/ui'

type UserSlotParams = TableSlotParams<User, keyof User>

// 然后在模板中使用
<template #column-status="params: UserSlotParams">
  <!-- params.text, params.record, params.index 都有正确的类型 -->
</template>
```

## 常见问题

### Q: 为什么不能自动推导插槽参数类型？

A: Vue 3 的模板类型推导有限制，无法自动从泛型组件推导出插槽参数的精确类型。通过显式添加类型注解，我们可以获得完整的类型支持。

### Q: 类型注解看起来很冗长，有更简洁的方法吗？

A: 虽然类型注解稍显冗长，但这是目前在 Vue 3 模板中获得完整类型支持的最佳方式。好处是你只需要在定义时写一次，之后就可以享受完整的类型检查和智能提示。

### Q: record 参数的类型总是正确吗？

A: 是的，因为我们在 `columns` 定义时使用了 `TableColumn<User>` 泛型约束，所以 `record` 参数始终是 `User` 类型。

### Q: 能否省略 text 的类型注解？

A: 可以，但这样 `text` 会是 `any` 类型。为了获得最好的类型支持，建议始终标注类型。

## 总结

通过以下三个步骤，可以在 Table 组件中获得完整的类型推导：

1. **定义明确的数据类型**：使用 `interface` 或 `type`
2. **使用泛型约束**：`TableColumn<YourType>[]`
3. **显式类型注解**：在插槽参数中添加类型注解

虽然需要额外编写类型注解，但这能显著提高开发体验和代码质量，特别是在大型项目中，类型安全带来的好处远超过额外的代码量。
