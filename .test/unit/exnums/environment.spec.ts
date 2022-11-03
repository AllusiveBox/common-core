import "jest-extended";
import { Environment } from "../../../.src";

/**
 *
 * Test Suite for the Environment class.
 *
 * @group unit
 * @group exnum
 * @group environment
 *
 */
describe("Environment Unit Test Suite", () => {

	test('that Environment static toString returns "Environment"', () => {
		expect(Environment.toString())
			.toBe("Environment");
	});

	test("that SUPPORTED_EXNUMS is an array of five Environments", () => {
		expect(Environment["SUPPORTED_EXNUMS"])
			.toBeArrayOfSize(5);
	});

	test.each([
		{ value: "production", expectedResult: Environment.PRODUCTION },
		{ value: "development", expectedResult: Environment.DEVELOPMENT},
		{ value: "local", expectedResult: Environment.LOCAL },
		{ value: "test", expectedResult: Environment.TEST },
		{ value: "unknown", expectedResult: Environment.UNKNOWN },
		{ value: "", expectedResult: Environment.UNKNOWN }
	])
	("that given $value, getEnvironment returns $expectedResult", ({ value, expectedResult }) => {
		expect(Environment.getEnvironment(value))
			.toBe(expectedResult);
	});

	test.each([
		{ environment: Environment.PRODUCTION, expectedResult: "PRODUCTION" },
		{ environment: Environment.DEVELOPMENT, expectedResult: "DEVELOPMENT" },
		{ environment: Environment.LOCAL, expectedResult: "LOCAL" },
		{ environment: Environment.TEST, expectedResult: "TEST" },
		{ environment: Environment.UNKNOWN, expectedResult: "UNKNOWN" }
	])
	("that given $environment, getValue returns $expectedResult", ({ environment, expectedResult }) => {
		expect(Environment.getValue(environment))
			.toBe(expectedResult);
	});

	test.each([
		Environment.PRODUCTION,
		Environment.LOCAL,
		Environment.TEST,
		Environment.UNKNOWN
	])
	("that given %s, isDevelopment returns false", (arg) => {
		expect(arg.isDevelopment())
			.toBeFalse();
	});

	test(`that given ${Environment.DEVELOPMENT}, isDevelopment returns true`, () => {
		expect(Environment.DEVELOPMENT.isDevelopment())
			.toBeTrue()
	});

	test.each([
		Environment.PRODUCTION,
		Environment.DEVELOPMENT,
		Environment.TEST,
		Environment.UNKNOWN
	])
	("that given %s, isLocal returns false", (arg) => {
		expect(arg.isLocal())
			.toBeFalse();
	});

	test(`that given ${Environment.LOCAL}, isLocal returns true`, () => {
		expect(Environment.LOCAL.isLocal())
			.toBeTrue();
	});

	test.each([
		Environment.DEVELOPMENT,
		Environment.LOCAL,
		Environment.TEST,
		Environment.UNKNOWN
	])
	("that given %s, isProduction returns false", (arg) => {
		expect(arg.isProduction())
			.toBeFalse();
	});

	test(`that given ${Environment.PRODUCTION}, isProduction returns true`, () => {
		expect(Environment.PRODUCTION.isProduction())
			.toBeTrue();
	});

	test.each([
		Environment.PRODUCTION,
		Environment.DEVELOPMENT,
		Environment.LOCAL,
		Environment.UNKNOWN
	])
	("that given %s, isTest returns false", (arg) => {
		expect(arg.isTest())
			.toBeFalse();
	});

	test(`that given ${Environment.TEST}, isTest returns true`, () => {
		expect(Environment.TEST.isTest())
			.toBeTrue();
	});

	test.each([
		Environment.PRODUCTION,
		Environment.DEVELOPMENT,
		Environment.LOCAL,
		Environment.TEST
	])
	("that given %s, isUnknown returns false", (arg) => {
		expect(arg.isUnknown())
			.toBeFalse();
	});

	test(`that given ${Environment.UNKNOWN}, isUnknown returns true`, () => {
		expect(Environment.UNKNOWN.isUnknown())
			.toBeTrue();
	});

	test.each([
		Environment.PRODUCTION,
		Environment.DEVELOPMENT
	])
	("that given %s, supportsDebug returns false", (arg) => {
		expect(arg.supportsDebug())
			.toBeFalse();
	});

	test.each([
		Environment.LOCAL,
		Environment.TEST,
		Environment.UNKNOWN
	])
	("that given %s, supportsDebug returns true", (arg) => {
		expect(arg.supportsDebug())
			.toBeTrue();
	});

});
