import "jest-extended";
import fs from "fs";
import { AbstractFileEntity } from "../../../.src";

class TestFile extends AbstractFileEntity {

	protected readonly extension = ".txt";

	constructor(name: string, location?: string) {
		super(name, location);
	}

	public async create(arg): Promise<TestFile> { return this; }

	public async close(): Promise<void> { }

	public async delete(): Promise<void> { }

	public async move(arg): Promise<TestFile> { return this; }

	public async open(): Promise<TestFile> { return this; }

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

});
