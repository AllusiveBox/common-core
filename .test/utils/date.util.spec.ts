import "jest-extended";
import { DateUtil } from "../../.src/utils";

/**
 *
 * Test Suite for all the functions included in the Date Util sub package.
 *
 * @group unit
 * @group utils
 * @group Date
 *
 */
describe("DateUtil Unit Test Suite", () => {

	beforeAll(() => {
		jest.useFakeTimers();
		jest.setSystemTime(new Date("12/31/2020"));
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	test.each([
		{
			arg: null,
			error: "Cannot calculate days apart with type: Null for first param; Must be a valid Date object"
		},
		{
			arg: undefined,
			error: "Cannot calculate days apart with type: Undefined for first param; Must be a valid Date object"
		},
		{
			arg: [],
			error: "Cannot calculate days apart with type: Array for first param; Must be a valid Date object"
		},
		{
			arg: true,
			error: "Cannot calculate days apart with type: Boolean for first param; Must be a valid Date object"
		},
		{
			arg: 1,
			error: "Cannot calculate days apart with type: Number for first param; Must be a valid Date object"
		},
		{
			arg: "Invalid",
			error: "Cannot calculate days apart with type: String for first param; Must be a valid Date object"
		}
	])
	("that given $arg for the first param, calculateDaysApart throws \"$error\"", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			DateUtil.calculateDaysApart(arg);
		}).toThrowError(error);
	});

	test.each([
		{ arg: new Date("12/30/2020"), result: 1 },
		{ arg: new Date("12/31/2020"), result: 0 },
		{ arg: new Date("1/1/2021"), result: 1 },
		{ arg: new Date("12/31/2021"), result: 365 }
	])
	("that given the date $arg for firstDate, calculateDaysApart returns $result", ({ arg, result }) => {
		expect(DateUtil.calculateDaysApart(arg)).toBe(result);
	});

	test.each([
		{
			arg: null,
			error: "Cannot calculate days apart with type: Null for second param; Must be a valid Date object"
		},
		{
			arg: [],
			error: "Cannot calculate days apart with type: Array for second param; Must be a valid Date object"
		},
		{
			arg: true,
			error: "Cannot calculate days apart with type: Boolean for second param; Must be a valid Date object"
		},
		{
			arg: 1,
			error: "Cannot calculate days apart with type: Number for second param; Must be a valid Date object"
		},
		{
			arg: "Invalid",
			error: "Cannot calculate days apart with type: String for second param; Must be a valid Date object"
		}
	])
	("that given $arg for the second param, calculateDaysApart throws \"$error\"", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			DateUtil.calculateDaysApart(new Date(), arg);
		}).toThrowError(error);
	});

	test.each([
		{ arg1: new Date(), arg2: new Date(), result: 0 },
		{ arg1: new Date("12/31/2020"), arg2: new Date("1/1/2021"), result: 1 },
		{ arg1: new Date("1/1/21"), arg2: new Date("12/31/2020"), result: 1 }
	])
	("that given $arg1 and $arg2, calculateDaysApart returns $result", ({ arg1, arg2, result }) => {
		expect(DateUtil.calculateDaysApart(arg1, arg2)).toBe(result);
	});

	test.each([
		{
			arg: null,
			error: "Cannot convert type: Null to DateString; Must be a valid Date object or Date formatted as a string"
		},
		{
			arg: undefined,
			error: "Cannot convert type: Undefined to DateString; Must be a valid Date object or Date formatted as a" +
				" string"
		},
		{
			arg: [],
			error: "Cannot convert type: Array to DateString; Must be a valid Date object or Date formatted as a string"
		},
		{
			arg: true,
			error: "Cannot convert type: Boolean to DateString; Must be a valid Date object or Date formatted as a" +
				" string"
		},
		{
			arg: 1,
			error: "Cannot convert type: Number to DateString; Must be a valid Date object or Date formatted as a" +
				" string"
		},
		{
			arg: "Invalid",
			error: "Cannot convert type: String to DateString; Must be a valid Date object or Date formatted as a" +
				" string"
		}
	])
	("that given $arg, convertToDateString throws \"$error\"", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			DateUtil.convertToDateString(arg);
		}).toThrowError(error);
	});

	test.each([
		{ arg: new Date("12/31/2020"), result: "2020-12-31" },
		{ arg: "07/01/2022", result: "2022-07-01" },
		{ arg: new Date("January 2000"), result: "2000-01-01" }
	])
	("that given $arg, convertToDateString returns $result", ({ arg, result }) => {
		// @ts-ignore
		expect(DateUtil.convertToDateString(arg)).toBe(result);
	});

	test.each([
		{
			arg: null,
			error: "Cannot convert type: Null to YearMonthDateString; Must be a valid Date object or Date formatted as a string"
		},
		{
			arg: undefined,
			error: "Cannot convert type: Undefined to YearMonthDateString; Must be a valid Date object or Date " +
				"formatted as a string"
		},
		{
			arg: [],
			error: "Cannot convert type: Array to YearMonthDateString; Must be a valid Date object or Date " +
				"formatted as a string"
		},
		{
			arg: true,
			error: "Cannot convert type: Boolean to YearMonthDateString; Must be a valid Date object or Date " +
				"formatted as a string"
		},
		{
			arg: 1,
			error: "Cannot convert type: Number to YearMonthDateString; Must be a valid Date object or Date " +
				"formatted as a string"
		},
		{
			arg: "Invalid",
			error: "Cannot convert type: String to YearMonthDateString; Must be a valid Date object or Date " +
				"formatted as a string"
		}
	])
	("that given $arg, convertToYearAndMonthDateString throws \"$error\"", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			DateUtil.convertToYearAndMonthDateString(arg);
		}).toThrowError(error);
	});

	test.each([
		{ arg: new Date("01/01/2022"), result: "2022-01" },
		{ arg: new Date("December 31, 2022"), result: "2022-12" },
		{ arg: new Date("02/29/2020"), result: "2020-02" }
	])
	("that given $arg, convertToYearAndMonthDateString returns $result", ({ arg, result }) => {
		expect(DateUtil.convertToYearAndMonthDateString(arg)).toBe(result);
	});

	test.each([
		{ arg: null, error: "Cannot get month offset of type: Null; Must be of type Date" },
		{ arg: undefined, error: "Cannot get month offset of type: Undefined; Must be of type Date" },
		{ arg: "Hello world", error: "Cannot get month offset of type: String; Must be of type Date" },
		{
			arg: { getMonth: () => { return 0 } },
			error: "Cannot get month offset of type: Object; Must be of type Date"
		},
		{ arg: true, error: "Cannot get month offset of type: Boolean; Must be of type Date" },
		{ arg: [], error: "Cannot get month offset of type: Array; Must be of type Date" },
		{ arg: 1, error: "Cannot get month offset of type: Number; Must be of type Date" },
		{ arg: new Date("invalid date"), error: "Cannot get month offset of type: Object; Must be of type Date" }
	])
	("that given $arg, getMonthOffset throws \"$error\"", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			DateUtil.getMonthOffset(arg)
		}).toThrowError(error);
	});

	test.each([
		{ arg: new Date("12/31/2020"), result: 12 },
		{ arg: new Date("12/31"), result: 12 },
		{ arg: new Date("1/1/2022"), result: 1 },
	])
	("that given $arg, getMonthOffset returns $result", ({ arg, result }) => {
		expect(DateUtil.getMonthOffset(arg)).toBe(result);
	});

});
