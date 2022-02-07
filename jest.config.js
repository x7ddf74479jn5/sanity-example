const nextJest = require("next/jest");

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({ dir: "./" });

// Add any custom config to be passed to Jest
/**
 * @type {import('@jest/types').Config.InitialOptions}
 **/
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest/jest.setup.js"],
  modulePathIgnorePatterns: ["<rootDir>/e2e/"],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    "@/(.*)": "<rootDir>/src/$1",
  }, // Handle module aliases (this will be automatically configured for you soon)
  snapshotResolver: "<rootDir>/jest/jest.snapshot.js",
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
