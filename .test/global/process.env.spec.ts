import "jest-extended";

/**
 *
 * Test Suite for the process.env variable. This test suite checks to ensure that the global run is properly
 * configured before attempting to run any additional jest tests.
 *
 * @group global
 * @group process
 *
 */
describe("process.env Global Tests", () => {

	it("should have UTC set for the timezone (TZ) variable", () => {
		let timezone: string = process.env.TZ || "";

		expect(timezone)
			.toBe("UTC");
	});

	it("should have NODE_ENV set to test", () => {
		let environment: string = process.env.NODE_ENV || "";

		expect(environment)
			.toBe("test");
	});

});
