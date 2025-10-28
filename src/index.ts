import Button from './ui/Button/index.vue'
import Card from './ui/Card/index.vue'
import Checkbox from './ui/Checkbox/index.vue'
import Collapse from './ui/Collapse/index.vue'
import ContextMenu from './ui/ContextMenu/index.vue'
import Description from './ui/Description/index.vue'
import Dialog from './ui/Dialog/index.vue'
import Divider from './ui/Divider/index.vue'
import { Form, FormItem } from './ui/Form'
import Input from './ui/Input/index.vue'
import Loading from './ui/Loading/index.vue'
import Menu from './ui/Menu/index.vue'
import Message from './ui/Message'
import Pagination from './ui/Pagination/index.vue'
import Popover from './ui/Popover/index.vue'
import Radio from './ui/Radio/index.vue'
import Select from './ui/Select/index.vue'
import Table from './ui/Table/index.vue'
import Tabs from './ui/Tabs/index.vue'
import Tag from './ui/Tag/index.vue'
import Textarea from './ui/Textarea/index.vue'
import Tooltip from './ui/Tooltip/index.vue'
import { CollapseTransition } from './ui/Transition'
export type { CollapseItem, CollapseProps } from './ui/Collapse/types'
export type {
  DescriptionItem,
  DescriptionLabelStyle,
  DescriptionProps,
} from './ui/Description/types'
export type { TabsEmits, TabsItem, TabsProps, TabsSlots } from './ui/Tabs/types'

// 命名导出
export {
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
  Message,
  Pagination,
  Popover,
  Radio,
  Select,
  Table,
  Tabs,
  Tag,
  Textarea,
  Tooltip,
}

// 导出组件类型
export type {
  RowSelection,
  SortState,
  TableColumn,
  TableEmits,
  TableProps,
  TableSize,
  TableSlotParams,
} from './ui/Table/types'

// 导出 Button 类型已在顶部导出

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
  Table,
  Tabs,
  Tag,
  Textarea,
  Tooltip,
}

export default components
