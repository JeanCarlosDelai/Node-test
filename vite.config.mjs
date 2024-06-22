/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';
import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

dotenv.config();

export const userConfig = {
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  test: {
    globals: true,
    // include: ['**/*.test.ts'],
    root: './',
    coverage: {
      exclude: ['**/*.module.ts', '**/*spec.ts', '**/*.filter.ts', '**/*config.ts', '**/*config.js', '**/*.interceptor.ts', '**/*.eslintrc.js', '**/*main.ts', '**/*swaggerSetup.ts ', '**/*config.mjs  ']
    },
  },
}

export default defineConfig(userConfig)
