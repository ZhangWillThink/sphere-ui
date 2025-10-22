# Table 组件 - 样式定制指南

## 🎨 现代化毛玻璃设计

Table 组件采用了流行的毛玻璃效果（Glassmorphism）设计风格，提供现代、优雅的视觉体验。

## 核心设计元素

### 1. 毛玻璃效果

毛玻璃效果通过以下 CSS 属性实现：

```css
backdrop-filter: blur(48px);           /* backdrop-blur-xl */
background: rgba(255, 255, 255, 0.8);  /* bg-white/80 */
```

**关键类名：**
- `backdrop-blur-xl` - 超强模糊效果（48px）
- `backdrop-blur-lg` - 强模糊效果（24px）
- `backdrop-blur-md` - 中等模糊效果（12px）
- `backdrop-blur-sm` - 轻微模糊效果（4px）

### 2. 半透明背景

使用带透明度的背景色创造通透感：

```css
/* 浅色模式 */
bg-white/80              /* 80% 不透明度 */
bg-gray-50/90            /* 90% 不透明度 */

/* 深色模式 */
dark:bg-gray-900/80      /* 80% 不透明度 */
dark:bg-gray-800/90      /* 90% 不透明度 */
```

### 3. 渐变色

表头和选中行使用渐变色增强视觉层次：

```css
/* 表头渐变 */
bg-gradient-to-br from-gray-50/90 to-gray-100/90

/* 悬停行渐变 */
hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-transparent

/* 选中行渐变 */
bg-gradient-to-r from-blue-50/80 to-blue-50/20
```

### 4. 柔和阴影

带透明度的阴影创造浮动效果：

```css
shadow-xl shadow-gray-200/50          /* 浅色模式 */
dark:shadow-black/50                  /* 深色模式 */
```

### 5. 半透明边框

使用低不透明度的边框保持轻盈感：

```css
border-white/20                       /* 浅色模式 */
dark:border-gray-700/50               /* 深色模式 */
```

## 详细样式说明

### 表格容器

```vue
<div class="
  w-full overflow-auto rounded-xl
  backdrop-blur-xl
  bg-white/80 dark:bg-gray-900/80
  shadow-xl shadow-gray-200/50 dark:shadow-black/50
  border border-white/20 dark:border-gray-700/50
">
```

**效果：**
- 圆角：`rounded-xl` (12px)
- 毛玻璃：`backdrop-blur-xl` (48px blur)
- 半透明背景：80% 不透明度
- 大阴影：带 50% 透明度
- 细边框：带 20% 透明度

### 表头样式

```vue
<thead class="
  bg-gradient-to-br from-gray-50/90 to-gray-100/90
  backdrop-blur-xl
  sticky top-0 z-[1]
  shadow-lg shadow-gray-200/20 dark:shadow-black/20
  border-b border-white/30 dark:border-gray-700/50
">
```

**效果：**
- 渐变背景：从浅灰到稍深灰
- 毛玻璃模糊：增强层次感
- 固定定位：滚动时保持可见
- 细微阴影：与内容分离
- 半透明边框：底部分隔线

### 表头单元格（可排序）

```vue
<th class="
  cursor-pointer
  transition-all duration-200
  select-none
  hover:bg-white/60 hover:backdrop-blur-lg
  dark:hover:bg-gray-700/60
">
```

**效果：**
- 指针光标：表示可点击
- 平滑过渡：200ms 动画
- 禁止选择：防止文本选中
- 悬停效果：背景变亮 + 增强模糊

### 数据行

```vue
<tr class="
  cursor-pointer
  transition-all duration-300
  hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-transparent
  hover:shadow-md hover:shadow-gray-200/20
  hover:backdrop-blur-sm
  dark:hover:from-gray-800/50 dark:hover:shadow-black/20
">
```

**效果：**
- 指针光标：表示可点击
- 长过渡：300ms 更平滑
- 渐变悬停：从左到右渐变
- 悬停阴影：轻微浮起效果
- 模糊增强：悬停时更模糊

### 斑马纹行

```vue
<tr class="
  bg-gradient-to-r from-gray-50/30 to-transparent
  dark:from-gray-800/20
">
```

**效果：**
- 淡渐变：30% 不透明度
- 左到右：自然过渡到透明
- 深色模式：更低的不透明度

### 选中行

