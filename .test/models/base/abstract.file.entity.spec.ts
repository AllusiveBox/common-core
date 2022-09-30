import "jest-extended";
import fs from "fs";
import { AbstractFileEntity, FileSystemFlag } from "../../../.src";

jest.mock("fs");

class TestFile extends AbstractFileEntity {

	protected readonly extension = ".txt";

	constructor(name: string, location?: string) {
		super(name, location);
	}

	public async create(): Promise<TestFile> { return this; }

	public async read(): Promise<TestFile> { return this; }

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

	test("that static toString returns File", () => {
		expect(`${TestFile}`)
			.toBe("File");
	});

	test("that creating a new instance is possible and correctly assigns default values", () => {
		expect(testFile.name)
			.toBe("Test");
		expect(testFile.location)
			.toBe(process.cwd());
		expect(testFile.fullName)
			.toBe("Test.txt");
		expect(testFile.content)
			.toBeNull();
		expect(testFile.isOpen)
			.toBeFalse();
	});

	test("that toString returns File:Test.txt", () => {
		expect(`${testFile}`)
			.toBe("File:Test.txt");
	});

	test("that exists correctly flags if a file does exist", () => {
		// Setup
		jest.spyOn(fs, "existsSync").mockReturnValue(true);

		expect(testFile.exists)
			.toBeTrue();
	});

	test("that exists correctly flags that a file does not exist", () => {
		// Setup
		jest.spyOn(fs, "existsSync").mockReturnValue(false);

		expect(testFile.exists)
			.toBeFalse();
	});

