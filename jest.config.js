/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "/node_modules/",
  ],
  transform: {
    "^.+\\.ts?$": ["ts-jest",{}],
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [],
  preset: 'ts-jest',
};