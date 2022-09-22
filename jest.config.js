/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "./ts-jest-puppeteer-preset",
  testTimeout: 30000,
  testEnvironment: "node",
  testPathIgnorePatterns: [".d.ts", ".js"],
};
