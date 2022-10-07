import "jest-extended";
import { Environment } from "../../.src";

/**
 *
 * Test Suite for the Environment class.
 *
 * @group unit
 * @group models
 * @group entity
 * @group environment
 *
 */
describe("Environment Unit Test Suite", () => {

    test("that static toString returns Environment", () => {
        expect(`${Environment}`).toBe("Environment");
    });

    test.each([
        { arg: 1, error: "Cannot get environment with type: Number; Must be of type string" },
        { arg: null, error: "Cannot get environment with type: Null; Must be of type string" },
        { arg: undefined, error: "Cannot get environment with type: Undefined; Must be of type string" }
    ])
    ("that given $arg, getEnvironment throws \"$error\"", ({ arg, error }) => {
        expect(() => {
            // @ts-ignore
            Environment.getEnvironment(arg)
        }).toThrowError(error);
    });

    test.each([
        { arg: "Development", result: Environment.DEVELOPMENT },
        { arg: "development", result: Environment.DEVELOPMENT },
        { arg: "dev", result: Environment.UNKNOWN },
        { arg: "PRODUCTION", result: Environment.PRODUCTION },
        { arg: "ProdUCtion", result: Environment.PRODUCTION },
        { arg: "TEST", result: Environment.TEST },
        { arg: "test", result: Environment.TEST },
        { arg: "", result: Environment.UNKNOWN }
    ])
    ("that given $arg, getEnvironment should return $result", ({ arg, result }) => {
        expect(Environment.getEnvironment(arg)).toBe(result);
    });

    test.each([
        Environment.PRODUCTION,
        Environment.TEST,
        Environment.UNKNOWN
    ])
    ("that given %s, isDev should return false", (arg) => {
        expect(arg.isDev()).toBeFalse();
    });

    test("that given Environment:DEVELOPMENT, isDeb should return true", () => {
        expect(Environment.DEVELOPMENT.isDev()).toBeTrue();
    });

    test.each([
        Environment.DEVELOPMENT,
        Environment.TEST,
        Environment.UNKNOWN
    ])
    ("that given %s, isProd should return false", (arg) => {
        expect(arg.isProd()).toBeFalse();
    });

    test("that given Environment:PRODUCTION, isProd should return true", () => {
        expect(Environment.PRODUCTION.isProd()).toBeTrue();
    });

    test.each([
        Environment.DEVELOPMENT,
        Environment.PRODUCTION,
        Environment.UNKNOWN
    ])
    ("that given %s, isTest should return false", (arg) => {
        expect(arg.isTest()).toBeFalse();
    });

    test("that given Environment:TEST, isTest should return true", () => {
        expect(Environment.TEST.isTest()).toBeTrue();
    });

    test.each([
        Environment.DEVELOPMENT,
        Environment.PRODUCTION,
        Environment.TEST
    ])
    ("that given %s, isUnknown should return false", (arg) => {
        expect(arg.isUnknown()).toBeFalse();
    });

    test("that given Environment:UNKNOWN, isUnknown should return true", () => {
        expect(Environment.UNKNOWN.isUnknown()).toBeTrue();
    });

    test.each([
        null,
        undefined,
        Environment.UNKNOWN
    ])
    ("that given %s, isSupported returns false", (arg) => {
        // @ts-ignore
        expect(Environment.isSupported(arg)).toBeFalse();
    });

    test.each([
        Environment.DEVELOPMENT,
        Environment.PRODUCTION,
        Environment.TEST
    ])
    ("that given %s, isSupported returns true", (arg) => {
        expect(Environment.isSupported(arg)).toBeTrue();
    });


});
