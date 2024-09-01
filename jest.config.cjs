module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Handle JavaScript files with Babel
    '^.+\\.tsx?$': 'ts-jest' // Handle TypeScript files with ts-jest
  },
  testEnvironment: 'jsdom', // Required for React testing
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Setup file for jest-dom matchers
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy' // Mock CSS imports
  },

};
