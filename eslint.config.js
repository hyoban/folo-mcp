// @ts-check
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig(
  {},
  {
    files: ['package.json'],
    rules: {
      'package-json/no-empty-fields': 'warn',
    },
  },
)
