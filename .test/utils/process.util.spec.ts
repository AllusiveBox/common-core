import "jest-extended";
import { Environment, ProcessUtil } from "../../.src";

let environment: string;

/**
 *
 * Test Suite for all the functions included in the ProcessUtil sub package.
 *
 * @group unit
 * @group utils
 * @group process
 *
 */
describe("ProcessUtil Unit Test Suite", () => {

	beforeAll(() => {
		initializeTestData();
	});

	beforeEach(() => {
		resetTestData();
	});

	afterAll(() => {
		cleanUpTestData();
	});

	test.each([
		{ arg: "DEVELOPMENT", result: Environment.DEVELOPMENT },
		{ arg: "PRODUCTION", result: Environment.PRODUCTION },
		{ arg: "TEST", result: Environment.TEST },
		{ arg: null, result: Environment.UNKNOWN },
		{ arg: undefined, result: Environment.UNKNOWN }
	])
	("that given $arg, getEnvironment returns \"$result\"", ({ arg, result }) => {
		// @ts-ignore
		process.env.NODE_ENV = arg;

		expect(ProcessUtil.getEnvironment()).toStrictEqual(result);
	});

	test.each([
		{ arg: [], error: "Unable to set environment with type: Array; Must be of type Environment or string" },
		{ arg: true, error: "Unable to set environment with type: Boolean; Must be of type Environment or string" },
		{ arg: 1, error: "Unable to set environment with type: Number; Must be of type Environment or string" },
		{ arg: null, error: "Unable to set environment with type: Null; Must be of type Environment or string" },
	])
	("that given $arg, setEnvironment throws \"$error\"", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			ProcessUtil.setEnvironment(arg);
		}).toThrowError(error);
	});

	test.each([
		{
			testName: `${Environment.DEVELOPMENT}`,
			testArg: Environment.DEVELOPMENT,
			expectedResult: Environment.DEVELOPMENT,
			resultName: "Environment:DEVELOPMENT"
		},
		{
			testName: `${Environment.PRODUCTION}`,
			testArg: Environment.PRODUCTION,
			expectedResult: Environment.PRODUCTION,
			resultName: "Environment:PRODUCTION"
		},
		{
			testName: `${Environment.TEST}`,
			testArg: Environment.TEST,
			expectedResult: Environment.TEST,
			resultName: "Environment:TEST"
		},
		{
			testName: "development",
			testArg: "development",
			expectedResult: Environment.DEVELOPMENT,
			resultName: "Environment:DEVELOPMENT"
		},
		{
			testName: "production",
			testArg: "production",
			expectedResult: Environment.PRODUCTION,
			resultName: "Environment:PRODUCTION"
		},
		{
			testName: "test",
			testArg: "test",
			expectedResult: Environment.TEST,
			resultName: "Environment:TEST"
		}
	])
	("that given $testName, setEnvironment returns $resultName", ({ testName, testArg, expectedResult, resultName }) => {
		expect(() => {
			// @ts-ignore
			ProcessUtil.setEnvironment(testArg);
		}).not.toThrowError();

		expect(ProcessUtil.getEnvironment()).toStrictEqual(expectedResult);
	});

});

/**
 *
 * Helper function that handles initializing all the test data.
 *
 * @returns {void}
 *
 */
function initializeTestData(): void {
	environment = process.env.NODE_ENV || "";
}

/**
 *
 * Helper function that handles resetting test data between test sessions.
 *
 * @returns {void}
 *
 */
function resetTestData(): void {
	process.env.NODE_ENV = undefined;
}

/**
 *
 * Helper function that handles restoring the environment to its original settings once the test suite has finished.
 *
 * @returns {void}
 *
 */
function cleanUpTestData(): void {
	process.env.NODE_ENV = environment;
}
