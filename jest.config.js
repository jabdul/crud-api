module.exports = {
  "moduleFileExtensions": ["js"],
  "moduleDirectories": ["node_modules"],
  "testRegex": ".*\\.test\\.js$",
  "collectCoverageFrom": [
    "src/**/*.js"
  ],
  "reporters": ["default", "jest-junit"],
  "coverageThreshold": {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  },
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ['<rootDir>/test/utils/databaseCleaner.ts'],
  testEnvironment: "node",
  roots: [
    "./src/"
  ]
}
