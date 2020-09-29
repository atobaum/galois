module.exports = {
  clearMocks: true,
  maxWorkers: 1,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/*.test.[jt]s",
    "**/__tests__/**/*.[jt]s",
    "!**/__tests__/coverage/**",
    "!**/__tests__/utils/**",
    "!**/__tests__/images/**",
  ],
  globalSetup: "<rootDir>/src/test/jest-global-setup.ts",
  globalTeardown: "<rootDir>/src/test/jest-global-teardown.ts",
};
