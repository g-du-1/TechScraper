/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "./ts-jest-puppeteer-preset",
  testTimeout: 300000,
  testEnvironment: "node",
  testPathIgnorePatterns: [".d.ts", ".js"],
};
