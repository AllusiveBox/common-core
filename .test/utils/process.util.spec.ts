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
describe(" Unit Test Suite", () => {

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
		{ arg: [], error: "" },
		{ arg: true, error: "" },
		{ arg: 1, error: "" },
		{ arg: null, error: "" },
	])
	("that given $arg, setEnvironment throws \"$error\"", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			ProcessUtil.setEnvironment(arg);
		}).toThrowError(error);
	});

	test.each([
		{ arg: Environment.DEVELOPMENT, result: Environment.DEVELOPMENT },
		{ arg: Environment.PRODUCTION, result: Environment.PRODUCTION },
		{ arg: Environment.TEST, result: Environment.TEST },
		{ arg: Environment.UNKNOWN, result: Environment.UNKNOWN },
		{ arg: "development", result: Environment.DEVELOPMENT },
		{ arg: "production", result: Environment.PRODUCTION },
		{ arg: "test", result: Environment.TEST },
		{ arg: "unknown", result: Environment.UNKNOWN }
	])
	("that given $arg, setEnvironment returns $result", ({ arg, result }) => {
		expect(() => {
			// @ts-ignore
			ProcessUtil.setEnvironment(arg);
		}).not.toThrowError();

		expect(ProcessUtil.getEnvironment()).toStrictEqual(result);
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
