import type { ComponentPublicInstance, VNodeChild } from 'vue'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'
export type ButtonVariant = 'primary' | 'default' | 'ghost' | 'destructive'

export interface ButtonProps {
  size?: ButtonSize
  variant?: ButtonVariant
  loading?: boolean
  disabled?: boolean
  icon?: VNodeChild
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
