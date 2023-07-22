import {
    EmptyArray,
    EmptyObject,
    EmptyString,
    NumericalString
} from "../types";
import { isEmptyArray, isNonEmptyArray } from "./array.util";
import { isEmptyObject, isNonEmptyObject } from "./object.util";
import { isEmptyString, isNonEmptyString } from "./string.util";
import { EXnum } from "../../.src/exnums/EXnum";

/**
 *
 * Utility method that returns the type of the provided argument. More descriptive compared to the JavaScript
 * `typeof` operation.
 *
 * @param {unknown} arg The argument to get the type of.
 * @returns {string} A string representing the type of object.
 * @since Version 0.1.0
 *
 */
export function getType(
    arg: unknown
): string {

    if (isArray(arg)) {
        return "Array";
    }

    if (isEXnum(arg)) {
        return arg.type || "EXnum";
    }

    if (isBoolean(arg)) {
        return "boolean";
    }

    if (isDate(arg)) {
        return "Date";
    }

    if (isError(arg)) {
        return "Error";
    }

    if (isNull(arg)) {
        return "null";
    }

    if (isNumber(arg)) {
        return "number";
    }

    if (isNumericalString(arg)) {
        return "NumericalString";
    }

    if (isObject(arg)) {
        return "object";
    }

    if (isString(arg)) {
        return "string";
    }

    if (isUndefined(arg)) {
        return "undefined";
    }

    return `unknown (${arg})`;
}

/**
 *
 * Checks if a value is an array.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is an array, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isArray<T>(
    arg: T
): arg is T & Array<T> {
    return Array.isArray(arg);
}

/**
 *
 * Checks if a value is not an array.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not an array, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotArray<T>(
    arg: T
): arg is Exclude<T, Array<T>> {
    return !isArray(arg);
}

/**
 *
 * Checks if a value is a boolean.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is a boolean, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isBoolean<T>(
    arg: T
): arg is T & boolean {
    return typeof arg === "boolean";
}

/**
 *
 * Checks if a value is not a boolean.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not a boolean, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotBoolean<T>(
    arg: T
): arg is Exclude<T, boolean> {
    return !isBoolean(arg);
}

/**
 *
 * Checks if a value is a date.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is a Date, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isDate<T>(
    arg: T
): arg is T & Date {
    return (isNotNull(arg)
        && (Object.prototype.toString.call(arg) === "[object Date]")
        && (!!Date.parse(arg as unknown as string)));
}

/**
 *
 * Checks if a value is not a Date.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not a Date, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotDate<T>(
    arg: T
): arg is Exclude<T, Date> {
    return !isDate(arg);
}

/**
 *
 * Checks if a value is empty.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is empty, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isEmpty<T>(
    arg: T
): arg is T & (
    T extends Array<T>
        ? EmptyArray
        : T extends object
            ? EmptyObject
            : EmptyString
    ) {
	if (isArray(arg)) {
		return isEmptyArray(arg);
	} else if (isString(arg)) {
		return isEmptyString(arg);
	} else if (isObject(arg)) {
		return isEmptyObject(arg);
	} else {
		return isNullOrUndefined(arg);
	}
}

/**
 *
 * Checks if a value is not empty.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not empty, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotEmpty<T>(
    arg: T
): arg is T & (
    T extends Array<T>
        ? Array<T>
        : T extends object
            ? T
            : string
    ) {
    if (isArray(arg)) {
        return isNonEmptyArray(arg);
    } else if (isString(arg)) {
        return isNonEmptyString(arg);
    } else if (isObject(arg)) {
        return isNonEmptyObject(arg);
    } else {
        return isNotNullOrUndefined(arg);
    }
}

/**
 *
 * Checks if a value is an Error.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is an Error, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isError<T>(
    arg: T
): arg is T & Error {
    return arg instanceof Error;
}

/**
 *
 * Checks if a value is not an Error.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not an Error, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotError<T>(
    arg: T
): arg is Exclude<T, Error> {
    return !isError(arg);
}

/**
 *
 * Checks if a value is an EXnum.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is an EXnum, otherwise false.
 * @template T
 * @since Version 0.2.0
 *
 */
