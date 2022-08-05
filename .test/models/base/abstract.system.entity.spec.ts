import "jest-extended";
import { AbstractSystemEntity, Nullable } from "../../../.src";

class TestEntity extends AbstractSystemEntity<any> {

	protected static TYPE = "TestEntity";

	constructor(name: string, location?: Nullable<string>) {
		super(name, location);
	}

	toString(): string {
		return `${this.location}:${this.name}`;
	}

}

/**
 *
 * Test Suite for the AbstractSystemEntity class.
 *
 * @group unit
 * @group models
 * @group entity
 * @group system
 * @group abstract
 *
 */
describe("AbstractSystemEntity Unit Test Suite", () => {

	test("that static toString returns TestEntity", () => {
		expect(`${TestEntity}`).toBe("TestEntity");
	});

	test("that creating a new instance is possible and correctly assigns default values", () => {
		// Setup
		const testEntity = new TestEntity("Test File");

		expect(testEntity.name).toBe("Test File");
		expect(testEntity.location).toBe(process.cwd());
	});

	test("that creating a new instance and providing the location, the provided location is used instead", () => {
		// Setup
		const testEntity = new TestEntity("Test File", "test/location");

		expect(testEntity.name).toBe("Test File");
		expect(testEntity.location).toBe("test/location");
	});

});
