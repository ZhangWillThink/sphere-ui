import type { FormContextProps, FormContextRef, FormContextValue, FormRule } from './type'

import { inject, provide, reactive } from 'vue'

import { validateFieldWithRules } from './util'

const FormContextSymbol = Symbol('FormContext')

export function useFormContext() {
  const context = inject<FormContextValue | null>(FormContextSymbol, null)
  if (!context) {
    throw new Error('useFormContext must be used within a Form')
  }
  return context
}

interface FormProviderProps extends FormContextProps {
  ref?: FormContextRef
}

export function useFormProvider(props: FormProviderProps) {
  const validateInfo = reactive<Map<string, FormRule[]>>(new Map<string, FormRule[]>())
  const validateResult = reactive<Map<string, boolean>>(new Map<string, boolean>())
  const validateErrors = reactive<Map<string, FormRule>>(new Map<string, FormRule>())

  const handleValidate = (): boolean => {
    const formValue = props.value
    if (!formValue) return true

    let valid = true
    Object.keys(formValue).forEach(key => {
      const val = formValue[key]
      const rules = validateInfo.get(key)

      if (rules) {
        const { isValid, failedRule } = validateFieldWithRules(rules, val)
        validateResult.set(key, isValid)
        if (failedRule) {
          validateErrors.set(key, failedRule)
        } else {
          validateErrors.delete(key)
        }
        valid = valid && isValid
      }
    })

    return valid
  }

  const contextValue: FormContextValue = {
    value: props.value,
    validateInfo,
    validateResult,
    validateErrors,
  }

  provide(FormContextSymbol, contextValue)

  return {
    validateInfo,
    validateResult,
    validateErrors,
    handleValidate,
  }
}
