import "jest-extended";
import { BooleanUtil } from "../../../.src/utils";

/**
 *
 * Array that holds all the values that the Boolean package considers true.
 *
 * @type {Array<any>}
 *
 */
const truthyValues = [
    true,
    "true",
    "TRUE",
    "t",
    "T",
    "yes",
    "YES",
    "y",
    "Y",
    "on",
    "ON",
    "1",
    1
];

/**
 *
 * Array that holds all the values that the Boolean package considers false.
 *
 * @type {Array<any>}
 *
 */
const falsyValues = [
    false,
    "false",
    "FALSE",
    "f",
    "F",
    "no",
    "NO",
    "n",
    "N",
    "off",
    "OFF",
    "0",
    0
];

/**
 *
 * Array that holds all the values that the Boolean package considers to be non-booleanable values.
 *
 * @type {Array<any>}
 *
 */
const nonBooleanValues = [
    null,
    undefined,
    2,
    "invalid",
    "",
    {},
    []
];

/**
 *
 * Test Suite for all the functions included in the boolean Utility sub package.
 *
 * @group unit
 * @group utils
 * @group boolean
 *
 */
describe(
    " Unit Test Suite",
    () => {

        test(
            "that TRUE is set to the boolean value of true",
            () => {
                expect(BooleanUtil.TRUE)
                    .toBeTrue();
            }
        );

        test(
            "that FALSE is set to the boolean value of false",
            () => {
                expect(BooleanUtil.FALSE)
                    .toBeFalse();
            }
        );

        test.each(truthyValues)
        (
            "that given %s, convertToBoolean returns a boolean value of true",
            (arg) => {
                expect(BooleanUtil.convertToBoolean(arg))
                    .toBeTrue();
            }
        );

        test.each(truthyValues)
        (
            "that given %s, convertToBoolean returns a boolean value of true, even if the \"defaultValue\" is set to false",
            (arg) => {
                expect(BooleanUtil.convertToBoolean(
                    arg,
                    false
                ))
                    .toBeTrue();
            }
        );

        test.each(falsyValues)
        (
            "that given %s, convertToBoolean returns a boolean value of false",
            (arg) => {
                expect(BooleanUtil.convertToBoolean(arg))
                    .toBeFalse();
            }
        );

        test.each(falsyValues)
        (
            'that given %s, convertToBoolean returns a boolean value of false, even if the "defaultValue" is set to true',
            (arg) => {
                expect(BooleanUtil.convertToBoolean(
                    arg,
                    true
                ))
                    .toBeFalse();
            }
        );

        test.each(nonBooleanValues)
        (
            'that given %s, convertToBoolean returns a value of null when no "defaultValue" is provided',
            (arg) => {
                expect(BooleanUtil.convertToBoolean(arg))
                    .toBeNull();
            }
        );

        test.each(nonBooleanValues)
        (
            "that given %s, convertToBoolean returns a boolean value of true when the \"defaultValue\" is true",
            (arg) => {
                expect(BooleanUtil.convertToBoolean(
                    arg,
                    true
                ))
                    .toBeTrue();
            }
        );

        test.each(nonBooleanValues)
        (
            "that given %s, convertToBoolean returns a boolean value of false when the \"defaultValue\" is false",
            (arg) => {
                expect(BooleanUtil.convertToBoolean(
                    arg,
                    false
                ))
                    .toBeFalse();
            }
        );

        test.each(falsyValues)
        (
            "that given %s, isTrue will return false",
            (arg) => {
                expect(BooleanUtil.isTrue(arg))
                    .toBeFalse();
            }
        );

        test.each(truthyValues)
        (
            "that given %s, isTrue will return true",
            (arg) => {
                expect(BooleanUtil.isTrue(arg))
                    .toBeTrue();
            }
        );

        test.each(truthyValues)
        (
            "that given %s, isFalse will return false",
            (arg) => {
                expect(BooleanUtil.isFalse(arg))
                    .toBeFalse();
            }
        );

        test.each(falsyValues)
        (
            "that given %s, isFalse will return true",
            (arg) => {
                expect(BooleanUtil.isFalse(arg))
                    .toBeTrue();
            }
        );

        test.each(nonBooleanValues)
        (
            "that given isBooleanable, isBooleanable will return false",
            (arg) => {
                expect(BooleanUtil.isBooleanable(arg))
                    .toBeFalse();
            }
        );

        const booleanableValues: Array<unknown> = [
            ...truthyValues,
            ...falsyValues
        ];

        test.each(booleanableValues)
        (
            "that given %s, isBooleanable will return true",
            (arg) => {
                expect(BooleanUtil.isBooleanable(arg))
                    .toBeTrue();
            }
        );


    }
);
