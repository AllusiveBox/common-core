import "jest-extended";
import { AbstractEntity } from "../../../.src";

class TestEntity<T> extends AbstractEntity {

	protected static TYPE = "TestEntity";

	public static EntityMember: TestEntity<string> =
		new TestEntity<string>("STRING", "String", "Hello world");

	public static EntitySecond: TestEntity<number> =
		new TestEntity<number>("NUMBER", "Number", 1111);

	#data: T;

	constructor(code: string, text: string, data: T) {
		super(code, text, TestEntity.TYPE);
		this.#data = data;
	}

	protected getFields(): Array<string> {
		return ["code", "text", "type", "data"];
	}

	get data(): T { return this.#data; }

	set data(arg: T) { this.#data = arg; }

}

/**
 *
 * Test Suite for the AbstractEntity class.
 *
 * @group unit
 * @group models
 * @group entity
 * @group abstract
 *
 */
describe("AbstractEntity Unit Test Suite", () => {

	test("that static toString returns TestEntity", () => {
		expect(`${TestEntity}`).toBe("TestEntity");
	});

	test("that creating a new instance is possible and correctly assigns values", () => {
		// Setup
		const testEntity = new TestEntity("TEST", "test", 1);

		expect(testEntity.code).toBe("TEST");
		expect(testEntity.text).toBe("test");
		expect(testEntity.type).toBe("TestEntity");
		expect(testEntity.data).toBe(1);
	});

	test("that given a different entity, isEqual returns false", () => {
		// Setup
		const testEntity = new TestEntity("TEST", "test", 1);

		expect(TestEntity.EntityMember.isEqual(testEntity)).toBeFalse();
	});

	test("that given the same entity, isEqual returns true", () => {
		expect(TestEntity.EntityMember.isEqual(TestEntity.EntityMember)).toBeTrue();
	});

	test("that given an object with the same fields, isEqual returns true", () => {
		// Setup
		const testObj = {
			code: "STRING",
			text: "String",
			type: "TestEntity",
			data: "Hello world"
		};

		expect(TestEntity.EntityMember.isEqual(<TestEntity<string>>testObj)).toBeTrue();
	});

	test("that given a different entity, isStrictEqual returns false", () => {
		expect(TestEntity.EntityMember.isStrictEqual(TestEntity.EntitySecond)).toBeFalse();
	});

	test.each([
		[TestEntity.EntityMember, "TestEntity:STRING"],
		[TestEntity.EntitySecond,"TestEntity:NUMBER"],
		[new TestEntity("TEST", "Test", "test"), "TestEntity:TEST"]
	])
	("that given %s, toString returns %s", (testEntity: TestEntity<any>, expectedString: string) => {
		expect(`${testEntity}`).toBe(expectedString);
	});

});
