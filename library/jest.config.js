/** @type {import('jest').Config} */
const config = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testRegex: '\\.test\\.tsx?$',
}

module.exports = config
