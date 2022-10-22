import "jest-extended";
import {
    Environment,
    TypesUtil
} from "../../../.src";

/**
 *
 * Test Suite for all the functions included in the TypesUtil sub package.
 *
 * @group unit
 * @group utils
 * @group types
 *
 */
describe("TypesUtil Unit Test Suite", () => {

    const nullOrUndefinedValues = [
        null,
        undefined
    ];

    const nonArrayValues = [
        ...nullOrUndefinedValues,
        1,
        true,
        "hello world",
        {}
    ];

    const arrayValues = [
        ["1", 1, true, null],
        ["hello", "my", "name", "is", "John"],
        [true, true, false, true],
        [null, null, null, null]
    ];

    test.each(nonArrayValues)
    ("that given %s, isArray returns false", (arg) => {
        expect(TypesUtil.isArray(arg))
            .toBeFalse();
    });

    test.each(arrayValues)
    ("that given %s, isArray returns true", (...args) => {
        expect(TypesUtil.isArray(args))
            .toBeTrue();
    });

    test("that given an empty array, isArray returns true", () => {
        expect(TypesUtil.isArray([]))
            .toBeTrue();
    });

    test.each(arrayValues)
    ("that given %s, isNotArray returns false", (...args) => {
        expect(TypesUtil.isNotArray(args))
            .toBeFalse();
    });

    test("that given an empty array, isNotArray returns false", () => {
        expect(TypesUtil.isNotArray([]))
            .toBeFalse();
    });

    test.each(nonArrayValues)
    ("that given %s, isNotArray returns true", (arg) => {
        expect(TypesUtil.isNotArray(arg))
            .toBeTrue();
    });

    const nonBooleanValues = [
        ...nullOrUndefinedValues,
        "Hello World",
        [],
        {},
        100,
        Infinity
    ];

    const booleanValues = [
        true,
        false
    ];

    test.each(nonBooleanValues)
    ("that given %s, isBoolean returns false", (arg) => {
        expect(TypesUtil.isBoolean(arg))
            .toBeFalse();
    });

    test.each(booleanValues)
    ("that given %s, isBoolean returns true", (arg) => {
        expect(TypesUtil.isBoolean(arg))
            .toBeTrue();
    });

    test.each(booleanValues)
    ("that given %s, isNotBoolean returns false", (arg) => {
        expect(TypesUtil.isNotBoolean(arg))
            .toBeFalse();
    });

    test.each(nonBooleanValues)
    ("that given %s, isNotBoolean returns true", (arg) => {
        expect(TypesUtil.isNotBoolean(arg))
            .toBeTrue();
    });

    test.each([
        ...nullOrUndefinedValues,
        ...arrayValues,
        ...booleanValues,
        new Date("Invalid Date")
    ])
    ("that given %s, isDate returns false", (arg) => {
        expect(TypesUtil.isDate(arg))
            .toBeFalse();
    });

    test.each([
        new Date(),
        new Date("12/12/12")
    ])
    ("that given %s, isDate returns true", (arg) => {
        expect(TypesUtil.isDate(arg))
            .toBeTrue();
    });

    test.each([
        new Date(),
        new Date("12/12/12")
    ])
    ("that given %s, isNotDate returns false", (arg) => {
        expect(TypesUtil.isNotDate(arg))
            .toBeFalse();
    });

    test.each([
        ...nullOrUndefinedValues,
        ...arrayValues,
        ...booleanValues,
        new Date("Invalid Date")
    ])
    ("that given %s, isNotDate returns true", (arg) => {
        expect(TypesUtil.isNotDate(arg))
            .toBeTrue();
    });

    // const invalidDateStrings = [
    //     ...nullOrUndefinedValues,
    //     "Hello world",
    //     "12312022",
    //     "20221231",
    //     "20223112",
    //     "2022-02-31",
    //     "1800-01-01",
    //     "0000-00-00",
    //     true,
    //     false,
    //     {},
    //     []
    // ];

    // const validDateStrings = [
    //     "2099-12-31",
    //     "1900-01-01",
    //     "2022-12-31"
    // ];

    // test.each(invalidDateStrings)
    // ("that given %s, isDateString returns false", (arg) => {
    //     expect(TypesUtil.isDateString(arg)).toBeFalse();
    // });
    //
    // test.each(validDateStrings)
    // ("that given %s, isDateString returns true", (arg) => {
    //     expect(TypesUtil.isDateString(arg)).toBeTrue();
    // });
    //
    // test.each(validDateStrings)
    // ("that given %s, isNotDateString returns false", (arg) => {
    //     expect(TypesUtil.isNotDateString(arg)).toBeFalse();
    // });
    //
    // test.each(invalidDateStrings)
    // ("that given %s, isNotDateString returns true", (arg) => {
    //     expect(TypesUtil.isNotDateString(arg)).toBeTrue();
    // });

    const nonEmptyValues = [
        "Hello world",
        true,
        Infinity,
        ["foo", "bar"],
        { foo: "bar "}
    ];

    // const emptyValues = [
    //     ...nullOrUndefinedValues,
    //     [],
    //     "",
    //     {},
    // ];

    // test.each(nonEmptyValues)
    // ("that given %s, isEmpty returns false", (arg) => {
    //     expect(TypesUtil.isEmpty(arg)).toBeFalse();
    // });
    //
    // test.each(emptyValues)
    // ("that given %s, isEmpty returns true", (arg) => {
    //     expect(TypesUtil.isEmpty(arg)).toBeTrue();
    // });
    //
    // test.each(emptyValues)
    // ("that given %s, isNotEmpty returns false", (arg) => {
    //     expect(TypesUtil.isNotEmpty(arg)).toBeFalse();
    // });
    //
    // test.each(nonEmptyValues)
    // ("that given %s, isNotEmpty returns true", (arg) => {
    //     expect(TypesUtil.isNotEmpty(arg)).toBeTrue();
    // });

    const nonErrorValues = [
        ...nullOrUndefinedValues,
        ...arrayValues,
        ...booleanValues,
        ...nonEmptyValues,
        { message: "Not", stack: "Error" }
    ];

    const errorValues = [
        new Error(),
        new TypeError(),
        new Error("Error")
    ];

    test.each(nonErrorValues)
    ("that given %s, isError returns false", (arg) => {
        expect(TypesUtil.isError(arg))
            .toBeFalse();
    });

    test.each(errorValues)
    ("that given %s, isError returns true", (arg) => {
        expect(TypesUtil.isError(arg))
            .toBeTrue();
    });

    test.each(errorValues)
    ("that given %s, isNotError returns false", (arg) => {
        expect(TypesUtil.isNotError(arg))
            .toBeFalse();
    });

    test.each(nonErrorValues)
    ("that given %s, isNotError returns true", (arg) => {
        expect(TypesUtil.isNotError(arg))
            .toBeTrue();
    });

    const nonEXnumValues = [
        1,
        "hello",
        true,
        [],
        {}
    ];

    test.each(nonEXnumValues)
    ("that given %s, isEXnum returns false", (arg) => {
        expect(TypesUtil.isEXnum(arg))
            .toBeFalse();
    });

    test.each(Environment["SUPPORTED_EXNUMS"])
    ("that given %s, isEXnum returns true", (arg) => {
       expect(TypesUtil.isEXnum(arg))
           .toBeTrue();
    });

    test.each(nonEXnumValues)
    ("that given %s, isNotEXnum returns true", (arg) => {
        expect(TypesUtil.isNotEXnum(arg))
            .toBeTrue();
    });

    test.each(Environment["SUPPORTED_EXNUMS"])
    ("that given %s, isNotEXnum returns false", (arg) => {
        expect(TypesUtil.isNotEXnum(arg))
            .toBeFalse();
    });

    const nonNullValues = [
        ...arrayValues,
        ...booleanValues,
        ...nonEmptyValues
    ];

    test.each([...nonNullValues, undefined])
    ("that given %s, isNull returns false", (arg) => {
        expect(TypesUtil.isNull(arg))
            .toBeFalse();
    });

    test("that given null, isNull returns true", () => {
        expect(TypesUtil.isNull(null))
            .toBeTrue();
    });

    test("that given null, isNotNull returns false", () => {
        expect(TypesUtil.isNotNull(null))
            .toBeFalse();
    });

    test.each([...nonNullValues, undefined])
    ("that given %s, isNotNull returns true", (arg) => {
        expect(TypesUtil.isNotNull(arg))
            .toBeTrue();
    });

    const nonNumberValues = [
        ...nullOrUndefinedValues,
        "Hello world",
        true,
        [],
        {}
    ];

    const numberValues = [
        0,
        1,
        Infinity,
        -100
    ];

    test.each(nonNumberValues)
    ("that given %s, isNumber returns false", (arg) => {
        expect(TypesUtil.isNumber(arg))
            .toBeFalse();
    });

    test.each(numberValues)
    ("that given %s, isNumber returns true", (arg) => {
        expect(TypesUtil.isNumber(arg))
            .toBeTrue();
    });

    test.each(numberValues)
    ("that given %s, isNotNumber returns false", (arg) => {
        expect(TypesUtil.isNotNumber(arg))
            .toBeFalse();
    });

    test.each(nonNumberValues)
    ("that given %s, isNotNumber returns true", (arg) => {
        expect(TypesUtil.isNotNumber(arg))
            .toBeTrue();
    });

    const nonObjectValues = [
        ...nullOrUndefinedValues,
        [],
        true,
        1,
        Infinity,
        "",
        "Hello world"
    ];

    const objectValues = [
        {},
        { foo: "Bar" },
        { foo: { bar: "FooBar" } }
    ];

    test.each(nonObjectValues)
    ("that given %s, isObject returns false", (arg) => {
        expect(TypesUtil.isObject(arg))
            .toBeFalse();
    });

    test.each(objectValues)
    ("that given %s, isObject returns true", (arg) => {
        expect(TypesUtil.isObject(arg))
            .toBeTrue();
    });

    test.each(objectValues)
    ("that given %s, isNotObject returns false", (arg) => {
        expect(TypesUtil.isNotObject(arg))
            .toBeFalse();
    });

    test.each(nonObjectValues)
    ("that given %s, isNotObject returns true", (arg) => {
        expect(TypesUtil.isNotObject(arg))
            .toBeTrue();
    });

    const nonStringValues = [
        ...nullOrUndefinedValues,
        true,
        1,
        Infinity,
        {},
        []
    ];

    const stringValues = [
        "Hello World",
        (1).toString(),
        true.toString(),
        Infinity.toString(),
        ""
    ];

    test.each(nonStringValues)
    ("that given %s, isString returns false", (arg) => {
        expect(TypesUtil.isString(arg))
            .toBeFalse();
    });

    test.each(stringValues)
    ("that given %s, isString returns true", (arg) => {
        expect(TypesUtil.isString(arg))
            .toBeTrue();
    });

    test.each(stringValues)
    ("that given %s, isNotString returns false", (arg) => {
        expect(TypesUtil.isNotString(arg))
            .toBeFalse();
    });

    test.each(nonStringValues)
    ("that given %s, isNotString returns true", (arg) => {
        expect(TypesUtil.isNotString(arg))
            .toBeTrue();
    });

    const nonUndefinedValues = [
        ...arrayValues,
        ...booleanValues,
        ...stringValues,
        ...objectValues
    ];

    test.each([...nonUndefinedValues, null])
    ("that given %s, isUndefined returns false", (arg) => {
        expect(TypesUtil.isUndefined(arg))
            .toBeFalse();
    });

    test("that given undefined, isUndefined returns true", () => {
        expect(TypesUtil.isUndefined(undefined))
            .toBeTrue();
    });

    test("that given undefined, isNotUndefined returns false", () => {
        expect(TypesUtil.isNotUndefined(undefined))
            .toBeFalse();
    });

    test.each([...nonUndefinedValues, null])
    ("that given %s, isNotUndefined returns true", (arg) => {
        expect(TypesUtil.isNotUndefined(arg))
            .toBeTrue();
    });

    const nonNullOrUndefinedValues = [
        ...nonNullValues,
        ...nonUndefinedValues
    ];

    test.each(nonNullOrUndefinedValues)
    ("that given %s, isNullOrUndefined returns false", (arg) => {
        expect(TypesUtil.isNullOrUndefined(arg))
            .toBeFalse();
    });

    test.each(nullOrUndefinedValues)
    ("that given %s, isNullOrUndefined returns true", (arg) => {
        expect(TypesUtil.isNullOrUndefined(arg))
            .toBeTrue();
    });

    test.each(nullOrUndefinedValues)
    ("that given %s, isNotNullOrUndefined returns false", (arg) => {
        expect(TypesUtil.isNotNullOrUndefined(arg))
            .toBeFalse();
    });

    test.each(nonNullOrUndefinedValues)
    ("that given %s, isNotNullOrUndefined returns true", (arg) => {
        expect(TypesUtil.isNotNullOrUndefined(arg))
            .toBeTrue();
    });

    test.each([
        { arg: null, result: "null" },
        { arg: undefined, result: "undefined" },
        { arg: [], result: "Array" },
        { arg: true, result: "boolean" },
        { arg: new Date(), result: "Date" },
        // { arg: "2020-12-31", result: "DateString" },
        { arg: new Error(), result: "Error" },
        { arg: 1, result: "number" },
        { arg: {}, result: "object" },
        { arg: "1", result: "string" },
        { arg: Symbol, result: "unknown" },
        { arg: Environment.TEST, result: "environment" }
    ])
    ("that given $arg, getType returns $result", ({ arg, result }) => {
        expect(TypesUtil.getType(arg))
            .toBe(result);
    });

});
