import "jest-extended";
import { Environment } from "../../../.src";

/**
 *
 * Test Suite for the Environment class.
 *
 * @group unit
 * @group znum
 *
 */
describe(
    "Environment Unit Test Suite",
    () => {

        test(
            'that Environment static toString returns "Environment"',
            () => {
                expect(Environment.toString())
                    .toBe("Environment");
            }
        );

        test(
            "that SUPPORTED_ZNUMS is the correct shape and size",
            () => {
                const values: Array<Environment> = Environment.SUPPORTED_ZNUMS;
                expect(values)
                    .toBeArrayOfSize(6);
                expect(values.at(0))
                    .toStrictEqual(Environment.PRODUCTION);
                expect(values.at(1))
                    .toStrictEqual(Environment.UAT);
                expect(values.at(2))
                    .toStrictEqual(Environment.DEVELOPMENT);
                expect(values.at(3))
                    .toStrictEqual(Environment.LOCAL);
                expect(values.at(4))
                    .toStrictEqual(Environment.TEST);
                expect(values.at(5))
                    .toStrictEqual(Environment.UNKNOWN);
            }
        );

        test.each([
            "production",
            "prod",
            "uat",
            "development",
            "dev",
            "local",
            "test",
            "unknown",
            null,
            undefined,
            "Invalid"
        ])
        (
            "that given %s, getEnvironment returns the expected result",
            (arg) => {
                expect(Environment.getEnvironment(arg))
                    .toMatchSnapshot();
            }
        );

        test.each([
            Environment.PRODUCTION,
            Environment.UAT,
            Environment.DEVELOPMENT,
            Environment.LOCAL,
            Environment.TEST,
            Environment.UNKNOWN,
            null,
            undefined,
            "Invalid"
        ])
        (
            "that given %s, getValue returns the expected result",
            (arg) => {
                expect(Environment.getValue(arg))
                    .toMatchSnapshot();
            }
        );

        test.each([
            null,
            undefined,
            "",
            1,
            true,
            {},
            [],
            new Date(),
            Symbol()
        ])
        (
            "that given %s, isEnvironment returns false",
            (arg) => {
                expect(Environment.isEnvironment(arg))
                    .toBeFalse();
            }
        );

        test.each([
            Environment.PRODUCTION,
            Environment.UAT,
            Environment.DEVELOPMENT,
            Environment.LOCAL,
            Environment.TEST,
            Environment.UNKNOWN
        ])
        (
            "that given %s, isEnvironment returns true",
            (arg) => {
                expect(Environment.isEnvironment(arg))
                    .toBeTrue();
            }
        );

        test.each([
            Environment.PRODUCTION,
            Environment.UAT,
            Environment.LOCAL,
            Environment.TEST,
            Environment.UNKNOWN
        ])
        (
            "that given %s, isDevelopment returns false",
            (arg) => {
                expect(arg.isDevelopment())
                    .toBeFalse();
            }
        );

        test.each([
            Environment.DEVELOPMENT
        ])
        (
            "that given %s, isDevelopment returns true",
            (arg) => {
                expect(arg.isDevelopment())
                    .toBeTrue();
            }
        );

        test.each([
            Environment.PRODUCTION,
            Environment.UAT,
            Environment.DEVELOPMENT,
            Environment.TEST,
            Environment.UNKNOWN
        ])
        (
            "that given %s, isLocal returns false",
            (arg) => {
                expect(arg.isLocal())
                    .toBeFalse();
            }
        );

        test.each([
            Environment.LOCAL
        ])
        (
            "that given %s, isLocal returns true",
            (arg) => {
                expect(arg.isLocal())
                    .toBeTrue();
            }
        );

        test.each([
            Environment.UAT,
            Environment.DEVELOPMENT,
            Environment.LOCAL,
            Environment.TEST,
            Environment.UNKNOWN
        ])
        (
            "that given %s, isProduction returns false",
            (arg) => {
                expect(arg.isProduction())
                    .toBeFalse();
            }
        );

        test.each([
            Environment.PRODUCTION
        ])
        (
            "that given %s, isProduction returns true",
            (arg) => {
                expect(arg.isProduction())
                    .toBeTrue();
            }
        );

        test.each([
            Environment.PRODUCTION,
            Environment.UAT,
            Environment.DEVELOPMENT,
            Environment.LOCAL,
            Environment.UNKNOWN
        ])
        (
            "that given %s, isTest returns false",
            (arg) => {
                expect(arg.isTest())
                    .toBeFalse();
            }
        );

        test.each([
            Environment.TEST
        ])
        (
            "that given %s, isTest returns true",
            (arg) => {
                expect(arg.isTest())
                    .toBeTrue();
            }
        );

        test.each([
            Environment.PRODUCTION,
            Environment.DEVELOPMENT,
            Environment.LOCAL,
            Environment.TEST,
            Environment.UNKNOWN
        ])
        (
            "that given %s, isUat returns false",
            (arg) => {
                expect(arg.isUat())
                    .toBeFalse();
            }
        );

        test.each([
            Environment.UAT
        ])
        (
            "that given %s, isUat returns true",
            (arg) => {
                expect(arg.isUat())
                    .toBeTrue();
            }
        );

        test.each([
            Environment.PRODUCTION,
            Environment.UAT,
            Environment.DEVELOPMENT,
            Environment.LOCAL,
            Environment.TEST
        ])
        (
            "that given %s, isUnknown returns false",
            (arg) => {
                expect(arg.isUnknown())
                    .toBeFalse();
            }
        );

        test.each([
            Environment.UNKNOWN
        ])
        (
            "that given %s, isUnknown returns true",
            (arg) => {
                expect(arg.isUnknown())
                    .toBeTrue();
            }
        );

    }
);