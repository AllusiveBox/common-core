import "jest-extended";
import { TimeUtil } from "../../../.src";

/**
 *
 * Test Suite for all the functions included in the Time Utility sub package.
 *
 * @group unit
 * @group utils
 * @group time
 *
 */
describe("TimeUtil Unit Test Suite", () => {

	const invalidList = [
		null,
		"Hello World",
		{ foo: "bar" },
		true
	];

	test.each(invalidList)
	("that given %s, attempting to calculate milliseconds throws a TypeError", (arg) => {
		expect(() => {
			// @ts-ignore
			TimeUtil.Milliseconds.inSeconds(arg)
		}).toThrowError(TypeError);
	});

	test.each(invalidList)
	("that given %s, attempting to convert from milliseconds throws a TypeError", (arg) => {
		expect(() => {
			// @ts-ignore
			TimeUtil.Milliseconds.toSeconds(arg)
		}).toThrowError(TypeError);
	});

	const secondsList = [
		{ seconds: 1, milliseconds: 1000 },
		{ seconds: 30, milliseconds: 30000 },
		{ seconds: 60, milliseconds: 60000 }
	];

	test.each(secondsList)
	("that given $seconds seconds, inSeconds returns $milliseconds milliseconds", ({ seconds, milliseconds }) => {
		expect(TimeUtil.Milliseconds.inSeconds(seconds))
			.toBe(milliseconds);
	});

	test("that not given any seconds, inSeconds returns 1000 milliseconds", () => {
		expect(TimeUtil.Milliseconds.inSeconds())
			.toBe(1000);
	});

	test.each(secondsList)
	("that given $milliseconds milliseconds, toSeconds returns $seconds seconds", ({ milliseconds, seconds }) => {
		expect(TimeUtil.Milliseconds.toSeconds(milliseconds))
			.toBe(seconds);
	});

	test("that not given any milliseconds, toSeconds returns 0 milliseconds", () => {
		expect(TimeUtil.Milliseconds.toSeconds())
			.toBe(0);
	});

	const minutesList = [
		{ minutes: 1, milliseconds: 60000 },
		{ minutes: 30, milliseconds: 1.8e6 },
		{ minutes: 60, milliseconds: 3.6e6}
	];

	test.each(minutesList)
	("that given $minutes minutes, inMinutes returns $milliseconds milliseconds", ({ minutes, milliseconds }) => {
		expect(TimeUtil.Milliseconds.inMinutes(minutes))
			.toBe(milliseconds);
	});

	test("that not given any minutes, inMinutes returns 60000 milliseconds", () => {
		expect(TimeUtil.Milliseconds.inMinutes())
			.toBe(60000);
	});

	test.each(minutesList)
	("that given $milliseconds milliseconds, toMinutes returns $minutes minutes", ({ milliseconds, minutes }) => {
		expect(TimeUtil.Milliseconds.toMinutes(milliseconds))
			.toBe(minutes);
	});

	test("that not given any milliseconds, toMinutes returns 0 minutes", () => {
		expect(TimeUtil.Milliseconds.toMinutes())
			.toBe(0);
	});

	const hoursList = [
		{ hours: 1, milliseconds: 3.6e6 },
		{ hours: 12, milliseconds: 4.32e7 },
		{ hours: 24, milliseconds: 8.64e7 }
	];

	test.each(hoursList)
	("that given $hours hours, inHours returns $milliseconds milliseconds", ({ hours, milliseconds }) => {
		expect(TimeUtil.Milliseconds.inHours(hours))
			.toBe(milliseconds);
	});

	test("that not given any hours, inHours returns 3.6e6 milliseconds", () => {
		expect(TimeUtil.Milliseconds.inHours())
			.toBe(3.6e6);
	});

	test.each(hoursList)
	("that given $milliseconds, toHours returns $hours hours", ({ milliseconds, hours }) => {
		expect(TimeUtil.Milliseconds.toHours(milliseconds))
			.toBe(hours);
	});

	test("that not given any milliseconds, toHours returns 0 milliseconds", () => {
		expect(TimeUtil.Milliseconds.toHours())
			.toBe(0);
	});

	const daysList = [
		{ days: 1, milliseconds: 8.64e7 },
		{ days: 7, milliseconds: 6.048e8 },
		{ days: 15, milliseconds: 1.296e9 },
		{ days: 31, milliseconds: 2.6784e9 }
	];

	test.each(daysList)
	("that given $days days, inDays returns $milliseconds milliseconds", ({ days, milliseconds }) => {
		expect(TimeUtil.Milliseconds.inDays(days))
			.toBe(milliseconds);
	});

	test("that not given any days, inDays returns 8.64e10 milliseconds", () => {
		expect(TimeUtil.Milliseconds.inDays())
			.toBe(8.64e7);
	});

	test.each(daysList)
	("that given $milliseconds, toDays returns $days days", ({ milliseconds, days }) => {
		expect(TimeUtil.Milliseconds.toDays(milliseconds))
			.toBe(days);
	});

	test("that not given any milliseconds, toDays returns 0 days", () => {
		expect(TimeUtil.Milliseconds.toDays())
			.toBe(0);
	});

	const weeksList = [
		{ weeks: 1, milliseconds: 6.048e8 },
		{ weeks: 12, milliseconds: 7.2576e9 },
		{ weeks: 52, milliseconds: 3.14496e10 }
	];

	test.each(weeksList)
	("that given $weeks weeks, inWeeks returns $milliseconds milliseconds", ({ weeks, milliseconds }) => {
		expect(TimeUtil.Milliseconds.inWeeks(weeks))
			.toBe(milliseconds);
	});

	test("that given no weeks, inWeeks returns 6.048e11 milliseconds", () => {
		expect(TimeUtil.Milliseconds.inWeeks())
			.toBe(6.048e8);
	});

	test.each(weeksList)
	("that given $milliseconds milliseconds, toWeeks returns $weeks weeks", ({ milliseconds, weeks }) => {
		expect(TimeUtil.Milliseconds.toWeeks(milliseconds))
			.toBe(weeks);
	});

	test("that given no milliseconds, toWeeks returns 0 weeks", () => {
		expect(TimeUtil.Milliseconds.toWeeks())
			.toBe(0);
	});

	const monthsList = [
		{ months: 1, milliseconds: 2.628e9 },
		{ months: 6, milliseconds: 1.5768e10 },
		{ months: 12, milliseconds: 3.1536e10 }
	];

	test.each(monthsList)
	("that given $months months, inMonths returns $milliseconds milliseconds", ({ months, milliseconds }) => {
		expect(TimeUtil.Milliseconds.inMonths(months))
			.toBe(milliseconds);
	});

	test("that given no months, inMonths returns 2.628e9 milliseconds", () => {
		expect(TimeUtil.Milliseconds.inMonths())
			.toBe(2.628e9);
	});

	test.each(monthsList)
	("that given $milliseconds milliseconds, toMonths returns $months months", ({ milliseconds, months }) => {
		expect(TimeUtil.Milliseconds.toMonths(milliseconds))
			.toBe(months);
	});

	test("that given no milliseconds, toMonths returns 0 months", () => {
		expect(TimeUtil.Milliseconds.toMonths())
			.toBe(0);
	});

	const yearsList = [
		{ years: 1, milliseconds: 3.154e10 },
		{ years: 5, milliseconds: 1.577e11 },
		{ years: 10, milliseconds: 3.154e11 }
	];

	test.each(yearsList)
	("that given $years years, inYears returns $milliseconds milliseconds", ({ years, milliseconds }) => {
		expect(TimeUtil.Milliseconds.inYears(years))
			.toBe(milliseconds);
	});

	test("that given no years, inYears returns 3.154e10 milliseconds", () => {
		expect(TimeUtil.Milliseconds.inYears())
			.toBe(3.154e10);
	});

	test.each(yearsList)
	("that given $milliseconds milliseconds, toYears returns $years years", ({ milliseconds, years }) => {
		expect(TimeUtil.Milliseconds.toYears(milliseconds))
			.toBe(years);
	});

	test("that given no milliseconds, toYears returns 0 years", () => {
		expect(TimeUtil.Milliseconds.toYears())
			.toBe(0);
	});

});
