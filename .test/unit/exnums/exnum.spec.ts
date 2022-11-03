import "jest-extended";
import {
	Nullable,
	EXnum,
	EXnumable,
	EXnumDoesNotExist,
	EXnumMissingRequiredValue
} from "../../../.src";

class TestXnum extends EXnum {

	protected static readonly EXNUM_TO_VALUE_MAP: Map<TestXnum, EXnumable> = new Map<TestXnum, EXnumable>();

	protected static readonly VALUE_TO_EXNUM_MAP: Map<EXnumable, TestXnum> = new Map<EXnumable, TestXnum>();

	protected static readonly TYPE: string = "TestXnum";

	public static readonly STRING_XNUM: TestXnum = new TestXnum("test", TestXnum.TYPE);

	public static readonly NUMBER_XNUM: TestXnum = new TestXnum(1, TestXnum.TYPE);

	public static readonly SUPPORTED_EXNUMS: Array<TestXnum> = [
		TestXnum.STRING_XNUM,
		TestXnum.NUMBER_XNUM
	];

	constructor(
		code: EXnumable,
		type: string
	) {
		super(code, type);
	}

	protected setEXnumMap(
		value: EXnumable
	): void {
		TestXnum.EXNUM_TO_VALUE_MAP.set(this, value)
		TestXnum.VALUE_TO_EXNUM_MAP.set(value, this);
	}

	static get exnumMapSize(): number { return this.EXNUM_TO_VALUE_MAP.size; }

	static get valueMapSize(): number { return this.VALUE_TO_EXNUM_MAP.size; }
}

/**
 *
 * Test Suite for the EXnum class.
 *
 * @group unit
 * @group exnum
 *
 */
describe("EXnum Unit Test Suite", () => {

	test('that EXnum static toString returns "EXnum"', () => {
		expect(EXnum.toString())
			.toBe("EXnum");
	});

	test("that EXnum EXNUM_TO_VALUE_MAP is undefined", () => {
		expect(EXnum["EXNUM_TO_VALUE_MAP"])
			.not
			.toBeDefined();
	});

	test("that EXnum VALUE_TO_EXNUM_MAP is undefined", () => {
		expect(EXnum["VALUE_TO_EXNUM_MAP"])
			.not
			.toBeDefined();
	});

	test("that EXnum SUPPORTED_EXNUMS is undefined", () => {
		expect(EXnum["SUPPORTED_EXNUMS"])
			.not
			.toBeDefined();
	});

	test('that EXnum static type returns "EXnum"', () => {
		expect(EXnum["TYPE"])
			.toBe("EXnum");
	});

	test("that a child of the EXnum class correctly sets the XNUM_TO_VALUE_MAP", () => {
		expect(TestXnum.exnumMapSize)
			.toBe(2);
	});

	test("that a child of the EXnum class correctly sets the VALUE_TO_XNUM_MAP", () => {
		expect(TestXnum.valueMapSize)
			.toBe(2);
	});

	test("that a child of the EXnum class correctly sets the SUPPORTED_XNUMS array", () => {
			const supportedXnums: Array<TestXnum> = TestXnum["SUPPORTED_EXNUMS"];
			expect(supportedXnums)
				.toBeArrayOfSize(2);
			expect(supportedXnums[0])
				.toStrictEqual(TestXnum.STRING_XNUM);
			expect(supportedXnums[1])
				.toStrictEqual(TestXnum.NUMBER_XNUM);
	});

	test("that a child of the EXnum class returns the provided type with static toString", () => {
		expect(TestXnum.toString())
			.toBe("TestXnum");
	});

	test.each([
		true,
		new Date(),
		[],
		{}
	])
	('that given %s for "code", attempting to create an EXnum child throws a TypeError', (arg) => {
		expect(() => {
			// @ts-ignore
			new TestXnum(arg);
		}).toThrowError(TypeError);
	});

	test.each([
		null,
		undefined
	])
	('that given %s for "code", attempting to create an EXnum child throws a EXnumMissingRequiredValue error', (arg) => {
		expect(() => {
			// @ts-ignore
			new TestXnum(arg)
		}).toThrowError(EXnumMissingRequiredValue);
	});

	test.each([
		true,
		new Date(),
		[],
		{}
	])
	('that given %s for "type", attempting to create an EXnum child throws a TypeError', (arg) => {
		expect(() => {
			// @ts-ignore
			new TestXnum("Test", arg);
		}).toThrowError(TypeError);
	});

	test.each([
		null,
		undefined
	])
	('that given %s for "type", attempting to create an EXnum child throws a XnumMissingRequiredField error', (arg) => {
		expect(() => {
			// @ts-ignore
			new TestXnum("Test", arg);
		}).toThrowError(EXnumMissingRequiredValue);
	});

	test("that given an invalid value, getXnum throws an error by default", () => {
		expect(() => {
			TestXnum.getEXnum("Invalid");
		}).toThrowError(EXnumDoesNotExist);
	});

	test('that given an invalid value, getXnum should not error if passed an "errorIfNotFound" value of false', () => {
		const xnum: Nullable<EXnum> = TestXnum.getEXnum("Invalid", false);

		expect(xnum)
			.toBeNull();
	});

	test.each([
		{ value: "test", expectedResult: TestXnum.STRING_XNUM },
		{ value: 1, expectedResult: TestXnum.NUMBER_XNUM }
	])
	("that given $value, getXnum returns $expectedResult", ({ value, expectedResult }) => {
		const xnum: EXnum = TestXnum.getEXnum(value);

		expect(xnum)
			.toBe(expectedResult);
	});

	test("that given an invalid value, getValue throws an error by default", () => {
		expect(() => {
			// @ts-ignore
			TestXnum.getValue(null);
		}).toThrowError(EXnumDoesNotExist)
	});

	test('that given an invalid value, getValue should not error if passed an "errorIfNotFound" value of false', () => {
		// @ts-ignore
		const xnumable: Nullable<EXnumable> = TestXnum.getValue(null, false);

		expect(xnumable)
			.toBeNull();
	});

	test.each([
		{ xnum: TestXnum.STRING_XNUM, expectedResult: "TEST" },
		{ xnum: TestXnum.NUMBER_XNUM, expectedResult: 1 }
	])
	("that given $xnum, getValue returns $expectedResult", ({ xnum, expectedResult }) => {
		const xnumable: EXnumable = TestXnum.getValue(xnum);

		expect(xnumable)
			.toBe(expectedResult);
	});

	test.each([
		TestXnum.STRING_XNUM,
		TestXnum.NUMBER_XNUM
	])
	("that given %s, isValid returns true", (arg) => {
		expect(TestXnum.isValid(arg))
			.toBeTrue();
	});

	test("that given an EXnum that is not in the SUPPORTED_XNUMS array, isValid returns false", () => {
		// Setup
		const invalidXnum: TestXnum = new TestXnum("Invalid", "Invalid");

		expect(TestXnum.isValid(invalidXnum))
			.toBeFalse();
	});

});
