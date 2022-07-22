import "jest-extended";
import { FileSystemFlag } from "../../.src";

/**
 *
 * Test Suite for the FileSystemFlag class.
 *
 * @group unit
 * @group models
 * @group entity
 * @group filesystem
 *
 */
describe("FileSystemFlag Unit Test Suite", () => {

	test("that static toString returns FileSystemFlag", () => {
		expect(`${FileSystemFlag}`).toBe("FileSystemFlag");
	});

	test("that the SUPPORTED_TYPES and MAP are the same length", () => {
		expect(FileSystemFlag.SUPPORTED_TYPES.length).toBe(FileSystemFlag.MAP.size);
	});

	test.each([
		{ arg: 1, error: "Cannot get FileSystemFlag with type: Number; Must be of type string" },
		{ arg: true, error: "Cannot get FileSystemFlag with type: Boolean; Must be of type string" },
		{ arg: {}, error: "Cannot get FileSystemFlag with type: Object; Must be of type string" },
		{ arg: [], error: "Cannot get FileSystemFlag with type: Array; Must be of type string" }
	])
	("that given $arg, getFileSystemFlag throws \"$error\"", ({ arg, error }) => {
		expect(() => {
			// @ts-ignore
			FileSystemFlag.getFileSystemFlag(arg);
		}).toThrowError(error);
	});

	test.each([
		{ arg: null, result: FileSystemFlag.NULL },
		{ arg: undefined, result: FileSystemFlag.NULL },
		{ arg: "A", result: FileSystemFlag.APPEND },
		{ arg: "AX", result: FileSystemFlag.APPEND_ONLY_EXISTING },
		{ arg: "a+", result: FileSystemFlag.APPEND_AND_READ },
		{ arg: "ax+", result: FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING },
		{ arg: "as", result: FileSystemFlag.APPEND_SYNCHRONOUS },
		{ arg: "as+", result: FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS },
		{ arg: "r", result: FileSystemFlag.READ },
		{ arg: "r+", result: FileSystemFlag.READ_AND_WRITE },
		{ arg: "RS+", result: FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS },
		{ arg: "w", result: FileSystemFlag.WRITE },
		{ arg: "wx", result: FileSystemFlag.WRITE_ONLY_NON_EXISTING },
		{ arg: "w+", result: FileSystemFlag.WRITE_AND_READ },
		{ arg: "wx+", result: FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING },
		{ arg: "", result: FileSystemFlag.UNKNOWN_FLAG },
		{ arg: "UNKNOWN", result: FileSystemFlag.UNKNOWN_FLAG }
	])
	("that given $arg, getFileSystemFlag returns $result", ({ arg, result }) => {
		expect(FileSystemFlag.getFileSystemFlag(arg)).toBe(result);
	});

	test.each([
		FileSystemFlag.READ,
		FileSystemFlag.READ_AND_WRITE,
		FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS,
		FileSystemFlag.WRITE,
		FileSystemFlag.WRITE_ONLY_NON_EXISTING,
		FileSystemFlag.WRITE_AND_READ,
		FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING,
		FileSystemFlag.NULL,
		FileSystemFlag.UNKNOWN_FLAG
	])
	("that given %s, canAppend should return false", (arg) => {
		expect(arg.canAppend()).toBeFalse();
	});

	test.each([
		FileSystemFlag.APPEND,
		FileSystemFlag.APPEND_ONLY_EXISTING,
		FileSystemFlag.APPEND_AND_READ,
		FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING,
		FileSystemFlag.APPEND_SYNCHRONOUS,
		FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS
	])
	("that given $arg, canAppend should return true", (arg) => {
		expect(arg.canAppend()).toBeTrue();
	});

	test.each([
		FileSystemFlag.APPEND,
		FileSystemFlag.APPEND_ONLY_EXISTING,
		FileSystemFlag.APPEND_SYNCHRONOUS,
		FileSystemFlag.WRITE,
		FileSystemFlag.WRITE_ONLY_NON_EXISTING,
		FileSystemFlag.NULL,
		FileSystemFlag.UNKNOWN_FLAG
	])
	("that given %s, canRead should return false", (arg) => {
		expect(arg.canRead()).toBeFalse();
	});

	test.each([
		FileSystemFlag.APPEND_AND_READ,
		FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING,
		FileSystemFlag.READ,
		FileSystemFlag.READ_AND_WRITE,
		FileSystemFlag.WRITE_AND_READ,
		FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING,
		FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS,
		FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS
	])
	("that given %s, canRead should return true", (arg) => {
		expect(arg.canRead()).toBeTrue();
	});

	test.each([
		FileSystemFlag.APPEND,
		FileSystemFlag.APPEND_ONLY_EXISTING,
		FileSystemFlag.APPEND_AND_READ,
		FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING,
		FileSystemFlag.APPEND_SYNCHRONOUS,
		FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS,
		FileSystemFlag.READ,
		FileSystemFlag.NULL,
		FileSystemFlag.UNKNOWN_FLAG
	])
	("that given %s, canWrite should return false", (arg) => {
		expect(arg.canWrite()).toBeFalse();
	});

	test.each([
		FileSystemFlag.READ_AND_WRITE,
		FileSystemFlag.WRITE,
		FileSystemFlag.WRITE_ONLY_NON_EXISTING,
		FileSystemFlag.WRITE_AND_READ,
		FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING,
		FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS
	])
	("that given %s, canWrite should return true", (arg) => {
		expect(arg.canWrite()).toBeTrue();
	});

	test.each([
		FileSystemFlag.APPEND_SYNCHRONOUS,
		FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS,
		FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS,
		FileSystemFlag.NULL,
		FileSystemFlag.UNKNOWN_FLAG
	])
	("that given %s, isAsynchronous returns false", (arg) => {
		expect(arg.isAsynchronous()).toBeFalse();
	});

	test.each([
		FileSystemFlag.APPEND,
		FileSystemFlag.APPEND_ONLY_EXISTING,
		FileSystemFlag.APPEND_AND_READ,
		FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING,
		FileSystemFlag.READ,
		FileSystemFlag.READ_AND_WRITE,
		FileSystemFlag.WRITE,
		FileSystemFlag.WRITE_ONLY_NON_EXISTING,
		FileSystemFlag.WRITE_AND_READ,
		FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING
	])
	("that given %s, isAsynchronous returns true", (arg) => {
		expect(arg.isAsynchronous()).toBeTrue();
	});

	test.each([
		FileSystemFlag.APPEND,
		FileSystemFlag.APPEND_ONLY_EXISTING,
		FileSystemFlag.APPEND_AND_READ,
		FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING,
		FileSystemFlag.READ,
		FileSystemFlag.READ_AND_WRITE,
		FileSystemFlag.WRITE,
		FileSystemFlag.WRITE_ONLY_NON_EXISTING,
		FileSystemFlag.WRITE_AND_READ,
		FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING,
		FileSystemFlag.NULL,
		FileSystemFlag.UNKNOWN_FLAG
	])
	("that given %s, isSynchronous returns false", (arg) => {
		expect(arg.isSynchronous()).toBeFalse();
	});

	test.each([
		FileSystemFlag.APPEND_SYNCHRONOUS,
		FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS,
		FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS
	])
	("that given %s, isSynchronous returns true", (arg) => {
		expect(arg.isSynchronous()).toBeTrue();
	});

	test.each([
		FileSystemFlag.APPEND,
		FileSystemFlag.APPEND_ONLY_EXISTING,
		FileSystemFlag.APPEND_AND_READ,
		FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING,
		FileSystemFlag.APPEND_SYNCHRONOUS,
		FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS,
		FileSystemFlag.READ,
		FileSystemFlag.READ_AND_WRITE,
		FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS,
		FileSystemFlag.WRITE,
		FileSystemFlag.WRITE_ONLY_NON_EXISTING,
		FileSystemFlag.WRITE_AND_READ,
		FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING,
		FileSystemFlag.UNKNOWN_FLAG
	])
	("that given %s, isNull returns false", (arg) => {
		expect(arg.isNull()).toBeFalse();
	});

	test("that given FileSystemFlag:NULL, isNull returns true", () => {
		expect(FileSystemFlag.NULL.isNull()).toBeTrue();
	});

	test.each(FileSystemFlag.SUPPORTED_TYPES)
	("that given %s, isUnknown returns false", (arg) => {
		expect(arg.isUnknown()).toBeFalse();
	});

	test("that given FileSystemFlag:UNKNOWN, isUnknown returns true", () => {
		expect(FileSystemFlag.UNKNOWN_FLAG.isUnknown()).toBeTrue();
	});

	test.each([
		{ arg: FileSystemFlag.APPEND, result: "a" },
		{ arg: FileSystemFlag.APPEND_ONLY_EXISTING, result: "ax" },
		{ arg: FileSystemFlag.APPEND_AND_READ, result: "a+" },
		{ arg: FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING, result: "ax+" },
		{ arg: FileSystemFlag.APPEND_SYNCHRONOUS, result: "as" },
		{ arg: FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS, result: "as+" },
		{ arg: FileSystemFlag.READ, result: "r" },
		{ arg: FileSystemFlag.READ_AND_WRITE, result: "r+" },
		{ arg: FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS, result: "rs+" },
		{ arg: FileSystemFlag.WRITE, result: "w" },
		{ arg: FileSystemFlag.WRITE_ONLY_NON_EXISTING, result: "wx" },
		{ arg: FileSystemFlag.WRITE_AND_READ, result: "w+" },
		{ arg: FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING, result: "wx+" },
		{ arg: FileSystemFlag.UNKNOWN_FLAG, result: "UNKNOWN" },
		{ arg: FileSystemFlag.NULL, result: null }
	])
	("that given $arg, flag returns $result", ({ arg, result}) => {
		expect(arg.flag).toBe(result);
	});

});
