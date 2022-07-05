import "jest-extended";
import { ObjectUtil } from "../../.src";

/**
 *
 * Test Suite for all the functions included in the ObjectUtil sub package.
 * @group unit
 * @group utils
 * @group object
 *
 */
describe("ObjectUtil Unit Test Suite", () => {

	test("that given a null object, getProperty throws an error", () => {
		// Setup
		const obj = null;

		expect(() => {
			// @ts-ignore
			ObjectUtil.getProperty(obj, "");
		}).toThrowError("Cannot get property of an object that is either null or undefined");
	});

	test.each([
		"Hello world",
		true,
		[],
		new Date()
	])
	("that given %s, getProperty returns null", (arg) => {
		// @ts-ignore
		expect(ObjectUtil.getProperty(arg, "")).toBeNull();
	});

	test("that given a null path, getProperty throws an Error", () => {
		// Setup
		const obj = { name: "John Doe" };

		expect(() => {
			// @ts-ignore
			ObjectUtil.getProperty(obj, null);
		}).toThrowError("Cannot get property of an object with a path that is either null or undefined");
	});

	test("that given a shallow object, getProperty returns the value stored at the specified path", () => {
		// Setup
		const obj = {
			name: "John Doe",
			age: 24,
			gender: "male"
		};

		expect(ObjectUtil.getProperty(obj, "name")).toBe("John Doe");
		expect(ObjectUtil.getProperty(obj, "age")).toBe(24);
		expect(ObjectUtil.getProperty(obj, "gender")).toBe("male");
	});

	test("that given a deep object, getProperty returns the object stored at the specified path", () => {
		// Setup
		const obj = { foo: { bar: { foobar: { foo: "bar" } } } };

		expect(ObjectUtil.getProperty(obj, "foo")).toStrictEqual({
			bar: {
				foobar: {
					foo: "bar"
				}
			}
		});
	});

	test("that given a deep object, getProperty returns the value stored in a nested object", () => {
		// Setup
		const obj = { foo: { bar: { foobar: { foo: "bar" } } } };

		expect(ObjectUtil.getProperty(obj, "foo.bar")).toStrictEqual({
			foobar: {
				foo: "bar"
			}
		});
	});

	test("that given a non-empty object, isEmptyObject returns false", () => {
		expect(ObjectUtil.isEmptyObject({ foo: "bar" })).toBeFalse();
	});

	test("that given an empty object, isEmptyObject returns true", () => {
		expect(ObjectUtil.isEmptyObject({})).toBeTrue();
	});

	test("that given an empty object, isNotEmptyObject returns false", () => {
		expect(ObjectUtil.isNotEmptyObject({})).toBeFalse();
	});

	test("that given a non-empty object, isNotEmptyObject returns true", () => {
		expect(ObjectUtil.isNotEmptyObject({ foo: "bar" })).toBeTrue();
	});

});
