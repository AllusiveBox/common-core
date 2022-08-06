import "jest-extended";
import fs from "fs";
import { AbstractFileEntity } from "../../../.src";

jest.mock("fs");

class TestFile extends AbstractFileEntity {

	protected readonly extension = ".txt";

	constructor(name: string, location?: string) {
		super(name, location);
	}

	public async move(arg): Promise<TestFile> { return this; }

	public async read(): Promise<TestFile> { return this; }

	public async rename(arg): Promise<TestFile> { return this; }

	public async write(arg): Promise<TestFile> { return this; }

	public async update(arg): Promise<TestFile> { return this; }

	toString() {
		return `${TestFile.TYPE}:${this.fullName}`;
	}

}

/**
 *
 * Test file to be used throughout the test suite.
 *
 * @type {TestFile}
 *
 */
let testFile: TestFile;

/**
 *
 * Test Suite for the AbstractFileEntity class.
 *
 * @group unit
 * @group models
 * @group entity
 * @group file
 * @group abstract
 *
 */
describe("AbstractFileEntity Unit Test Suite", () => {

	beforeEach(() => {
		testFile = new TestFile("Test");
		jest.mock("fs").resetAllMocks();
	});

	afterAll(() => {
		jest.mock("fs").restoreAllMocks()
	});

	test("that static toString returns TestFileEntity", () => {
		expect(`${TestFile}`).toBe("File");
	});

	test("that creating a new instance is possible and correctly assigns default values", () => {
		expect(testFile.name).toBe("Test");
		expect(testFile.location).toBe(process.cwd());
		expect(testFile.fullName).toBe("Test.txt");
		expect(testFile.content).toBeNull();
		expect(testFile.isOpen).toBeFalse();
	});

	test("that exists correctly flags if a file does not exist", () => {
		// Setup
		jest.spyOn(fs, "existsSync").mockReturnValue(true);

		expect(testFile.exists).toBeTrue();
	});

	test("that exists correctly flags that a file does not exist", () => {
		// Setup
		jest.spyOn(fs, "existsSync").mockReturnValue(false);

		expect(testFile.exists).toBeFalse();
	});

	test("that create throws an error and doesn't create a file if it already exists", async () => {
		// Setup
		jest.spyOn(fs, "existsSync").mockReturnValue(true);
		const writeFileSpy = jest.spyOn(fs, "writeFile");

		const file = new TestFile("test_file");
		await expect(file.create()).rejects
			.toThrowError("Unable to create test_file; File already exists");

		expect(writeFileSpy).not.toHaveBeenCalled();
	});

	test("that create correctly creates a file if it doesn't already exist", async () => {
		// Setup
		jest.spyOn(fs, "existsSync").mockReturnValue(false);

		let providedPath: any;
		let providedData: any;
		let providedCb: any;
		jest.spyOn(fs, "writeFile").mockImplementation((path, data, cb) => {
			providedPath = path;
			providedData = data;
			providedCb = cb;
		});

		const file = new TestFile("test_file", "test/path");

		// Run
		await expect(file.create("Hello World")).resolves.not.toThrowError();

		expect(file.content).toBe("Hello World");
		expect(providedPath).toBe("test/path/test_file.txt");
		expect(providedData).toBe("Hello World");
		expect(providedCb).toBeDefined();

		expect(() => {
			providedCb(new Error());
		}).toThrowError();
	});

	test("that close throws an error and does nothing if the file does not exist", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(false);
		const closeSpy = jest.spyOn(fs, "close");

		const file = new TestFile("test_file");

		// Run
		await expect(file.close()).rejects
			.toThrowError("Unable to close test_file; File does not exist");

		expect(closeSpy).not.toHaveBeenCalled();
	});

	test("that close throws an error and does nothing if the file is unable to determine the file descriptor", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(true);
		const closeSpy = jest.spyOn(fs, "close");

		const file = new TestFile("test_file");

		// Run
		await expect(file.close()).rejects
			.toThrowError("Unable to close test_file; Unable to determine file descriptor");

		expect(closeSpy).not.toHaveBeenCalled();
	});

	test("that close does nothing if the file is not already open and the file exists", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(true);
		const closeSpy = jest.spyOn(fs, "close");

		const file = new TestFile("test_file");
		file["fileNumber"] = 1;

		// Run
		await expect(file.close()).resolves.not.toThrowError();

		expect(existsSyncSpy).toHaveBeenCalledOnce();
		expect(closeSpy).not.toHaveBeenCalled();
	});

	test("that close correctly closes a file that exists", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(true);

		let providedFileData: any;
		let providedCb: any;
		jest.spyOn(fs, "close").mockImplementation((fd, cb) => {
			providedFileData = fd;
			providedCb = cb;
		});

		const file = new TestFile("test_file");
		file["fileNumber"] = 1;
		file["isOpen"] = true;

		// Run
		await expect(file.close()).resolves.not.toThrowError();

		expect(providedFileData).toBe(1)
		expect(providedCb).toBeDefined();
		expect(() => {
			providedCb(new Error());
		}).toThrowError();
	});

});
