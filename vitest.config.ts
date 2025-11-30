import { defineConfig } from 'vitest/config'
import path from 'node:path'

const alias = {
  '@': path.resolve(__dirname, './src'),
}

export default defineConfig({
  test: {
    globals: true,
    reporters: ['verbose'],
    disableConsoleIntercept: true,
    include: ['**/*.test.ts', '**/*.e2e-test.ts', '**/*.spec.ts'],
    // timeout for test
    testTimeout: 9999999,
    // timeout for afterAll, afterEach, beforeEach, beforeAll
    hookTimeout: 9999999,
    alias,
    projects: [
      {
        extends: true,
        test: {
          exclude: ['**/client/**'],
          name: 'main',
        },
      },
      {
        extends: true,
        test: {
          include: ['**/client/**/.spec'],
          name: 'client',
        },
      },
    ],
  },
  resolve: {
    alias,
  },
})
