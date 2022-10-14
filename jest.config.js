/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    globalSetup: "./jest.global.ts",
    preset: "ts-jest",
    reporters: ["default"],
    runner: "groups",
    setupFilesAfterEnv: ["./.test/jest.setup.ts"],
    testEnvironment: "node"
};
