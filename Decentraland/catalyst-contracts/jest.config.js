module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {tsconfig: "test/tsconfig.json"}]
  },
  testMatch: ['**/*.spec.(ts)'],
  testEnvironment: 'node'
}
