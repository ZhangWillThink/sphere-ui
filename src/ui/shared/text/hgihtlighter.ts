import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  StringLiteralUnion,
  ThemeRegistrationAny,
} from 'shiki'

export const DEFAULT_LANG = 'typescript' as const
export const PASSWORD_MASK_CHAR = '●' as const

export const SUPPORTED_LANGUAGES: BundledLanguage[] = [
  'markdown',
  'md',
  'json',
  'css',
  'javascript',
  'typescript',
  'tsx',
  'jsx',
  'html',
  'bash',
  'shell',
  'python',
  'go',
  'rust',
  'java',
]

const LIGHT_THEME: ThemeRegistrationAny | StringLiteralUnion<BundledTheme> = 'light-plus'
const DARK_THEME: ThemeRegistrationAny | StringLiteralUnion<BundledTheme> = 'dark-plus'

export class HighlighterManager {
  private static instance: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null
  private static initPromise: Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> | null =
    null

  static async getInstance(): Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> {
    if (this.instance) return this.instance

    if (!this.initPromise) {
      this.initPromise = this.createHighlighter()
    }

    this.instance = await this.initPromise
    return this.instance
  }

  private static async createHighlighter(): Promise<
    HighlighterGeneric<BundledLanguage, BundledTheme>
  > {
    const { createHighlighter } = await import('shiki')
    return createHighlighter({
      themes: [LIGHT_THEME, DARK_THEME],
      langs: SUPPORTED_LANGUAGES,
    })
  }

  static async renderCode(text: string, language: string): Promise<string> {
    try {
      const highlighter = await this.getInstance()
      const lang = SUPPORTED_LANGUAGES.includes(language as BundledLanguage)
        ? (language as BundledLanguage)
        : 'text'

      return highlighter.codeToHtml(text, {
        lang,
        themes: {
          dark: DARK_THEME,
          light: LIGHT_THEME,
        },
      })
    } catch (error) {
      console.warn('Failed to highlight code:', error)
      return text
    }
  }
}
