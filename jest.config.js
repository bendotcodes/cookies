/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  modulePathIgnorePatterns: ['<rootDir>/e2e/'],
  collectCoverageFrom: [
    'packages/react-cookie/src/**/*.{js,jsx,ts,tsx}',
    'packages/universal-cookie/src/**/*.{js,jsx,ts,tsx}',
    '!packages/react-cookie-demo/',
    '!<rootDir>/node_modules/',
  ],
};