```vue
<tr class="
  bg-gradient-to-r from-blue-50/80 to-blue-50/20
  shadow-md shadow-blue-200/30
  backdrop-blur-sm
  dark:from-blue-900/30 dark:to-blue-900/10
  dark:shadow-blue-900/20
">
```

**效果：**
- 蓝色渐变：突出选中状态
- 彩色阴影：增强视觉反馈
- 轻微模糊：层次分离
- 深色适配：降低亮度

### 边框样式

```css
/* 表格外边框 */
border-white/20 dark:border-gray-700/50

/* 单元格边框 */
border-r border-white/20 dark:border-gray-700/30

/* 行底边框 */
border-b border-white/20 dark:border-gray-700/30
```

**不透明度选择：**
- 外边框：20-50% (更明显)
- 内边框：20-30% (更淡)

### 加载遮罩

```vue
<div class="
  absolute inset-0 z-10
  flex items-center justify-center
  bg-white/70 backdrop-blur-md
  dark:bg-gray-900/70
">
```

**效果：**
- 覆盖全表：`absolute inset-0`
- 高层级：`z-10` 在内容之上
- 半透明：70% 不透明度
- 中等模糊：保持内容可见

### 空状态

```vue
<div class="
  animate-in fade-in
  flex flex-col items-center gap-2
  duration-500
">
```

**效果：**
- 淡入动画：平滑出现
- 垂直布局：图标和文字居中
- 长动画：500ms 缓慢出现

## 动画效果

### 过渡动画

组件使用 Tailwind 的 transition 实用类：

```css
transition-colors duration-150        /* 颜色过渡 150ms */
transition-all duration-200          /* 全部过渡 200ms */
transition-all duration-300          /* 全部过渡 300ms (行) */
```

**使用场景：**
- `duration-150`：快速反馈（颜色、边框）
- `duration-200`：标准交互（按钮、表头）
- `duration-300`：重要元素（行、卡片）

### 悬停缩放

```css
hover:scale-105                      /* 悬停时放大 5% */
active:scale-95                      /* 点击时缩小 5% */
```

### 淡入动画

```css
animate-in fade-in duration-500      /* 500ms 淡入 */
```

## 深色模式适配

### 原则

1. **降低亮度**：深色模式下使用更低的不透明度
2. **增强对比**：确保文字可读性
3. **统一调性**：保持冷色调或暖色调一致

### 对应关系

| 浅色模式 | 深色模式 | 说明 |
|---------|---------|------|
| `bg-white/80` | `dark:bg-gray-900/80` | 背景 |
| `bg-gray-50` | `dark:bg-gray-800` | 次要背景 |
| `text-gray-900` | `dark:text-gray-100` | 主文字 |
| `text-gray-600` | `dark:text-gray-400` | 次要文字 |
| `border-gray-200` | `dark:border-gray-700` | 边框 |
| `shadow-gray-200/50` | `dark:shadow-black/50` | 阴影 |

## 自定义样式

### 方法 1: 覆盖 Tailwind 类

直接在组件上添加自定义类：

```vue
<Table 
  class="my-custom-table"
  :columns="columns"
/>
```

```css
/* 修改容器背景 */
.my-custom-table > div {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(60px) !important;
}

/* 修改表头颜色 */
.my-custom-table thead {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)) !important;
}
```

### 方法 2: 使用 CSS 变量

定义全局 CSS 变量：

```css
:root {
  --table-bg: rgba(255, 255, 255, 0.8);
  --table-blur: 48px;
  --table-shadow: rgba(0, 0, 0, 0.1);
  --table-border: rgba(255, 255, 255, 0.2);
  --table-hover: rgba(243, 244, 246, 0.8);
}

.dark {
  --table-bg: rgba(17, 24, 39, 0.8);
  --table-shadow: rgba(0, 0, 0, 0.5);
  --table-border: rgba(55, 65, 81, 0.5);
  --table-hover: rgba(31, 41, 55, 0.5);
}
```

### 方法 3: 自定义主题色

修改选中行和悬停的颜色：

```vue
<style scoped>
/* 自定义选中行为紫色主题 */
:deep(tr.selected) {
  background: linear-gradient(to right, 
    rgba(147, 51, 234, 0.2), 
    rgba(147, 51, 234, 0.05)) !important;
  box-shadow: 0 4px 6px rgba(147, 51, 234, 0.1) !important;
}

/* 自定义悬停为绿色主题 */
:deep(tbody tr:hover) {
  background: linear-gradient(to right, 
    rgba(34, 197, 94, 0.15), 
    transparent) !important;
}
</style>
```

