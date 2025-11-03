import './style.css'

// 重新导出所有组件和类型
export * from './ui'

// 导入组件用于默认导出
import {
  Button,
  Card,
  Checkbox,
  Collapse,
  CollapseTransition,
  ContextMenu,
  Description,
  Dialog,
  Divider,
  Form,
  FormItem,
  Input,
  Loading,
  Menu,
  Pagination,
  Popover,
  Radio,
  Select,
  Switch,
  Slider,
  Table,
  Tabs,
  Tag,
  Textarea,
  Tooltip,
} from './ui'

// 默认导出（用于 Vue.use() 安装）
const components = {
  Button,
  Card,
  Checkbox,
  Collapse,
  CollapseTransition,
  ContextMenu,
  Description,
  Dialog,
  Divider,
  Form,
  FormItem,
  Input,
  Loading,
  Menu,
  Pagination,
  Popover,
  Radio,
  Select,
  Switch,
  Slider,
  Table,
  Tabs,
  Tag,
  Textarea,
  Tooltip,
}

export default components
