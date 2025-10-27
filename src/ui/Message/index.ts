import type { VNode } from 'vue'

import { createVNode, render } from 'vue'
import 'animate.css'
import './style.css'

type MessageType = 'success' | 'warning' | 'info' | 'error'
type MessagePosition = 'top' | 'center' | 'bottom'

export interface MessageOptions {
  message: string | VNode
  type?: MessageType
  duration?: number // ms, <=0 means persistent
  position?: MessagePosition
  closable?: boolean
}

interface MessageInstance {
  id: number
  element: HTMLElement
  timer?: number
  position: MessagePosition
}

/**
 * SphereMessage - 现代化消息提示组件
 * 支持多种类型、位置和自定义配置
 */
class SphereMessage {
  private static instance: SphereMessage
  private instances: MessageInstance[] = []
  private containers: Map<MessagePosition, HTMLElement> = new Map()
  private seed = 1

  private constructor() {}

  static getInstance(): SphereMessage {
    if (!SphereMessage.instance) {
      SphereMessage.instance = new SphereMessage()
    }
    return SphereMessage.instance
  }

  /**
   * 获取或创建指定位置的容器
   */
  private getContainer(position: MessagePosition): HTMLElement {
    if (this.containers.has(position)) {
      return this.containers.get(position)!
    }

    const container = document.createElement('div')
    container.className = `sphere-message-container sphere-message-container--${position}`
    document.body.appendChild(container)
    this.containers.set(position, container)
    return container
  }

  /**
   * 移除指定 ID 的实例记录
   */
  private removeInstance(id: number): void {
    const idx = this.instances.findIndex(i => i.id === id)
    if (idx !== -1) this.instances.splice(idx, 1)
  }

  /**
   * 执行关闭动画并移除元素
   */
  private async closeInstance(instance: MessageInstance): Promise<void> {
    const { element } = instance

    element.classList.add('animate__animated', 'animate__fadeOut')

    return new Promise(resolve => {
      const handleAnimationEnd = () => {
        element.removeEventListener('animationend', handleAnimationEnd)
        if (element.parentNode) {
          element.parentNode.removeChild(element)
        }
        this.removeInstance(instance.id)
        resolve()
      }
      element.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
  }

  /**
   * 创建关闭按钮
   */
  private createCloseButton(onClick: () => void): HTMLElement {
    const btn = document.createElement('button')
    btn.className = 'sphere-message__close'
    btn.innerHTML = '×'
    btn.addEventListener('click', onClick)
    return btn
  }

  /**
   * 显示消息
   */
  show(options: string | MessageOptions): { close: () => Promise<void> } {
    const opts: MessageOptions = typeof options === 'string' ? { message: options } : options
    const id = this.seed++
    const type = opts.type || 'info'
    const position = opts.position || 'top'
    const duration = typeof opts.duration === 'number' ? opts.duration : 3000
    const closable = opts.closable ?? true

    // 创建消息元素
    const element = document.createElement('div')
    element.className = `sphere-message sphere-message--${type}`
    element.setAttribute('data-id', String(id))

    // 创建内容容器
    const contentWrapper = document.createElement('div')
    contentWrapper.className = 'sphere-message__content'

    // 渲染消息内容
    const content = typeof opts.message === 'string' ? opts.message : opts.message
    const vnode = createVNode('div', {}, [content])
    render(vnode, contentWrapper)

    element.appendChild(contentWrapper)

    // 添加关闭按钮
    if (closable) {
      const closeBtn = this.createCloseButton(() => {
        void this.closeInstance(instance)
      })
      element.appendChild(closeBtn)
    }

    // 添加到容器
    const container = this.getContainer(position)
    container.appendChild(element)

    // 入场动画
    element.classList.add('animate__animated', 'animate__fadeIn')

    const instance: MessageInstance = { id, element, position }
    this.instances.push(instance)

    // 自动关闭
    if (duration > 0) {
      const timer = window.setTimeout(() => {
        void this.closeInstance(instance)
      }, duration)
      instance.timer = timer
    }

    const close = async () => {
      if (instance.timer) {
        clearTimeout(instance.timer)
      }
      return this.closeInstance(instance)
    }

    return { close }
  }

  /**
   * 关闭所有消息
   */
  closeAll(): void {
    const copy = this.instances.slice()
    copy.forEach(inst => void this.closeInstance(inst))
  }

  /**
   * 成功消息
   */
  success(message: string | MessageOptions, duration?: number): { close: () => Promise<void> } {
    if (typeof message === 'string') {
      return this.show({ message, type: 'success', duration })
    }
    return this.show({ ...message, type: 'success' })
  }

  /**
   * 警告消息
   */
  warning(message: string | MessageOptions, duration?: number): { close: () => Promise<void> } {
    if (typeof message === 'string') {
      return this.show({ message, type: 'warning', duration })
    }
    return this.show({ ...message, type: 'warning' })
  }

  /**
   * 信息消息
   */
  info(message: string | MessageOptions, duration?: number): { close: () => Promise<void> } {
    if (typeof message === 'string') {
      return this.show({ message, type: 'info', duration })
    }
    return this.show({ ...message, type: 'info' })
  }

  /**
   * 错误消息
   */
  error(message: string | MessageOptions, duration?: number): { close: () => Promise<void> } {
    if (typeof message === 'string') {
      return this.show({ message, type: 'error', duration })
    }
    return this.show({ ...message, type: 'error' })
  }
}

export default SphereMessage.getInstance()
