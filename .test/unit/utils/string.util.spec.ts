import "jest-extended";
import { StringUtil } from "../../../.src";

/**
 *
 * Test Suite for all the functions included in the String Util sub package.
 *
 * @group unit
 * @group utils
 * @group string
 *
 */
describe("StringUtil Unit Test Suite", () => {

	const nonStringValues = [
		null,
		undefined,
		true,
		1,
		{},
		[]
	];

	const stringValues = [
		"hello",
		"world",
		"foo",
		"1",
		"true"
	];

	test.each(nonStringValues)
	("that given %s, doubleQuotes throws a TypeError", (arg) => {
		expect(() => {
			// @ts-ignore
			StringUtil.doubleQuotes(arg);
		}).toThrowError(`Cannot wrap type of ${typeof arg} in double quotes; Convert to a string first`);
	});

	test.each(stringValues)
	('that given %s, doubleQuotes returns "%s"', (arg) => {
		expect(StringUtil.doubleQuotes(arg))
			.toBe(`"${arg}"`);
	});

	test.each(nonStringValues)
	("that given %s, isEmptyString returns false", (arg) => {
		// @ts-ignore
		expect(StringUtil.isEmptyString(arg))
			.toBeFalse();
	});

	test.each(stringValues)
	("that given %s, isEmptyString returns false", (arg) => {
		expect(StringUtil.isEmptyString(arg))
			.toBeFalse();
	});

	test("that given an empty string, isEmptyString returns true", () => {
		expect(StringUtil.isEmptyString(""))
			.toBeTrue();
	});

	test.each(nonStringValues)
	("that given %s, isSetString returns false", (arg) => {
		// @ts-ignore
		expect(StringUtil.isSetString(arg))
			.toBeFalse();
	});

	test("that given an empty string, isSetString returns false", () => {
		expect(StringUtil.isSetString(""))
			.toBeFalse();
	});

	test.each(stringValues)
	("that given %s, isSetString returns true", (arg) => {
		expect(StringUtil.isSetString(arg))
			.toBeTrue();
	});

	test.each(nonStringValues)
	("that given %s, singleQuotes throws a TypeError", (arg) => {
		expect(() => {
			// @ts-ignore
			StringUtil.singleQuotes(arg);
		}).toThrowError(TypeError);
	});

	test.each(stringValues)
	("that given %s, singleQuotes returns '%s'", (arg) => {
		expect(StringUtil.singleQuotes(arg))
			.toBe(`'${arg}'`);
	});

});