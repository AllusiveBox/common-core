import "jest-extended";
import {
    Znum,
    ZnumDoesNotExist
} from "../../../.src";

/**
 *
 * Test Suite for the ZnumDoesNotExist class.
 *
 * @group unit
 * @group errors
 * @group znum
 *
 */
describe(
    "ZnumDoesNotExist Unit Test Suite",
    () => {

        test(
            "that ZnumDoesNotExist initializes correctly",
            () => {
                // Setup
                const error: ZnumDoesNotExist<string, typeof Znum> =
                    new ZnumDoesNotExist<string, typeof Znum>(
                        "Test",
                        Znum
                    );

                expect(error)
                    .toMatchObject({
                        cause: '"Test" does not map to a Znum',
                        context: undefined,
                        message: "Unable to convert Znum into Znumable value; Ensure that the Znum is properly" +
                            " configured"
                    });
            }
        );

        test(
            'that when "value" is a Znum, the correct error message is built',
            () => {
                // Setup
                class TestZnum extends Znum<string> {

                    static STRING_ZNUM: TestZnum = new TestZnum("Test");

                    static override TYPE: string = "TestZnum";

                    protected setZnumMap(value: never): void {
                    }

                    override get code(): string {
                        return "Test";
                    }

                    override get symbol(): symbol {
                        return Symbol("Test");
                    }

                    get type(): string {
                        return "TestZnum";
                    }

                }

                const error: ZnumDoesNotExist<string, typeof TestZnum> =
                    new ZnumDoesNotExist<string, typeof TestZnum>(
                        TestZnum.STRING_ZNUM,
                        TestZnum
                    );

                expect(error.message)
                    .toMatchInlineSnapshot(`"Unable to get TestZnum for "Test"; Ensure the correct value is provided and that the TestZnum class is properly configured"`);
            }
        );

        test(
            'that when "value" is not a Znum, the standard error message is built',
            () => {
                // Setup
                const error: ZnumDoesNotExist<string, typeof Znum> =
                    new ZnumDoesNotExist<string, typeof Znum>(
                        "Test",
                        Znum
                    );

                expect(error.message)
                    .toMatchInlineSnapshot(`"Unable to convert Znum into Znumable value; Ensure that the Znum is properly configured"`);
            }
        );

    }
);