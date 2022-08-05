import "jest-extended";
import { NumberUtil } from "../../.src/utils";

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

	beforeAll(() => {
		jest.spyOn(console, "debug").mockImplementation(() => {});
	});

	afterAll(() => {
		jest.spyOn(console, "debug").mockReset();
	});

	test("that ZERO is set to 0", () => {
		expect(NumberUtil.ZERO).toBe(0);
	});

	test("that ONE is set to 1", () => {
		expect(NumberUtil.ONE).toBe(1);
	});

	test("that TEN is set to 10", () => {
		expect(NumberUtil.TEN).toBe(10);
	});

	test("that ONE_HUNDRED is set to 100", () => {
		expect(NumberUtil.ONE_HUNDRED).toBe(100);
	});

	test("that ONE_THOUSAND is set to 1000", () => {
		expect(NumberUtil.ONE_THOUSAND).toBe(1000);
	});

	test("that TEN_THOUSAND is set to 10000", () => {
		expect(NumberUtil.TEN_THOUSAND).toBe(10000);
	});

	test.each([
		{ arg: null, error: "Cannot convert type: object to numerical string; Must be of type number" },
		{ arg: undefined, error: "Cannot convert type: undefined to numerical string; Must be of type number" },
		{ arg: [], error: "Cannot convert type: object to numerical string; Must be of type number" },
		{ arg: true, error: "Cannot convert type: boolean to numerical string; Must be of type number" },
		{ arg: new Date(), error: "Cannot convert type: object to numerical string; Must be of type number" },
		{ arg: "foo", error: "Cannot convert type: string to numerical string; Must be of type number"},
		{ arg: 100, error: "Formatting Error: Unable to convert 100 to two characters" },
		{ arg: 1000, error: "Formatting Error: Unable to convert 1000 to two characters" },
		{ arg: -100, error: "Negative Number Error: Unable to convert -100 as it is negative" }
	])
	("that given $arg, convertToTwoCharacterNumericalString throws $error by default", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			NumberUtil.convertToTwoCharacterNumericalString(arg);
		}).toThrowError(error);
	});

	test.each([
		{ arg: 0, result: "00" },
		{ arg: 1, result: "01" },
		{ arg: 10, result: "10" },
		{ arg: 99, result: "99" }
	])
	("that given $arg, convertToTwoCharacterNumericalString returns $result", ({ arg, result }) => {
		expect(NumberUtil.convertToTwoCharacterNumericalString(arg)).toBe(result);
	});

	test.each([
		{ arg: -1, result: "-01" },
		{ arg: -99, result: "-99" }
	])
	("that given $arg, convertToTwoCharacterNumericalString returns $result when \"suppressErrorOnNegative\" is set to false", ({ arg, result }) => {
		expect(NumberUtil.convertToTwoCharacterNumericalString(arg, { suppressErrorOnNegative: true }))
			.toBe(result);
	});

	test.each([
		{ arg: -100, error: "Formatting Error: Unable to convert -100 to two characters" },
		{ arg: -1000, error: "Formatting Error: Unable to convert -1000 to two characters" }
	])
	("that given $arg, convertToTwoCharacterNumericalString throws $error when \"suppressErrorOnValueTooLarge\" is" +
		" set to true", ({ arg, error }) => {

		expect(() => {
			NumberUtil.convertToTwoCharacterNumericalString(arg, { suppressErrorOnNegative: true });
		}).toThrowError(error);
	});

	test.each([
		{ arg: 100, result: "100" },
		{ arg: 1000, result: "1000" },
	])
	("that given $arg, convertToTwoCharacterNumericalString returns $result when \"suppressErrorOnValueTooLarge\" is true", ({ arg, result }) => {
		expect(NumberUtil.convertToTwoCharacterNumericalString(arg, { suppressErrorOnValueTooLarge: true }))
			.toBe(result);
	});

	test.each([
		{ arg: -1, result: "-01" },
		{ arg: -99, result: "-99" },
		{ arg: -100, result: "-100" },
		{ arg: -1000, result: "-1000" }
	])
	("that given $arg, convertToTwoCharacterNumericalString returns $result when \"suppressErrorOnValueTooLarge\" is set to true" +
		" and \"suppressErrorOnNegative\" is true", ({ arg, result }) => {

		expect(NumberUtil.convertToTwoCharacterNumericalString(arg, { suppressErrorOnValueTooLarge: true, suppressErrorOnNegative: true }))
	});

	test.each([
		{ arg: null, error: "Unsupported type: object for parameter \"num\"; Must be of type number" },
		{ arg: undefined, error: "Unsupported type: undefined for parameter \"num\"; Must be of type number" },
		{ arg: [], error: "Unsupported type: object for parameter \"num\"; Must be of type number" },
		{ arg: true, error: "Unsupported type: boolean for parameter \"num\"; Must be of type number" },
		{ arg: new Date(), error: "Unsupported type: object for parameter \"num\"; Must be of type number" },
		{ arg: "foo", error: "Unsupported type: string for parameter \"num\"; Must be of type number" },
	])
	("that given $arg as the first argument, roundToNth throws $error", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			NumberUtil.roundToNth(arg, 0);
		}).toThrowError(error);
	});

	test.each([
		{ arg: null, error: "Unsupported type: object for parameter \"decimalPlaces\"; Must be of type number" },
		{ arg: undefined, error: "Unsupported type: undefined for parameter \"decimalPlaces\"; Must be of type number" },
		{ arg: [], error: "Unsupported type: object for parameter \"decimalPlaces\"; Must be of type number" },
		{ arg: true, error: "Unsupported type: boolean for parameter \"decimalPlaces\"; Must be of type number" },
		{ arg: new Date(), error: "Unsupported type: object for parameter \"decimalPlaces\"; Must be of type number" },
		{ arg: "foo", error: "Unsupported type: string for parameter \"decimalPlaces\"; Must be of type number" },
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
		expect(NumberUtil.roundToNth(num, decimals)).toBe(result)
	});

});
