# Table 组件 - 快速开始

## 🚀 5 分钟上手

### 1. 最简单的示例

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Table, type TableColumn } from '@/components/ui'

const columns: TableColumn[] = [
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'age', title: '年龄', dataIndex: 'age' },
]

const dataSource = ref([
  { id: 1, name: '张三', age: 28 },
  { id: 2, name: '李四', age: 32 },
])
</script>

<template>
  <Table v-model="dataSource" :columns="columns" />
</template>
```

### 2. 添加边框和排序

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
    align: 'center', // 居中对齐
  },
]
</script>

<template>
  <Table v-model="dataSource" :columns="columns" :bordered="true" :hoverable="true" />
</template>
```

### 3. 自定义列内容

```vue
<template>
  <Table v-model="dataSource" :columns="columns">
    <!-- 使用插槽自定义列 -->
    <template #column-status="{ text }">
      <span :class="text === 'active' ? 'text-green-600' : 'text-red-600'">
        {{ text === 'active' ? '✅ 活跃' : '⛔ 禁用' }}
      </span>
    </template>

    <template #column-actions="{ record }">
      <button @click="handleEdit(record)">编辑</button>
      <button @click="handleDelete(record)">删除</button>
    </template>
  </Table>
</template>
```

### 4. 添加行选择

```vue
<script setup lang="ts">
const selectedRowKeys = ref<number[]>([])

const rowSelection = {
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys, selectedRows) => {
    selectedRowKeys.value = keys
    console.log('选中的行:', selectedRows)
  },
}
</script>

<template>
  <div>
    <p>已选中 {{ selectedRowKeys.length }} 项</p>
    <Table v-model="dataSource" :columns="columns" :row-selection="rowSelection" />
  </div>
</template>
```

### 5. 加载状态

```vue
<script setup lang="ts">
const loading = ref(false)

const loadData = async () => {
  loading.value = true
  try {
    // 模拟 API 请求
    const data = await fetch('/api/users').then(r => r.json())
    dataSource.value = data
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Table v-model="dataSource" :columns="columns" :loading="loading" />
</template>
```

## 📦 常用配置组合

### 企业级表格配置

```vue
<Table
  v-model="dataSource"
  :columns="columns"
  :bordered="true"
  :hoverable="true"
  :striped="true"
  :loading="loading"
  :row-selection="rowSelection"
  size="md"
  @rowClick="handleRowClick"
  @change="handleTableChange"
/>
```

### 紧凑型表格

```vue
<Table v-model="dataSource" :columns="columns" size="sm" :bordered="true" />
```

### 详细信息表格

```vue
<Table v-model="dataSource" :columns="columns" size="lg" :hoverable="true" />
```

## 🎯 TypeScript 使用

```typescript
import { ref } from 'vue'
import { Table, type TableColumn } from '@/components/ui'

// 定义数据类型
interface User {
  id: number
  name: string
  age: number
  email: string
  status: 'active' | 'inactive'
}

// 使用泛型
const columns: TableColumn<User>[] = [
  { key: 'name', title: '姓名', dataIndex: 'name', sortable: true },
  { key: 'age', title: '年龄', dataIndex: 'age', align: 'center' },
  { key: 'email', title: '邮箱', dataIndex: 'email' },
  { key: 'status', title: '状态', dataIndex: 'status' },
]

const dataSource = ref<User[]>([])
```

## 💡 常见场景

### 场景 1: 用户列表

```vue
<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

const columns: TableColumn<User>[] = [
  { key: 'name', title: '用户名', dataIndex: 'name', width: 150 },
  { key: 'email', title: '邮箱', dataIndex: 'email' },
  { key: 'role', title: '角色', dataIndex: 'role', width: 100 },
  { key: 'status', title: '状态', dataIndex: 'status', width: 100 },
  { key: 'actions', title: '操作', width: 150 },
]
</script>

<template>
  <Table v-model="users" :columns="columns" :bordered="true">
    <template #column-status="{ text }">
      <Tag :variant="text === 'active' ? 'success' : 'error'">
        {{ text }}
      </Tag>
    </template>

    <template #column-actions="{ record }">
      <Button size="sm" @click="editUser(record)">编辑</Button>
      <Button size="sm" variant="destructive" @click="deleteUser(record)"> 删除 </Button>
    </template>
  </Table>
</template>
```

