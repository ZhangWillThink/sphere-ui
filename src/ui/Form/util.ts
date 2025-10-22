import type { FormRule } from './type'

import { isArray, isBoolean, isNil, isNumber, isObject, isString } from 'lodash-es'

interface ValidationResult {
  isValid: boolean
  failedRule?: FormRule
}

/**
 * 验证数值范围（用于数字类型）
 * @param value - 要验证的数值
 * @param min - 最小值
 * @param max - 最大值
 * @returns 是否在范围内
 */
function validateNumberRange(value: number, min?: number, max?: number): boolean {
  if (isNumber(min) && value < min) return false
  if (isNumber(max) && value > max) return false
  return true
}

/**
 * 验证长度范围（用于字符串和数组）
 * @param length - 要验证的长度
 * @param min - 最小长度
 * @param max - 最大长度
 * @returns 长度是否在范围内
 */
function validateLengthRange(length: number, min?: number, max?: number): boolean {
  if (isNumber(min) && length < min) return false
  if (isNumber(max) && length > max) return false
  return true
}

/**
 * 验证字段值是否符合指定规则
 * @param rule - 验证规则
 * @param value - 要验证的值
 * @returns 验证是否通过
 */
export function validateField(rule: FormRule, value: any): boolean {
  // 必填验证
  if (rule.required && (isNil(value) || value === '')) {
    return false
  }

  // 类型验证
  if (rule.type) {
    switch (rule.type) {
      case 'number':
        if (!isNumber(value)) return false
        return validateNumberRange(value, rule.min, rule.max)

      case 'string':
        if (!isString(value)) return false
        return validateLengthRange(value.length, rule.min, rule.max)

      case 'boolean':
        return isBoolean(value)

      case 'array':
        if (!isArray(value)) return false
        return validateLengthRange(value.length, rule.min, rule.max)

      case 'object':
        return isObject(value)

      default:
        // 未知类型，跳过类型验证
        break
    }
  }

  // 无类型定义时的范围验证（根据值的实际类型推断）
  if (!rule.type && (isNumber(rule.min) || isNumber(rule.max))) {
    if (isNumber(value)) {
      return validateNumberRange(value, rule.min, rule.max)
    }
    if (isString(value) || isArray(value)) {
      return validateLengthRange(value.length, rule.min, rule.max)
    }
  }

  // 枚举验证
  if (rule.enum && !rule.enum.includes(value)) {
    return false
  }

  // 正则表达式验证
  if (rule.pattern) {
    if (!isString(value)) return false
    return rule.pattern.test(value)
  }

  // 自定义验证器
  if (rule.validator) {
    try {
      return rule.validator()
    } catch (error) {
      console.warn('Validator function threw an error:', error)
      return false
    }
  }

  return true
}

/**
 * 按顺序验证字段值是否符合规则数组中的所有规则
 *
 * @param rules - 验证规则数组，按顺序执行验证
 * @param value - 要验证的值
 * @returns 验证结果，包含是否通过和失败的规则信息
 *
 * @example
 * ```typescript
 * const rules = [
 *   { required: true, message: '请输入邮箱' },
 *   { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入正确的邮箱格式' }
 * ]
 *
 * const result = validateFieldWithRules(rules, 'test@example.com')
 * if (!result.isValid) {
 *   console.log(result.failedRule?.message)
 * }
 * ```
 */
export function validateFieldWithRules(rules: FormRule[], value: any): ValidationResult {
  // 空规则数组或 null/undefined 视为验证通过
  if (!rules || rules.length === 0) {
    return { isValid: true }
  }

  // 按顺序验证规则，遇到第一个失败的规则立即返回
  for (const rule of rules) {
    if (!validateField(rule, value)) {
      return {
        isValid: false,
        failedRule: rule,
      }
    }
  }

  return { isValid: true }
}
