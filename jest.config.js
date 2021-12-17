"use strict";

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.js"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 93,
      lines: 100,
      statements: 97,
    },
  },
  testEnvironment: "node",
  preset: "ts-jest",
};
