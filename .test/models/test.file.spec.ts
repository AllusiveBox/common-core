import "jest-extended";
import fs from "fs";
import { TextFile } from "../../.src";

type SpyInstance = jest.SpyInstance;

/**
 *
 * Test file to be used throughout the test suite.
 *
 * @type {TextFile}
 *
 */
let file: TextFile;

/**
 *
 * Spy for the `fs.appendFile` async method.
 *
 * @type {SpyInstance}
 *
 */
let appendSpy: SpyInstance;

/**
 *
 * Spy for the `TextFile.emit` method.
 *
 * @type {SpyInstance}
 *
 */
let eventSpy: SpyInstance;

/**
 *
 * Spy for the `fs.existsSync` synchronous method.
 *
 * @type {SpyInstance}
 *
 */
let existsSpy: SpyInstance;

/**
 *
 * Spy for the `fs.readFile` async method.
 *
 * @type {SpyInstance}
 *
 */
let readSpy: SpyInstance;

/**
 *
 * Spy for the `fs.writeFile` async method.
 *
 * @type {SpyInstance}
 *
 */
let writeSpy: SpyInstance;

/**
 *
 *
 * @group unit
 * @group models
 * @group entity
 * @group file
 *
 */
describe("TestFile Unit Test Suite", () => {

	beforeAll(() => {
		// Create the initial mocks
		createFsMocks();
	});

	beforeEach(() => {
		// Create a file and event spy
		createFileAndSpy();

		// Reset the fs mocks from previous runs
		resetFsMocks();
	});

	afterAll(() => {
		jest.mock("fs").restoreAllMocks();
	});

	test("that static toString returns TextFile", () => {
		expect(`${TextFile}`)
			.toBe("TextFile");
	});

	test("that creating a new TextFile instance is possible and correctly assigns default values", () => {
		expect(file.name)
			.toBe("Test");
		expect(file.location)
			.toBe("test/path");
		expect(file.fullName)
			.toBe("Test.txt");
		expect(file.content)
			.toBeEmpty();
		expect(file.isOpen)
			.toBeFalse();
	});

	test("that toString returns TextFile:Test.txt", () => {
		expect(`${file}`)
			.toBe("TextFile:Test.txt");
	});

	test("that create throws an error and doesn't create a file if it already exists", async () => {
		// Setup
		existsSpy.mockReturnValue(true);

		await expect(file.create())
			.rejects
			.toThrowError("Unable to create Test; File already exists");

		expect(writeSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that create correctly creates a file if it doesn't already exist", async () => {
		// Setup
		existsSpy.mockReturnValue(false);

		let providedCb: any;

		writeSpy.mockImplementation((path, data, cb) => {
			providedCb = cb;
			cb(null);
		});

		// Run
		await expect(file.create("Hello World"))
			.resolves
			.not
			.toThrowError();

		expect(file.content)
			.toBe("Hello World");

		expect(existsSpy)
			.toHaveBeenCalledOnce();

		expect(writeSpy)
			.toHaveBeenCalledOnce();

		expect(() => {
			providedCb(new Error());
		}).toThrowError();

		const writeParams: Array<any> = writeSpy.mock.calls[0];
		expect(writeParams)
			.toBeArrayOfSize(3);
		expect(writeParams[0])
			.toBe("test/path/Test.txt");
		expect(writeParams[1])
			.toBe("Hello World")
		expect(writeParams[2])
			.toBeDefined();

		expect(eventSpy)
			.toHaveBeenCalledOnce();

		const eventParams: Array<any> = eventSpy.mock.calls[0];
		expect(eventParams)
			.toBeArrayOfSize(2);
		expect(eventParams[0])
			.toBe("create");
		expect(eventParams[1])
			.toBe("Hello World");
	});

	test("that read throws an error and does nothing if the file is not open", async () => {
		await expect(file.read())
			.rejects
			.toThrowError("Unable to read Test; File is not open");

		expect(existsSpy)
			.not
			.toHaveBeenCalled();
		expect(readSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that read throws an error and does nothing if the file does not exist", async () => {
		// Setup
		existsSpy.mockReturnValue(false);
		file["isOpen"] = true;

		// Run
		await expect(file.read())
			.rejects
			.toThrowError("Unable to read Test; File does not exist");

		expect(existsSpy)
			.toHaveBeenCalledOnce();
		expect(readSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that read throws an error and does nothing if the attempt to read the file throws an error", async () => {
		// Setup
		existsSpy.mockReturnValue(true);

		readSpy.mockImplementation(() => {
			throw new Error("Test Error");
		});

		file["isOpen"] = true;

		// Run
		await expect(file.read())
			.rejects
			.toThrowError("Test Error");

		expect(existsSpy)
			.toHaveBeenCalled();
		expect(readSpy)
			.toHaveBeenCalledOnce();

		const readParams: Array<any> = readSpy.mock.calls[0];
		expect(readParams)
			.toBeArrayOfSize(2);
		expect(readParams[0])
			.toBe("test/path/Test.txt");
		expect(readParams[1])
			.toBeDefined();

		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that read correctly reads a file that exists and is open and no read errors are thrown", async () => {
		// Setup
		existsSpy.mockReturnValue(true);

		readSpy.mockImplementation((path, cb) => {
			cb(null, Buffer.from(`${path}`, "utf-8"));
		});

		const eventSpy = jest.spyOn(file, "emit");
		file["isOpen"] = true;

		// Run
		await expect(file.read())
			.resolves
			.not
			.toThrowError();

		expect(existsSpy)
			.toHaveBeenCalledOnce();

		expect(readSpy)
			.toHaveBeenCalledOnce();

		expect(eventSpy)
			.toHaveBeenCalledOnce();

		const eventParams: Array<any> = eventSpy.mock.calls[0];
		expect(eventParams)
			.toBeArrayOfSize(3)
		expect(eventParams[0])
			.toBe("read");
		expect(eventParams[1])
			.toBe("Test");
		expect(eventParams[2])
			.toBe("test/path/Test.txt");

		expect(file.content)
			.toBe("test/path/Test.txt");
	});

	test("that write throws an error and does nothing if the file is not open", async () => {
		await expect(file.write())
			.rejects
			.toThrowError("Unable to write to Test; File is not open");

		expect(existsSpy)
			.not
			.toHaveBeenCalled();
		expect(writeSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that write throws an error and does nothing if the file does not exist", async () => {
		// Setup
		existsSpy.mockReturnValue(false);
		file["isOpen"] = true;

		// Run
		await expect(file.write())
			.rejects
			.toThrowError("Unable to write to Test; File does not exist");

		expect(existsSpy)
			.toHaveBeenCalledOnce();
		expect(writeSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that write throws an error and does nothing if the write attempt throws an error", async () => {
		// Setup
		existsSpy.mockReturnValue(true);

		writeSpy.mockImplementation(() => {
			throw new Error("Test Error");
		});

		file["isOpen"] = true;

		// Run
		await expect(file.write())
			.rejects
			.toThrowError("Test Error");

		expect(existsSpy)
			.toHaveBeenCalledOnce();
		expect(writeSpy)
			.toHaveBeenCalledOnce();

		const writeParams: Array<any> = writeSpy.mock.calls[0];
		expect(writeParams)
			.toBeArrayOfSize(4);
		expect(writeParams[0])
			.toBe("test/path/Test.txt");
		expect(writeParams[1])
			.toBe("");
		expect(writeParams[2])
			.toBe("utf-8");
		expect(writeParams[3])
			.toBeDefined();

		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that write correctly writes to a file that exists and is open and no write errors are thrown", async () => {
		// Setup
		existsSpy.mockReturnValue(true);

		writeSpy.mockImplementation((path, content, options, cb) => {
			cb();
		});

		file["isOpen"] = true;

		// Run
		await expect(file.write("Hello world"))
			.resolves
			.not
			.toThrowError();

		expect(existsSpy)
			.toHaveBeenCalledOnce();

		expect(writeSpy)
			.toHaveBeenCalledOnce();

		expect(eventSpy)
			.toHaveBeenCalledOnce();

		const eventParams: Array<any> = eventSpy.mock.calls[0];
		expect(eventParams)
			.toBeArrayOfSize(4);
		expect(eventParams[0])
			.toBe("contentChange");
		expect(eventParams[1])
			.toBe("Test");
		expect(eventParams[2])
			.toBeEmpty();
		expect(eventParams[3])
			.toBe("Hello world");

		expect(file.content)
			.toBe("Hello world");
	});

	test("that update throws an error and does nothing if the file dis not open", async () => {
		await expect(file.update("Test"))
			.rejects
			.toThrowError("Unable to update Test; File is not open");

		expect(existsSpy)
			.not
			.toHaveBeenCalled();
		expect(writeSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that update throws an error and does nothing if the file does not exist", async () => {
		// Setup
		existsSpy.mockReturnValue(false);
		file["isOpen"] = true;

		// Run
		await expect(file.update("Test"))
			.rejects
			.toThrowError("Unable to update Test; File does not exist");

		expect(existsSpy)
			.toHaveBeenCalledOnce();
		expect(appendSpy)
			.not
			.toHaveBeenCalled()
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that update throws an error and does nothing if no update content is provided", async () => {
		// Setup
		existsSpy.mockReturnValue(true);

		appendSpy.mockImplementation(() => {
			throw new Error("Test Error");
		});

		file["isOpen"] = true;

		// Run
		await expect(file.update("Test"))
			.rejects
			.toThrowError("Test Error");

		expect(existsSpy)
			.toHaveBeenCalledOnce();
		expect(appendSpy)
			.toHaveBeenCalledOnce();

		const appendParams: Array<any> = appendSpy.mock.calls[0];
		expect(appendParams)
			.toBeArrayOfSize(4);
		expect(appendParams[0])
			.toBe("test/path/Test.txt");
		expect(appendParams[1])
			.toBe("Test");
		expect(appendParams[2])
			.toBe("utf-8");
		expect(appendParams[3])
			.toBeDefined();
	});

	test("that update throws an error and does nothing if the append attempt throws an error", async () => {
		// Setup
		existsSpy.mockReturnValue(true);

		appendSpy.mockImplementation((path, content, options, cb) => {
			cb();
		});

		file["isOpen"] = true;

		// Run
		await expect(file.update("Test"))
			.resolves
			.not
			.toThrowError();

		expect(existsSpy)
			.toHaveBeenCalledOnce();

		expect(appendSpy)
			.toHaveBeenCalled();

		expect(eventSpy)
			.toHaveBeenCalledOnce();

		const eventParams: Array<any> = eventSpy.mock.calls[0];
		expect(eventParams)
			.toBeArrayOfSize(2);
		expect(eventParams[0])
			.toBe("contentUpdated");
		expect(eventParams[1])
			.toBe("Test");

		expect(file.content)
			.toBe("Test");
	});

	test("that update correctly appends to a file that exists and is open and no append errors are thrown", async () => {
		// Setup
		existsSpy.mockReturnValue(true);

		appendSpy.mockImplementation((path, content, options, cb) => {
			cb();
		});

		file["isOpen"] = true;

		// Run
		await expect(file.update("Test"))
			.resolves
			.not
			.toThrowError();

		expect(existsSpy)
			.toHaveBeenCalledOnce();

		expect(appendSpy)
			.toHaveBeenCalledOnce();

		expect(eventSpy)
			.toHaveBeenCalledOnce();

		const eventParams: Array<any> = eventSpy.mock.calls[0];
		expect(eventParams)
			.toBeArrayOfSize(2);
		expect(eventParams[0])
			.toBe("contentUpdated");
		expect(eventParams[1])
			.toBe("Test");

		expect(file.content)
			.toBe("Test");
	});

});

/**
 *
 * Helper function to create a {@link TextFile} to be used in this test suite.
 *
 * @param {string} [fileName="Test"]      The name for the TextFile being created. Optional.
 * @param {string} [filePath="test/path"] The location path for the TextFile being created. Optional.
 * @returns {void}
 *
 */
function createFileAndSpy(
	fileName: string = "Test",
	filePath: string = "test/path"
): void {
	file = new TextFile(fileName, filePath);
	eventSpy = jest.spyOn(file, "emit");
}

/**
 *
 * Helper function to create the initial fs module mocks.
 *
 * @returns {void}
 *
 */
function createFsMocks(): void {
	appendSpy = jest.spyOn(fs, "appendFile");
	existsSpy = jest.spyOn(fs, "existsSync");
	readSpy = jest.spyOn(fs, "readFile");
	writeSpy = jest.spyOn(fs, "writeFile");
}

/**
 *
 * Helper function to reset the various fs module mocks.
 *
 * @returns {void}
 *
 */
function resetFsMocks(): void {
	appendSpy.mockReset();
	eventSpy.mockReset();
	existsSpy.mockReset();
	readSpy.mockReset();
	writeSpy.mockReset();
}
