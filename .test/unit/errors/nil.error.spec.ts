import "jest-extended";
import { NilError } from "../../../.src";

/**
 *
 * Test Suite for the NilError class.
 *
 * @group unit
 * @group errors
 * @group nil
 *
 */
describe(
    "NilError Unit Test Suite",
    () => {

        test(
            "that NilError initializes correctly",
            () => {
                // setup
                const error = new NilError();

                expect(error)
                    .toMatchObject({
                        cause: "Null or undefined value",
                        context: undefined,
                        message: "Null or undefined value",
                        name: "NilError"
                    });
            }
        );

        test.each([
            null,
            undefined
        ])
        (
            "that given %s, NilError correctly sets the message field",
            (arg) => {
                // Setup
                const error: NilError<never> = new NilError<never>(arg as any);

                expect(error.message)
                    .toMatchSnapshot();
            }
        );

        test(
            "that given a message, NilError correctly sets the message field",
            () => {
                // Setup
                const error: NilError<never> = new NilError<never>("Test");

                expect(error.message)
                    .toMatchInlineSnapshot(`"Test"`);
            }
        );

    }
);
