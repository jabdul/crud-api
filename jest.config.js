module.exports = {
  moduleDirectories: ["node_modules"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}"
  ],
  reporters: ["default", "jest-junit"],
  coverageReporters: [
    "html",
    "text",
    "text-summary",
    "lcov"
  ],
  coverageThreshold: {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ['<rootDir>/test/utils/databaseCleaner.ts'],
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  roots: [
    "./src/"
  ],
  testURL: "http://localhost/",
}