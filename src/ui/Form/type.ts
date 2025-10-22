export type FormRule = {
  required?: boolean
  message?: string
  type?: 'array' | 'number' | 'string' | 'object' | 'boolean'
  min?: number
  max?: number
  enum?: any[]
  pattern?: RegExp
  validator?: () => boolean
}

export interface FormValidate {
  /** @description 校验信息，key 为 name，value 为校验规则数组 */
  validateInfo: Map<string, FormRule[] | undefined>
  /** @description 校验结果，key 为 name，value 为校验是否通过 */
  validateResult: Map<string, boolean>
  /** @description 校验错误信息，key 为 name，value 为失败的规则 */
  validateErrors: Map<string, FormRule | undefined>
}

export interface FormContextProps {
  value?: Record<string, any>
}

export type FormContextValue = FormContextProps & FormValidate

export interface FormContextRef {
  validateInfo: FormValidate['validateInfo']
  validateResult: FormValidate['validateResult']
  validateErrors: FormValidate['validateErrors']
  handleValidate: () => boolean
}
