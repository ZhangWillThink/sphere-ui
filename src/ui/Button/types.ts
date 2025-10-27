import type { ComponentPublicInstance } from 'vue'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'
export type ButtonVariant = 'primary' | 'default' | 'ghost' | 'destructive'

export interface ButtonProps {
  /**
   * 按钮尺寸
   * @default 'md'
   */
  size?: ButtonSize
  /**
   * 按钮变体样式
   * @default 'default'
   */
  variant?: ButtonVariant
  /**
   * 是否显示加载状态
   * @default false
   */
  loading?: boolean
  /**
   * 是否禁用按钮
   * @default false
   */
  disabled?: boolean
}

export interface ButtonSlots {
  /**
   * 按钮默认内容
   */
  default?: () => any
  /**
   * 按钮图标插槽
   */
  icon?: () => any
}

export interface ButtonEmits {
  /**
   * 按钮点击事件
   */
  click: [Event]
}

export type ButtonExpose = any

export type ButtonInstance = ComponentPublicInstance<ButtonProps, ButtonExpose>
