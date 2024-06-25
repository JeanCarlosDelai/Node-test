import dotenv from 'dotenv';
import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

dotenv.config({ path: '.env.test' });

export const userConfig = {
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  test: {
    globals: true,
    root: './',
    coverage: {
      exclude: ['**/*spec.ts', '**/*.routes.ts', '**/*main.ts', '**/*app.ts', '**/*index.ts', '**/*server.ts', '**/*Table.ts', '**/*Schema.ts', '**/*.dto.ts']
    },
  },
}

export default defineConfig(userConfig)
