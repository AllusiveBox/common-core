import "jest-extended";
import { StringUtil } from "../../../.src/utils";
import { getType } from "../../../.src/utils/types.util";

/**
 *
 * Test Suite for all the functions included in the String Util sub package.
 *
 * @group unit
 * @group utils
 * @group string
 *
 */
describe(
    "StringUtil Unit Test Suite",
    () => {

        const nonStringValues = [
            null,
            undefined,
            true,
            1,
            {},
            []
        ];

        const stringValues = [
            "hello",
            "world",
            "foo",
            "1",
            "true"
        ];

        test.each(nonStringValues)
        (
            "that given %s, capitalize throws a TypeError",
            (arg) => {
                expect(() => {
                    // @ts-ignore
                    StringUtil.capitalize(arg);
                })
                    .toThrowError(TypeError);
            }
        );

        test.each([
            { arg: "hello", expectedResult: "Hello" },
            { arg: "world", expectedResult: "World" },
            { arg: "foo", expectedResult: "Foo" },
            { arg: "1", expectedResult: "1" },
            { arg: "true", expectedResult: "True" },
            { arg: "", expectedResult: "" }
        ])
        (
            'that given $arg, capitalize returns "$expectedResult"',
            ({ arg, expectedResult }) => {
                expect(StringUtil.capitalize(arg))
                    .toBe(expectedResult);
            }
        );

        test.each(nonStringValues)
        (
            "that given %s, doubleQuotes throws a TypeError",
            (arg) => {
                expect(() => {
                    // @ts-ignore
                    StringUtil.doubleQuotes(arg);
                })
                    .toThrowError(`Cannot wrap type of ${getType(arg)} in double quotes; Convert to a string first`);
            }
        );

        test.each(stringValues)
        (
            'that given %s, doubleQuotes returns "%s"',
            (arg) => {
                expect(StringUtil.doubleQuotes(arg))
                    .toBe(`"${arg}"`);
            }
        );

        test.each(nonStringValues)
        (
            "that given %s, isNonEmptyString returns false",
            (arg) => {
                expect(StringUtil.isNonEmptyString(arg))
                    .toBeFalse();
            }
        );

        test(
            "that given an empty string, isNonEmptyString returns false",
            () => {
                expect(StringUtil.isNonEmptyString(""))
                    .toBeFalse();
            }
        );

        test.each(stringValues)
        (
            "that given %s, isNonEmptyString returns true",
            (arg) => {
                expect(StringUtil.isNonEmptyString(arg))
                    .toBeTrue();
            }
        );

        test.each(nonStringValues)
        (
            "that given %s, isEmptyString returns false",
            (arg) => {
                // @ts-ignore
                expect(StringUtil.isEmptyString(arg))
                    .toBeFalse();
            }
        );

        test.each(stringValues)
        (
            "that given %s, isEmptyString returns false",
            (arg) => {
                expect(StringUtil.isEmptyString(arg))
                    .toBeFalse();
            }
        );

        test(
            "that given an empty string, isEmptyString returns true",
            () => {
                expect(StringUtil.isEmptyString(""))
                    .toBeTrue();
            }
        );

        test.each(nonStringValues)
        (
            "that given %s, singleQuotes throws a TypeError",
            (arg) => {
                expect(() => {
                    // @ts-ignore
                    StringUtil.singleQuotes(arg);
                })
                    .toThrowError(TypeError);
            }
        );

        test.each(stringValues)
        (
            "that given %s, singleQuotes returns '%s'",
            (arg) => {
                expect(StringUtil.singleQuotes(arg))
                    .toBe(`'${arg}'`);
            }
        );

    }
);
