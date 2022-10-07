import "jest-extended";
import { NilError } from "../../.src";

/**
 *
 * Test Suite for the NilError class.
 *
 * @group unit
 * @group errors
 * @group nil
 *
 */
describe("NilError Unit Test Suite", () => {

	test("that NilError has it's name correctly set", () => {
		expect(new NilError().name).toBe("NilError");
	});

	test("that NilError has it's message correctly set", () => {
		expect(new NilError().message).toBe("Null or Undefined value");
		expect(new NilError("Test").message).toBe("Null or Undefined value; Cause: Test");
	});

	test("that when no causedBy is provided, sets causedBy to null", () => {
		expect(new NilError().causedBy).toBeNull();
	});

	test("that when a causedBy is provided, sets causedBy to the provided value", () => {
		// Setup
		const nilError = new NilError("Test");

		expect(nilError.causedBy).toBe("Test");
	});

	test("that throwing a NilError works as expected", () => {
		expect(() => {
			throw new NilError();
		}).toThrowError("Null or Undefined value");

		expect(() => {
			throw new NilError("Test");
		}).toThrowError("Null or Undefined value; Cause: Test");
	});

});
