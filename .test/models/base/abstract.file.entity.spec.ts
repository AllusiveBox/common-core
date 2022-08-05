import "jest-extended";
import fs from "fs";
import { AbstractFileEntity, FileSystemFlag, OperationOptions } from "../../../.src";

class TestFile extends AbstractFileEntity {

	protected readonly extension = ".txt";

	operationOptions: Array<OperationOptions> = [];

	constructor(name: string, location?: string) {
		super(name, location);
	}

	protected async operate(options: OperationOptions): Promise<void> {
		this.operationOptions.push(options);
	}

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
	});

	test("that static toString returns TestFileEntity", () => {
		expect(`${TestFile}`).toBe("File");
	});

	test("that creating a new instance is possible and correctly assigns default values", () => {
		expect(testFile.name).toBe("Test");
		expect(testFile.location).toBe(process.cwd());
		expect(testFile.fullName).toBe("Test.txt");
		expect(testFile.content).toBeNull();
	});

	test("that create passes the correct parameters to operate", async () => {
		await testFile.create("Hello world");

		expect(testFile.operationOptions).toBeArrayOfSize(1);

		const options = testFile.operationOptions[0];
		expect(options).toEqual({
			event: "create",
			data: "Hello world",
			flag: FileSystemFlag.WRITE_ONLY_NON_EXISTING
		});
	});

	test("that close passes the correct parameters to operate", async () => {
		await testFile.close();

		expect(testFile.operationOptions).toBeArrayOfSize(1);

		const options = testFile.operationOptions[0];
		expect(options).toEqual({
			event: "close"
		});
		expect(testFile.isOpen).toBeFalse();
	});

	test("that delete passes the correct parameters to operate", async () => {
		await testFile.delete();

		expect(testFile.operationOptions).toBeArrayOfSize(1);
		const options = testFile.operationOptions[0];
		expect(options).toEqual({
			event: "delete"
		});
	});

	test("that move passes the correct parameters to operate", async () => {
		await testFile.move("new/location");

		expect(testFile.operationOptions).toBeArrayOfSize(1);
		const options = testFile.operationOptions[0];
		expect(options).toEqual({
			event: "fileMoved",
			flag: FileSystemFlag.WRITE_ONLY_NON_EXISTING,
			data: "new/location"
		});
	});

	test("that open passes the correct parameters to operate", async () => {
		await testFile.open();

		expect(testFile.operationOptions).toBeArrayOfSize(1);
		const options = testFile.operationOptions[0];
		expect(options).toEqual({
			event: "open"
		});
		expect(testFile.isOpen).toBeTrue();
	});

	test("that read passes the correct parameters to operate", async () => {
		await testFile.read();

		expect(testFile.operationOptions).toBeArrayOfSize(1);
		const options = testFile.operationOptions[0];
		expect(options).toEqual({
			event: "read",
			flag: FileSystemFlag.READ
		});
	});

	test("that rename passed the correct parameters to operate", async () => {
		await testFile.rename("New name");

		expect(testFile.operationOptions).toBeArrayOfSize(1);
		const options = testFile.operationOptions[0];
		expect(options).toEqual({
			event: "fileRenamed",
			data: "New name"
		});
	});

	test("that write passes the correct parameters to operate", async () => {
		await testFile.write("Hello world");

		expect(testFile.operationOptions).toBeArrayOfSize(1);
		const options = testFile.operationOptions[0];
		expect(options).toEqual({
			event: "contentChange",
			data: "Hello world",
			flag: FileSystemFlag.WRITE
		});
	});

	test("that update passes the correct parameters to operate", async () => {
		await testFile.update("Hello world");

		expect(testFile.operationOptions).toBeArrayOfSize(1);
		const options = testFile.operationOptions[0];
		expect(options).toEqual({
			event: "contentChange",
			data: "Hello world",
			flag: FileSystemFlag.APPEND_ONLY_EXISTING
		});
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

});
