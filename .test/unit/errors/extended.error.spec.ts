import "jest-extended";
import {
    ExtendedError,
    ExtendedErrorOptions
} from "../../../.src";

/**
 *
 * Test Suite for the ExtendedError class.
 *
 * @group unit
 * @group errors
 *
 */
describe(
    "ExtendedError Unit Test Suite",
    () => {

        test(
            "that ExtendedError initializes correctly",
            () => {
                // Setup
                const error = new TestError("Test");

                expect(error)
                    .toMatchObject({
                        cause: undefined,
                        context: undefined,
                        message: "Test",
                        name: "TestError"
                    });
                expect(error.stack)
                    .not
                    .toBeUndefined();
            }
        );

        test(
            'that ExtendedError properly sets the "cause" field when a string is provided',
            () => {
                // Setup
                const error = new TestError(
                    "Test",
                    {
                        cause: "Foo"
                    }
                );

                expect(error.cause)
                    .not
                    .toBeInstanceOf(Error);
                expect(error.cause)
                    .toBe("Foo");
            }
        );

        test(
            'that ExtendedError properly sets the "cause" field when an Error object is provided',
            () => {
                // Setup
                const error = new TestError(
                    "Test",
                    {
                        cause: new Error("Test Error")
                    }
                );

                expect(error.cause)
                    .toBeInstanceOf(Error)
                expect(error.cause)
                    .toMatchObject({
                        message: "Test Error",
                        name: "Error"
                    });
            }
        );

        test(
            'that ExtendedError properly sets the "context" field when provided',
            () => {
                // Setup
                const contextObject: { foo: string } = {
                    foo: "bar"
                };
                const error = new TestError(
                    "Test",
                    {
                        context: contextObject
                    }
                );

                expect(error.context)
                    .toMatchObject({
                        foo: "bar"
                    });
            }
        );

        test(
            'that ExtendedError properly wraps the "cause" field when a string is provided and "wrapCause" is set to' +
            ' true',
            () => {
                // Setup
                const options: ExtendedErrorOptions = {
                    cause: "Test string",
                    wrapCause: true
                }
                const error = new TestError(
                    "Test",
                    options
                );

                expect(error.cause)
                    .toBeInstanceOf(Error);
                expect(error.cause)
                    .toMatchObject({
                        message: "Test string",
                        name: "Error"
                    });
            }
        );

        test(
            'that ExtendedError does not wrap the Error again if "wrapCause" is set to true',
            () => {
                // Setup
                const options: ExtendedErrorOptions = {
                    cause: new Error("Test Error"),
                    wrapCause: true
                };
                const error = new TestError(
                    "Test",
                    options
                );

                expect(error.cause)
                    .toBeInstanceOf(Error);
                expect(error.cause)
                    .toStrictEqual(options.cause);
            }
        );

    }
);

class TestError<T extends object> extends ExtendedError<T> {

    constructor(
        message: string,
        options: ExtendedErrorOptions<T> = {}
    ) {
        super(
            message,
            options
        );
    }

}