## 性能优化

### GPU 加速

使用 transform 和 opacity 触发 GPU 加速：

```css
transform: translateZ(0);           /* 强制 GPU 加速 */
will-change: transform, opacity;    /* 提示浏览器优化 */
```

### 减少重绘

使用 transform 而非 width/height：

```css
/* ✅ 好 - 使用 transform */
hover:scale-105

/* ❌ 不好 - 修改 width */
hover:w-[105%]
```

### 合理使用模糊

模糊是性能密集型操作：

```css
/* ✅ 好 - 仅在必要时使用 */
backdrop-blur-xl              /* 容器 */
hover:backdrop-blur-lg        /* 悬停增强 */

/* ❌ 不好 - 过度使用 */
backdrop-blur-3xl             /* 太强 */
backdrop-blur-xl              /* 每个单元格都模糊 */
```

## 浏览器兼容性

### backdrop-filter 支持

- ✅ Chrome 76+
- ✅ Safari 9+
- ✅ Firefox 103+
- ✅ Edge 79+

### 降级方案

对于不支持 backdrop-filter 的浏览器：

```css
/* 自动降级为纯色背景 */
@supports not (backdrop-filter: blur(1px)) {
  .table-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: none;
  }
}
```

## 最佳实践

### 1. 保持一致性

在整个应用中使用相同的模糊级别和透明度：

```css
/* 统一的模糊级别 */
backdrop-blur-xl    /* 主要容器 */
backdrop-blur-lg    /* 次要元素 */
backdrop-blur-md    /* 细节元素 */
```

### 2. 适度使用动画

避免过度动画影响性能：

```css
/* ✅ 好 - 关键交互有动画 */
transition-colors duration-150

/* ❌ 不好 - 所有属性都动画 */
transition-all duration-1000
```

### 3. 测试对比度

确保深浅模式下文字可读：

```css
/* 使用足够的对比度 */
text-gray-900 dark:text-gray-100     /* 主文字 */
text-gray-600 dark:text-gray-400     /* 次要文字 */
```

### 4. 优雅降级

为不支持新特性的浏览器提供备选方案：

```css
background: rgb(255, 255, 255);              /* 降级方案 */
background: rgba(255, 255, 255, 0.8);        /* 现代浏览器 */
backdrop-filter: blur(48px);                  /* 毛玻璃效果 */
```

## 示例配色方案

### 科技蓝主题

```css
/* 容器 */
bg-blue-50/80 dark:bg-blue-950/80

/* 表头 */
bg-gradient-to-br from-blue-100/90 to-blue-200/90

/* 悬停 */
hover:from-blue-100/80

/* 选中 */
from-blue-200/80 to-blue-100/20
```

### 商务灰主题

```css
/* 容器 */
bg-gray-50/90 dark:bg-gray-900/90

/* 表头 */
bg-gradient-to-br from-gray-100/95 to-gray-200/95

/* 悬停 */
hover:from-gray-100/90

/* 选中 */
from-gray-200/90 to-gray-100/30
```

### 活力紫主题

```css
/* 容器 */
bg-purple-50/80 dark:bg-purple-950/80

/* 表头 */
bg-gradient-to-br from-purple-100/90 to-pink-100/90

/* 悬停 */
hover:from-purple-100/80

/* 选中 */
from-purple-200/80 to-purple-100/20
```

## 调试技巧

### 查看层次结构

使用浏览器开发者工具：

```javascript
// 在控制台查看所有毛玻璃元素
document.querySelectorAll('[class*="backdrop-blur"]')
```

### 性能分析

```javascript
// 检测是否支持 backdrop-filter
CSS.supports('backdrop-filter', 'blur(1px)')
```

### 颜色对比度检查

使用 Chrome DevTools 的对比度检查器确保可访问性。

## 总结

Table 组件的毛玻璃设计融合了：

- 🎨 **半透明背景** - 通透轻盈
- 💎 **模糊效果** - 现代质感  
- ✨ **渐变色彩** - 层次丰富
- 🌊 **流畅动画** - 优雅交互
- 🌓 **深色适配** - 完美支持

这些元素共同创造出现代、优雅、高性能的用户界面。