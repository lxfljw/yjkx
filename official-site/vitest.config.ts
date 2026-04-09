import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['app/components/__tests__/**/*.test.tsx'],
    passWithNoTests: true,
  },
})
