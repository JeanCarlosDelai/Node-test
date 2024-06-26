// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'vitest',
  testRunner_comment:
    'Take a look at https://stryker-mutator.io/docs/stryker-js/vitest-runner for information about the vitest plugin.',
  coverageAnalysis: 'perTest',
  mutate: [
    '**/*.ts',
    '!**/*test.ts',
    '!**/*.js',
    '!**/*.dto.ts',
    '!**/*.routes.ts',
    '!**/*Schema.ts',
    '!**/*config.ts',
    '!**/*app.ts',
    '!**/*server.ts',
    '!**/*dataSource.ts',
    '!**/*Table.ts',
  ],
};
export default config;