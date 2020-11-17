module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx",
    "!srx/**/*.d.ts",
    "!src/index.tsx",
    "!src/serviceWorker.ts",
  ],
  coveragePathIgnorePatterns: ["/node_modules/", "<rootDir>/**/*.stories.tsx"],
};