	test("that close throws an error and does nothing if the file does not exist", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(false);
		const closeSpy = jest.spyOn(fs, "close");

		const file = new TestFile("test_file");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.close())
			.rejects
			.toThrowError("Unable to close test_file; File does not exist");

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();
		expect(closeSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that close throws an error and does nothing if the file is unable to determine the file descriptor", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(true);
		const closeSpy = jest.spyOn(fs, "close");

		const file = new TestFile("test_file");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.close())
			.rejects
			.toThrowError("Unable to close test_file; Unable to determine file descriptor");

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();
		expect(closeSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that close does nothing if the file is not already open and the file exists", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(true);
		const closeSpy = jest.spyOn(fs, "close");

		const file = new TestFile("test_file");
		file["fileNumber"] = 1;
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.close())
			.resolves
			.not
			.toThrowError();

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();
		expect(closeSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
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
			cb ? cb(null) : null;
		});

		const file = new TestFile("test_file");
		file["fileNumber"] = 1;
		file["isOpen"] = true;
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.close())
			.resolves
			.not
			.toThrowError();

		expect(providedFileData)
			.toBe(1);
		expect(providedCb)
			.toBeDefined();
		expect(() => {
			providedCb(new Error());
		}).toThrowError();

		expect(eventSpy)
			.toHaveBeenCalledOnce();
		expect(eventSpy.mock.calls)
			.toBeArrayOfSize(1);

		const eventParams = eventSpy.mock.calls[0];
		expect(eventParams)
			.toBeArrayOfSize(2);
		expect(eventParams[0])
			.toBe("close");
		expect(eventParams[1])
			.toBe("test_file");
	});

	test("that delete throws an error and does nothing if the file does not exist", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(false);
		const unlinkSpy = jest.spyOn(fs, "unlink");

		const file = new TestFile("test_file");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.delete())
			.rejects
			.toThrowError(`Unable to delete test_file; File does not exist`);

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();
		expect(unlinkSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that delete throws an error and does nothing if the file is currently open", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(true);
		const unlinkSpy = jest.spyOn(fs, "unlink");

		const file = new TestFile("test_file");
		file["isOpen"] = true;
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.delete()).rejects
			.toThrowError(`Unable to delete test_file; File is currently open`);

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();
		expect(unlinkSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that delete correctly deletes a file that exists", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(true);

		let providedPath: any;
		let providedCb: any;
		jest.spyOn(fs, "unlink").mockImplementation((path, cb) => {
			providedPath = path;
			providedCb = cb;
			cb(null);
		});

		const file = new TestFile("test_file", "test/path");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.delete())
			.resolves
			.not
			.toThrowError();

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();

		expect(providedPath)
			.toBe("test/path/test_file.txt");
		expect(providedCb)
			.toBeDefined();
		expect(() => {
			providedCb(new Error());
		}).toThrowError();

		expect(eventSpy)
			.toHaveBeenCalledOnce();

		expect(eventSpy.mock.calls)
			.toBeArrayOfSize(1);
		const eventParams = eventSpy.mock.calls[0];
		expect(eventParams)
			.toBeArrayOfSize(2);
		expect(eventParams[0])
			.toBe("delete");
		expect(eventParams[1])
			.toBe("test_file");
	});

	test.each([
		null,
		undefined
	])
	("that move throws an error and does nothing if the file is given %s for location", async (arg) => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		const moveSpy = jest.spyOn(fs, "renameSync");

		const file = new TestFile("test_file");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		// @ts-ignore
		await expect(file.move(arg))
			.rejects
			.toThrowError("Unable to move test_file; No destination provided");

		expect(existsSyncSpy)
			.not
			.toHaveBeenCalled();
		expect(moveSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that move throws an error and does nothing if the file is given an empty string for location", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		const moveSpy = jest.spyOn(fs, "renameSync");

		const file = new TestFile("test_file");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.move(""))
			.rejects
			.toThrowError("Unable to move test_file; No destination provided");

		expect(existsSyncSpy)
			.not
			.toHaveBeenCalled();
		expect(moveSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that move throws an error and does nothing if the file does not exist", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(false);
		const moveSpy = jest.spyOn(fs, "renameSync");

		const file = new TestFile("test_file");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.move("new/test/location"))
			.rejects
			.toThrowError("Unable to move test_file; File does not exist");

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();
		expect(moveSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});


	test("that move correctly moves a file that exists", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(true);
		const moveSpy = jest.spyOn(fs, "renameSync");

		const file = new TestFile("test_file", "test/location");
		file["isOpen"] = true;
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.move("new/test/location"))
			.resolves
			.not
			.toThrowError();

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();
		expect(moveSpy)
			.toHaveBeenCalledOnce();
		expect(moveSpy.mock.calls)
			.toBeArrayOfSize(1);

		const moveParams = moveSpy.mock.calls[0];
		expect(moveParams)
			.toBeArrayOfSize(2);
		expect(moveParams[0])
			.toBe("test/location/test_file.txt");
		expect(moveParams[1])
			.toBe("new/test/location/test_file.txt");

		expect(eventSpy)
			.toHaveBeenCalledOnce();
		expect(eventSpy.mock.calls)
			.toBeArrayOfSize(1);

		const eventParams = eventSpy.mock.calls[0];
		expect(eventParams)
			.toBeArrayOfSize(4);
		expect(eventParams[0])
			.toBe("fileMoved");
		expect(eventParams[1])
			.toBe("test_file");
		expect(eventParams[2])
			.toBe("test/location");
		expect(eventParams[3])
			.toBe("new/test/location");
	});

	test("that open throws an error and does nothing if the file does not exist", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(false);
		const openSpy = jest.spyOn(fs, "open");

		const file = new TestFile("test_file");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.open(FileSystemFlag.READ))
			.rejects
			.toThrowError("Unable to open test_file; File does not exist");

		expect(existsSyncSpy)
			.toHaveBeenCalledTimes(2);
		expect(openSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that open does nothing if the file is already open and exists", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(true);
		const openSpy = jest.spyOn(fs, "open");

		const file = new TestFile("test_file");
		file["isOpen"] = true;
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.open(FileSystemFlag.READ))
			.resolves
			.not
			.toThrowError();

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();
		expect(openSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that open correctly opens a file that exists", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(true);

		let providedPath: any;
		let providedFlag: any;
		let providedCb: any;
		// @ts-ignore
		jest.spyOn(fs, "open").mockImplementation((path, flag, cb) => {
			providedPath = path;
			providedFlag = flag;
			providedCb = cb;
			cb(null, 1);
		});

		const file = new TestFile("test_file", "test/path");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.open(FileSystemFlag.READ_AND_WRITE))
			.resolves
			.not
			.toThrowError();

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();

		expect(providedPath)
			.toBe("test/path/test_file.txt");
		expect(providedFlag)
			.toBe("r+");
		expect(providedCb)
			.toBeDefined();
		expect(() => {
			providedCb(new Error());
		}).toThrowError();

		expect(eventSpy)
			.toHaveBeenCalledOnce();

		expect(eventSpy.mock.calls)
			.toBeArrayOfSize(1);
		const eventParams = eventSpy.mock.calls[0];

		expect(eventParams)
			.toBeArrayOfSize(3);
		expect(eventParams[0])
			.toBe("open");
		expect(eventParams[1])
			.toBe("test_file");
		expect(eventParams[2])
			.toBe(1);
	});

	test.each([
		null,
		undefined
	])
	("that rename throws an error and does nothing if the file is given %s for fileName", async (arg) => {
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		const renameSpy = jest.spyOn(fs, "renameSync");

		const file = new TestFile("test_file");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		// @ts-ignore
		await expect(file.rename(arg))
			.rejects
			.toThrowError("Unable to rename test_file; No name provided");

		expect(existsSyncSpy)
			.not
			.toHaveBeenCalled();
		expect(renameSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that rename throws an error and does nothing if the file is given an empty string for a name", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		const renameSpy = jest.spyOn(fs, "renameSync");

		const file = new TestFile("test_file");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.rename(""))
			.rejects
			.toThrowError("Unable to rename test_file; No name provided");

		expect(existsSyncSpy)
			.not
			.toHaveBeenCalled();
		expect(renameSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that rename throws an error and does nothing if the file does not already exist", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(false);
		const renameSpy = jest.spyOn(fs, "renameSync");

		const file = new TestFile("test_file");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.rename("new_name"))
			.rejects
			.toThrowError("Unable to rename test_file; File does not exist");

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();
		expect(renameSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that rename does nothing if the file name isn't new", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(true);
		const renameSpy = jest.spyOn(fs, "renameSync");

		const file = new TestFile("test_name");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.rename("test_name"))
			.resolves
			.not
			.toThrowError();

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();
		expect(renameSpy)
			.not
			.toHaveBeenCalled();
		expect(eventSpy)
			.not
			.toHaveBeenCalled();
	});

	test("that rename correctly renames a file that exists", async () => {
		// Setup
		const existsSyncSpy = jest.spyOn(fs, "existsSync");
		existsSyncSpy.mockReturnValue(true);
		const renameSpy = jest.spyOn(fs, "renameSync");

		const file = new TestFile("test_file");
		const eventSpy = jest.spyOn(file, "emit");

		// Run
		await expect(file.rename("new_file"))
			.resolves
			.not
			.toThrowError();

		expect(existsSyncSpy)
			.toHaveBeenCalledOnce();
		expect(renameSpy)
			.toHaveBeenCalledOnce();
		expect(renameSpy.mock.calls)
			.toBeArrayOfSize(1);

		const renameParams = renameSpy.mock.calls[0];
		expect(renameParams)
			.toBeArrayOfSize(2);
		expect(renameParams[0])
			.toBe(`${process.cwd()}/test_file.txt`);
		expect(renameParams[1])
			.toBe(`${process.cwd()}/new_file.txt`);

		expect(eventSpy)
			.toHaveBeenCalledOnce();
		expect(eventSpy.mock.calls)
			.toBeArrayOfSize(1);

		const eventParams = eventSpy.mock.calls[0];
		expect(eventParams)
			.toBeArrayOfSize(3);
		expect(eventParams[0])
			.toBe("fileRenamed");
		expect(eventParams[1])
			.toBe("test_file");
		expect(eventParams[2])
			.toBe("new_file");
	});

});
