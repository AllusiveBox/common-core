import "jest-extended";
import { ArrayUtil, NestedArray } from "../../../.src";

/**
 *
 * Test Suite for all the functions included in the Array Util sub package.
 *
 * @group unit
 * @group utils
 * @group array
 *
 */
describe("ArrayUtil Unit Test Suite", () => {

	test.each([
		null,
		undefined,
		1,
		"Hi",
		true,
		Symbol("Test"),
		new Date(),
		{}
	])
	("that given the non-array value %s, chunk throws an TypeError", (arg) => {
		expect(() => {
			// @ts-ignore
			ArrayUtil.chunk(arg)
		}).toThrowError(TypeError);
	});

	test.each([
		null,
		"Hi",
		true,
		Symbol("Test"),
		new Date(),
		{},
		[]
	])
	('that given the non-number value %s for "chunkSize", chunk throws an TypeError', (arg) => {
		expect(() => {
			// @ts-ignore
			ArrayUtil.chunk([], arg);
		}).toThrowError(TypeError);
	});

	test('that given a number less than 1 for the "chunkSize", chunk throws an error', () => {
		expect(() => {
			ArrayUtil.chunk([], -1)
		}).toThrowError("Unable to chunk an array smaller than 1 element each");
	});

	test("that given an empty array, chunk returns an empty array", () => {
		expect(ArrayUtil.chunk([]))
			.toBeEmpty();
	});

	test("that chunk properly handles a nested array with empty elements", () => {
		const results: NestedArray<any> = ArrayUtil.chunk([[]]);

		expect(results)
			.toBeArrayOfSize(1);
		expect(results[0])
			.toBeArrayOfSize(1);
		expect(results[0][0])
			.toBeEmpty();
	});

	test("that chunk defaults to chunking an array at 10 elements if a chunkSize isn't provided", () => {
		const results: NestedArray<number> = ArrayUtil.chunk([
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
		]);

		expect(results)
			.toBeArrayOfSize(2);
		expect(results[0])
			.toBeArrayOfSize(10);
		expect(results[0])
			.toStrictEqual([
				0, 1, 2, 3, 4, 5, 6, 7, 8, 9
			]);
		expect(results[1])
			.toBeArrayOfSize(6);
		expect(results[1])
			.toStrictEqual([
				10, 11, 12, 13, 14, 15
			]);
	});

	test("that given a chunking size, chunk chunks the array at the specified value", () => {
		const results: NestedArray<number> = ArrayUtil.chunk([
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9
		], 2);

		expect(results)
			.toBeArrayOfSize(5);
		expect(results[0])
			.toBeArrayOfSize(2);
		expect(results[0])
			.toStrictEqual([0, 1]);
		expect(results[1])
			.toStrictEqual([2, 3]);
		expect(results[2])
			.toStrictEqual([4, 5]);
		expect(results[3])
			.toStrictEqual([6, 7]);
		expect(results[4])
			.toStrictEqual([8, 9]);
	});

	test("that combine returns an empty array if given two empty arrays", () => {
		expect(ArrayUtil.combine([], []))
			.toBeEmpty();
	});

	test("that given a single non-empty array, combine returns the first array", () => {
		// Setup
		const someArray: Array<number> = [0, 1, 2, 3, 4];

		const results: Array<number> = ArrayUtil.combine(someArray, []);

		expect(results)
			.toBeArrayOfSize(5);
		expect(results)
			.toStrictEqual([0, 1, 2, 3, 4]);
	});

	test("that given a single non-empty array as the second parameter, combine returns the second array", () => {
		// Setup
		const someArray: Array<string> = ["a", "b", "c", "d", "e"];

		const results: Array<string> = ArrayUtil.combine([], someArray);

		expect(results)
			.toBeArrayOfSize(5);
		expect(results)
			.toStrictEqual(["a", "b", "c", "d", "e"]);
	});

	test("that given two non-empty arrays, combine puts the first array before the second array", () => {
		// Setup
		const someArray1: Array<number> = [0, 1, 2, 3, 4];
		const someArray2: Array<string> = ["a", "b", "c", "d", "e"];

		const results: Array<number | string> = ArrayUtil.combine(someArray1, someArray2);

		expect(results)
			.toBeArrayOfSize(10);
		expect(results)
			.toStrictEqual([
				0, 1, 2, 3, 4,
				"a", "b", "c", "d", "e"
			]);
	});

	test.each([
		null,
		undefined,
		1,
		"Hi",
		true,
		Symbol("Test"),
		new Date(),
		{}
	])
	("that given the non-array value %s, convertToString throws an TypeError", (arg) => {
		expect(() => {
			// @ts-ignore
			ArrayUtil.convertToString(arg);
		}).toThrowError(TypeError);
	});

	test.each([
		null,
		1,
		true,
		Symbol("Test"),
		new Date(),
		{},
		[]
	])
	('that given the non-string value for "joinOn", convertToString throws a TypeError', (arg) => {
		expect(() => {
			// @ts-ignore
			ArrayUtil.convertToString([], arg);
		}).toThrowError(TypeError);
	});

	test('that convertToString uses ", " by default when a joining string is not provided', () => {
		expect(ArrayUtil.convertToString(["Hello", "World"]))
			.toBe("Hello, World");
	});

	test("that convertToString uses the supplied joining string when one is provided", () => {
		expect(ArrayUtil.convertToString(["Hello", "World"], " "))
			.toBe("Hello World");
	});

	test.each([
		null,
		undefined,
		1,
		"Hi",
		true,
		Symbol("Test"),
		new Date(),
		{}
	])
	("that given non-array %s, flatten throws an error", (arg) => {
		expect(() => {
			// @ts-ignore
			ArrayUtil.flatten(arg);
		}).toThrowError(TypeError);
	});

	test("that given an empty array, flatten returns an empty array", () => {
		expect(ArrayUtil.flatten([]))
			.toBeEmpty();
	});

	test("that given a nested array, flatten correctly returns a fully flattened array", () => {
		// Setup
		const nestedArray: NestedArray<string> = ["Hi", ["my", "name", ["is", "nested", ["array"]]]];

		const results: Array<string> = ArrayUtil.flatten(nestedArray);

		expect(results)
			.toBeArrayOfSize(6);
		expect(results)
			.toStrictEqual(["Hi", "my", "name", "is", "nested", "array"]);
	});

	test("that given a non-empty array, isEmptyArray returns false", () => {
		expect(ArrayUtil.isEmptyArray(["hello", "world"]))
			.toBeFalse();
	});

	test("that given an empty array, isEmptyArray returns true", () => {
		expect(ArrayUtil.isEmptyArray([]))
			.toBeTrue();
	});

	test("that given an empty array, isNonEmptyArray returns false", () => {
		expect(ArrayUtil.isNonEmptyArray([]))
			.toBeFalse();
	});

	test("that given a non-empty array, isNonEmptyArray returns true", () => {
		expect(ArrayUtil.isNonEmptyArray(["hello", "world"]))
			.toBeTrue();
	});

});
