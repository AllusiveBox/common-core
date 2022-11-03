import "jest-extended";
import { NumberUtil } from "../../../.src";

/**
 *
 * Test Suite for all the functions included in the Number Util sub package.
 *
 * @group unit
 * @group utils
 * @group number
 *
 */
describe("NumberUtil Unit Test Suite", () => {

	test("that ZERO is set to 0", () => {
		expect(NumberUtil.ZERO)
			.toBe(0);
	});

	test("that ONE is set to 1", () => {
		expect(NumberUtil.ONE)
			.toBe(1);
	});

	test("that TEN is set to 10", () => {
		expect(NumberUtil.TEN)
			.toBe(10);
	});

	test("that ONE_HUNDRED is set to 100", () => {
		expect(NumberUtil.ONE_HUNDRED)
			.toBe(100);
	});

	test("that ONE_THOUSAND is set to 1000", () => {
		expect(NumberUtil.ONE_THOUSAND)
			.toBe(1000);
	});

	test("that TEN_THOUSAND is set to 10000", () => {
		expect(NumberUtil.TEN_THOUSAND)
			.toBe(10000);
	});

	test.each([
		{ arg: null, error: "Cannot convert type: null to a string; Must be of type number" },
		{ arg: undefined, error: "Cannot convert type: undefined to a string; Must be of type number" },
		{ arg: [], error: "Cannot convert type: Array to a string; Must be of type number" },
		{ arg: true, error: "Cannot convert type: boolean to a string; Must be of type number" },
		{ arg: new Date(), error: "Cannot convert type: Date to a string; Must be of type number" },
		{ arg: "foo", error: "Cannot convert type: string to a string; Must be of type number"},
		{ arg: 100, error: "Cannot convert a number larger than 100 to a string; Must be a number between 0 and 99" },
		{ arg: 1000, error: "Cannot convert a number larger than 100 to a string; Must be a number between 0 and 99" },
		{ arg: -100, error: "Cannot convert a negative number to a string; Must be a positive number" }
	])
	("that given $arg, convertToTwoCharacterString throws $error", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			NumberUtil.convertToTwoCharacterString(arg);
		}).toThrowError(error);
	});

	test.each([
		{ arg: 0, result: "00" },
		{ arg: 1, result: "01" },
		{ arg: 10, result: "10" },
		{ arg: 99, result: "99" }
	])
	("that given $arg, convertToTwoCharacterString returns $result", ({ arg, result }) => {
		expect(NumberUtil.convertToTwoCharacterString(arg))
			.toBe(result);
	});

	test.each([
		{ arg: null, error: 'Unsupported type: null for parameter "num"; Must be a number' },
		{ arg: undefined, error: 'Unsupported type: undefined for parameter "num"; Must be a number' },
		{ arg: [], error: 'Unsupported type: Array for parameter "num"; Must be a number' },
		{ arg: true, error: 'Unsupported type: boolean for parameter "num"; Must be a number' },
		{ arg: new Date(), error: 'Unsupported type: Date for parameter "num"; Must be a number' },
		{ arg: "foo", error: 'Unsupported type: string for parameter "num"; Must be a number' },
	])
	("that given $arg as the first argument, roundToNth throws $error", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			NumberUtil.roundToNth(arg, 0);
		}).toThrowError(error);
	});

	test.each([
		{ arg: null, error: 'Unsupported type: null for parameter "decimalPlaces"; Must be a number' },
		{ arg: undefined, error: 'Unsupported type: undefined for parameter "decimalPlaces"; Must be a number' },
		{ arg: [], error: 'Unsupported type: Array for parameter "decimalPlaces"; Must be a number' },
		{ arg: true, error: 'Unsupported type: boolean for parameter "decimalPlaces"; Must be a number' },
		{ arg: new Date(), error: 'Unsupported type: Date for parameter "decimalPlaces"; Must be a number' },
		{ arg: "foo", error: 'Unsupported type: string for parameter "decimalPlaces"; Must be a number' },
	])
	("that given $arg as the second argument, roundToNth throws $error", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			NumberUtil.roundToNth(0, arg);
		}).toThrowError(error);
	});

	test.each([
		{ num: 0, decimals: 0, result: 0 },
		{ num: NaN, decimals: 0, result: 0 },
		{ num: 1, decimals: 1, result: 1 },
		{ num: .1, decimals: 1, result: .1 },
		{ num: .1, decimals: 2, result: .1 },
		{ num: .01, decimals: 3, result: .01 },
		{ num: .000001, decimals: 2, result: 0 },
		{ num: .05737, decimals: 2, result: .06 },
		{ num: Infinity, decimals: 1, result: Infinity }
	])
	("that given $num and $decimals, roundToNth returns $result", ({ num, decimals, result }) => {
		expect(NumberUtil.roundToNth(num, decimals))
			.toBe(result)
	});

	test.each([
		{ arg: null, error: 'Unsupported type: null for parameter "num"; Must be a number' },
		{ arg: undefined, error: 'Unsupported type: undefined for parameter "num"; Must be a number' },
		{ arg: [], error: 'Unsupported type: Array for parameter "num"; Must be a number' },
		{ arg: true, error: 'Unsupported type: boolean for parameter "num"; Must be a number' },
		{ arg: new Date(), error: 'Unsupported type: Date for parameter "num"; Must be a number' },
		{ arg: "foo", error: 'Unsupported type: string for parameter "num"; Must be a number' },
	])
	("that given $arg, roundToTwo throws $error", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			NumberUtil.roundToTwo(arg);
		}).toThrowError(error);
	});

	test.each([
		[0, 0],
		[1, 1],
		[1.5, 1.5],
		[1.55555, 1.56],
		[12.4, 12.4],
		[0.598, 0.60]
	])
	("that given %s, roundToTwo correctly rounds the number to the nearest tenth decimal place", (num, expectedResult) => {
		expect(NumberUtil.roundToTwo(num))
			.toBe(expectedResult);
	});

	test.each([
		0.002,
		0.0002,
		0.00002,
		0.000002,
		0.0000002,
		0.00000002,
		0.000000002,
		0.0000000002,
		0.00000000002
	])
	("that given %s, roundToTwo correctly rounds the number to 0", (arg) => {
		expect(NumberUtil.roundToTwo(arg))
			.toBe(0);
	});

	test("that given NaN, roundToTwo correctly returns 0", () => {
		expect(NumberUtil.roundToTwo(NaN))
			.toBe(0);
	});

	test("that given Infinity, roundToTwo correctly returns Infinity", () => {
		expect(NumberUtil.roundToTwo(Infinity))
			.toBe(Infinity);
	});

});