export function isEXnum<T>(
    arg: T
): arg is T & EXnum {
    return arg instanceof EXnum;
}

/**
 *
 * Checks if a value is not an EXnum.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not an EXnum, otherwise false.
 * @template T
 * @since Version 0.2.0
 *
 */
export function isNotEXnum<T>(
    arg: T
): arg is Exclude<T, EXnum> {
    return !isEXnum(arg);
}

/**
 *
 * Checks if a value is null.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is null, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNull<T>(
    arg: T
): arg is T & null {
    return arg === null;
}

/**
 *
 * Checks if a value is not null.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not null, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotNull<T>(
    arg: T
): arg is Exclude<T, null> {
    return !isNull(arg);
}

/**
 *
 * Checks if a value is a number.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is a number, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNumber<T>(
    arg: T
): arg is T & number {
    return typeof arg === "number" && !isNaN(arg);
}

/**
 *
 * Checks if a value is not a number.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not a number, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotNumber<T>(
    arg: T
): arg is Exclude<T, number> {
    return !isNumber(arg);
}

/**
 *
 * Checks if a value is a numerical string.
 * <br />
 * <b>Note</b>: Just because a value passes this check does not mean the value is necessarily a string, just that it
 * is either a number, or a string that can be parsed into a number.
 *
 * @param {T} arg The value to check.
 * @returns {boolean}
 * @template T
 * @since Version 0.3.1
 *
 */
export function isNumericalString<T>(
    arg: T
): arg is T & NumericalString {
    return ((isString(arg)) && (!isNaN(parseInt(arg)))
        || (isNumber(arg)));
}

/**
 *
 * Checks if a value is not a numerical string.
 *
 * @param {T} arg The value to check.
 * @returns {boolean}
 * @template T
 * @since Version 0.3.1
 *
 */
export function isNotNumericalString<T>(
    arg: T
): arg is Exclude<T, NumericalString> {
    return !isNumericalString(arg);
}

/**
 *
 * Checks if a value is an object.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is an object, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isObject<T>(
    arg: T
): arg is T & object {
    return isNotNull(arg)
        && isNotArray(arg)
        && isNotDate(arg)
        && typeof arg === "object";
}

/**
 *
 * Checks if a value is not an object.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not an object, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotObject<T>(
    arg: T
): arg is Exclude<T, object> {
    return !isObject(arg);
}

/**
 *
 * Checks if a value is a string.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is a string, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isString<T>(
    arg: T
): arg is T & string {
    return typeof arg === "string";
}

/**
 *
 * Checks if a value is not a string.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not a string, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotString<T>(
    arg: T
): arg is Exclude<T, string> {
    return !isString(arg);
}

/**
 *
 * Checks if a value is undefined.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is undefined, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isUndefined<T>(
    arg: T
): arg is T & undefined {
    return typeof arg === "undefined";
}

/**
 *
 * Checks if the value is not undefined.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not undefined, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotUndefined<T>(
    arg: T
): arg is Exclude<T, undefined> {
    return !isUndefined(arg);
}

/**
 *
 * Checks if the value is either null or undefined.
 *
 * @param {T} arg
 * @returns {boolean} True if the value is either null or undefined, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNullOrUndefined<T>(
    arg: T
): arg is T & (null | undefined) {
    return isNull(arg) || isUndefined(arg);
}

/**
 *
 * Checks if the value is neither null nor undefined.
 *
 * @param {T} arg
 * @returns {boolean} True if the value is neither null nor undefined, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotNullOrUndefined<T>(
    arg: T
): arg is Exclude<T, null | undefined> {
    return isNotNull(arg) && isNotUndefined(arg);
}