### 场景 2: 订单列表

```vue
<script setup lang="ts">
interface Order {
  id: string
  orderNo: string
  customer: string
  amount: number
  status: 'pending' | 'paid' | 'shipped' | 'completed'
  createdAt: string
}

const columns: TableColumn<Order>[] = [
  { key: 'orderNo', title: '订单号', dataIndex: 'orderNo', width: 150 },
  { key: 'customer', title: '客户', dataIndex: 'customer' },
  {
    key: 'amount',
    title: '金额',
    dataIndex: 'amount',
    align: 'right',
    sortable: true,
  },
  { key: 'status', title: '状态', dataIndex: 'status', width: 100 },
  { key: 'createdAt', title: '创建时间', dataIndex: 'createdAt', sortable: true },
]
</script>

<template>
  <Table v-model="orders" :columns="columns">
    <template #column-amount="{ text }">
      <span class="font-semibold text-green-600"> ¥{{ text.toFixed(2) }} </span>
    </template>

    <template #column-status="{ text }">
      <Tag
        :variant="
          text === 'completed'
            ? 'success'
            : text === 'shipped'
              ? 'primary'
              : text === 'paid'
                ? 'warning'
                : 'default'
        "
      >
        {{ text }}
      </Tag>
    </template>
  </Table>
</template>
```

### 场景 3: 数据报表

```vue
<script setup lang="ts">
const columns: TableColumn[] = [
  { key: 'date', title: '日期', dataIndex: 'date', sortable: true },
  {
    key: 'views',
    title: '浏览量',
    dataIndex: 'views',
    align: 'right',
    sortable: true,
  },
  {
    key: 'clicks',
    title: '点击量',
    dataIndex: 'clicks',
    align: 'right',
    sortable: true,
  },
  {
    key: 'conversion',
    title: '转化率',
    dataIndex: 'conversion',
    align: 'right',
  },
]
</script>

<template>
  <Table v-model="reportData" :columns="columns" :striped="true" :bordered="true" size="sm">
    <template #column-conversion="{ text }">
      <span :class="text > 5 ? 'text-green-600' : 'text-red-600'"> {{ text }}% </span>
    </template>
  </Table>
</template>
```

## 🔥 进阶技巧

### 1. 动态列

```vue
<script setup lang="ts">
const showEmail = ref(true)

const columns = computed(() => {
  const cols: TableColumn[] = [{ key: 'name', title: '姓名', dataIndex: 'name' }]

  if (showEmail.value) {
    cols.push({ key: 'email', title: '邮箱', dataIndex: 'email' })
  }

  cols.push({ key: 'age', title: '年龄', dataIndex: 'age' })

  return cols
})
</script>
```

### 2. 服务端排序

```vue
<script setup lang="ts">
const handleTableChange = (pagination: any, filters: any, sorter: SortState) => {
  if (sorter.order) {
    // 发送请求到服务端
    fetchData({
      sortField: sorter.key,
      sortOrder: sorter.order,
    })
  }
}
</script>
```

### 3. 禁用特定行的选择

```vue
<script setup lang="ts">
const rowSelection = {
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys, rows) => {
    selectedRowKeys.value = keys
  },
  getCheckboxProps: record => ({
    disabled: record.status === 'inactive', // 禁用状态为 inactive 的行
  }),
}
</script>
```

## 📚 下一步

- 查看 [完整 API 文档](./README.md)
- 查看 [基础示例](./examples/BasicUsage.vue)
- 查看 [高级示例](./examples/AdvancedUsage.vue)

## ❓ 常见问题

**Q: 如何设置默认排序？**
A: 组件本身不存储排序状态，你可以在初始化时对数据进行排序。

**Q: 支持固定列吗？**
A: 当前版本暂不支持，将在后续版本中添加。

**Q: 如何实现分页？**
A: 配合 `Pagination` 组件使用：

```vue
<Table v-model="currentPageData" :columns="columns" />
<Pagination v-model:currentPage="page" v-model:pageSize="pageSize" :total="total" />
```

**Q: 表格数据很多时如何优化性能？**
A:

1. 使用分页限制每页数据量
2. 使用 `rowKey` 优化 Vue 的列表渲染
3. 避免在 `render` 中进行复杂计算

Happy coding! 🎉
