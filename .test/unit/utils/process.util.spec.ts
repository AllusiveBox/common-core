import "jest-extended";
import { Environment, ProcessUtil } from "../../../.src";

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
		{ arg: null, result: Environment.UNKNOWN },
		{ arg: undefined, result: Environment.UNKNOWN },
		{ arg: "PRODUCTION", result: Environment.PRODUCTION },
		{ arg: "DEVELOPMENT", result: Environment.DEVELOPMENT },
		{ arg: "LOCAL", result: Environment.LOCAL },
		{ arg: "TEST", result: Environment.TEST },
		{ arg: "UNKNOWN", result: Environment.UNKNOWN }
	])
	('that given $arg, getEnvironment returns "$result"', ({ arg, result }) => {
		// Setup
		process.env.NODE_ENV = arg as string;

		expect(ProcessUtil.getEnvironment())
			.toBe(result);
	});

	test.each([
		null,
		undefined,
		1,
		true,
		Symbol("Test"),
		new Date(),
		[]
	])
	("that given %s, setEnvironment throws a TypeError", (arg) => {
		expect(() => {
			// @ts-ignore
			ProcessUtil.setEnvironment(arg);
		}).toThrowError(TypeError);
	});

	test.each([
		{ arg: Environment.PRODUCTION, result: "PRODUCTION" },
		{ arg: Environment.DEVELOPMENT, result: "DEVELOPMENT" },
		{ arg: Environment.LOCAL, result: "LOCAL" },
		{ arg: Environment.TEST, result: "TEST" },
		{ arg: Environment.UNKNOWN, result: "UNKNOWN" },
		{ arg: "production", result: "PRODUCTION" },
		{ arg: "DEvelopment", result: "DEVELOPMENT" },
		{ arg: "loCAl", result: "LOCAL" },
		{ arg: "tesT", result: "TEST"}
	])
	("that given $arg, setEnvironment correctly updates process.env.NODE_ENV", ({ arg, result }) => {
		// @ts-ignore
		ProcessUtil.setEnvironment(arg);

		expect(process.env.NODE_ENV)
			.toBe(result);
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
