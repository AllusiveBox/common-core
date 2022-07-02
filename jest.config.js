/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    setupFilesAfterEnv: ["jest-extended/all"],
    preset: 'ts-jest',
    testEnvironment: 'node'
};
