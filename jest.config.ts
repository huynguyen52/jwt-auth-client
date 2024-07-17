// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // Path to your setupTests.ts
  moduleNameMapper: {
    // Handle module aliases (if you have any in your project)
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    // Handle CSS imports (if you are importing CSS in your components)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    // Transform files with ts-jest
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
