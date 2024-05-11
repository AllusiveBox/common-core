/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    globalSetup: "./.test/config/jest.global.ts",
    preset: "ts-jest",
    reporters: ["default"],
    runner: "groups",
    setupFilesAfterEnv: ["./.test/config/jest.setup.ts"],
    testEnvironment: "node"
};
