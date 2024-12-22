import "jest-extended";
import { LogLevel } from "../../../.src";

/**
 *
 * Test Suite for the LogLevel class.
 *
 * @group unit
 * @group znum
 */
describe(
    "LogLevel Unit Test Suite",
    () => {

        test(
            'that LogLevel static toString returns "LogLevel"',
            () => {
                expect(LogLevel.toString())
                    .toBe("LogLevel");
            }
        );

        test(
            "that SUPPORTED_ZNUMS is the correct shape and size",
            () => {
                const values: Array<LogLevel> = LogLevel.SUPPORTED_ZNUMS;

                expect(values)
                    .toBeArrayOfSize(6);
                values.forEach((value: LogLevel): void => {
                    expect({
                        code: value.code,
                        logLevel: value.logValue
                    }).toMatchSnapshot();
                });
            }
        );

        test.each([
            "fatal",
            "error",
            "warn",
            "info",
            "verbose",
            "debug"
        ])
        ("that given %s, getLogLevel returns the expected result", (arg) => {
            expect(LogLevel.getLogLevel(arg))
                .toMatchSnapshot();
        });

    }
);