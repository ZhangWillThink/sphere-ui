import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,

  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',

      'vue/block-lang': 'off',
    },
  },

  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          // Put `import type ...` first, then builtin, external, internal, etc.
          groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          // Ensure specific path ordering for vue, api, components
          pathGroups: [
            { pattern: 'vue', group: 'external', position: 'before' },
            { pattern: '@/api/**', group: 'internal', position: 'after' },
            { pattern: '@/components/**', group: 'internal', position: 'after' },
          ],
          // Don't apply pathGroups to type-only imports
          pathGroupsExcludedImportTypes: ['type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  prettierConfig,
)
