import { isEmptyArray, isNotEmptyArray } from "./array.util";
import { isEmptyObject, isNotEmptyObject } from "./object.util";
import { isEmptyString, isSetString } from "./string.util";
import { DateString } from "../types";

const DATE_STRING_REGEX = new RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);

const MONTHS_WITH_30_DAYS = [4, 6, 9, 11];

/**
 *
 * Checks if a value is an array.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is an array, otherwise false.
 * @template T
 * @since Introduced in Version 0.1.0.
 *
 */
export function isArray<T>(arg: unknown): arg is Array<T> {
    return Array.isArray(arg);
}

/**
 *
 * Checks if a value is not an array.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not an array, otherwise false.
 * @template T
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotArray<T>(arg: T): arg is Exclude<typeof arg, Array<T>> {
    return !isArray(arg);
}

/**
 *
 * Checks if a value is a boolean.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is a boolean, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isBoolean(arg: unknown): arg is boolean {
    return typeof arg === "boolean";
}

/**
 *
 * Checks if a value is not a boolean.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is not a boolean, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotBoolean(arg: unknown): arg is Exclude<typeof arg, boolean> {
    return !isBoolean(arg);
}

/**
 *
 * Checks if a value is a date.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is a Date, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isDate(arg: unknown): arg is Date {
    return (isNotNull(arg)
        && (Object.prototype.toString.call(arg) === "[object Date]")
        && (!!Date.parse(<string>arg)));
}

/**
 *
 * Checks if a value is not a Date.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is not a Date, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotDate(arg: unknown): arg is Exclude<typeof arg, Date> {
    return !isDate(arg);
}

/**
 *
 * Checks if a value is a date string.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is a {@link DateString}, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isDateString(arg: unknown): arg is DateString {
    let dateAuxArray: Array<string> = new Array<string>();
    if ((isString(arg))
        && (isNotNullOrUndefined(arg.match(DATE_STRING_REGEX)))) {

        dateAuxArray = arg.split("-");
    } else {
        return false;
    }
    const year = parseInt(dateAuxArray[0]);
    const month = parseInt(dateAuxArray[1]);
    const date = parseInt(dateAuxArray[2]);

    // Validate the month and date values
    if ((month > 12)
        || (month < 0)) {

        return false;
    } else if ((date > 31)
        || (date < 0)) {

        return false;
    } else if ((month === 2)
        && (date > 29)) {

        return false;
    } else if ((MONTHS_WITH_30_DAYS.includes(month))
        && (date > 30)) {

        return false;
    } else if ((year > 2099)
        || (year < 1900)) {

        return false;
    }

    const dateAux = new Date(`${month}/${date}/${year}`);

    return isDate(dateAux);

    // return isStringCheck && isNotNullOrUndefinedRegexCheck && isDateCheck;

    // return (isString(arg)
    //     && (isNotNullOrUndefined(arg.match(DATE_STRING_REGEX)))
    //     && (isDate(arg)));
}

/**
 *
 * Checks if a value is not a date string.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is not a {@link DateString}, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotDateString(arg: unknown): arg is Exclude<typeof arg, DateString> {
    return !isDateString(arg);
}

/**
 *
 * Checks if a value is empty.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is empty, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isEmpty<T>(arg: unknown): arg is Array<T> | object | string {
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
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is not empty, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotEmpty<T>(arg: unknown): arg is Exclude<typeof arg, Array<T> | object | string> {
    if (isArray(arg)) {
        return isNotEmptyArray(arg);
    } else if (isString(arg)) {
        return isSetString(arg);
    } else if (isObject(arg)) {
        return isNotEmptyObject(arg);
    } else {
        return isNotNullOrUndefined(arg);
    }
}

/**
 *
 * Checks if a value is an Error.
 *
 * @param {any} arg The value to check.
 * @returns {boolean} True if the value is an Error, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isError(arg: any): arg is Error {
    return arg instanceof Error;
}

/**
 *
 * Checks if a value is not an Error.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is not an Error, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotError(arg: unknown): arg is Exclude<typeof arg, Error> {
    return !isError(arg);
}

/**
 *
 * Checks if a value is null.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is null, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNull(arg: unknown): arg is null {
    return arg === null;
}

/**
 *
 * Checks if a value is not null.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is not null, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotNull(arg: unknown): arg is Exclude<typeof arg, null> {
    return !isNull(arg);
}

/**
 *
 * Checks if a value is a number.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is a number, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNumber(arg: unknown): arg is number {
    return typeof arg === "number" && !isNaN(arg);
}

/**
 *
 * Checks if a value is not a number.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is not a number, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotNumber(arg: unknown): arg is Exclude<typeof arg, number> {
    return !isNumber(arg);
}

/**
 *
 * Checks if a value is an object.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is an object, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isObject(arg: unknown): arg is object {
    return isNotNull(arg)
        && isNotArray(arg)
        && isNotDate(arg)
        && typeof arg === "object";
}

/**
 *
 * Checks if a value is not an object.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is not an object, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotObject(arg: unknown): arg is Exclude<typeof arg, object> {
    return !isObject(arg);
}

/**
 *
 * Checks if a value is a string.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is a string, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isString(arg: unknown): arg is string {
    return typeof arg === "string";
}

/**
 *
 * Checks if a value is not a string.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is not a string, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotString(arg: unknown): arg is Exclude<typeof arg, string> {
    return !isString(arg);
}

/**
 *
 * Checks if a value is undefined.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is undefined, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isUndefined(arg: unknown): arg is undefined {
    return typeof arg === "undefined";
}

/**
 *
 * Checks if the value is not undefined.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is not undefined, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotUndefined(arg: unknown): arg is Exclude<typeof arg, undefined> {
    return !isUndefined(arg);
}

/**
 *
 * Checks if the value is either null or undefined.
 *
 * @param {unknown} arg
 * @returns {boolean} True if the value is either null or undefined, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNullOrUndefined(arg: unknown): arg is null | undefined {
    return isNull(arg) || isUndefined(arg);
}

/**
 *
 * Checks if the value is neither null nor undefined.
 *
 * @param {unknown} arg
 * @returns {boolean} True if the value is neither null nor undefined, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotNullOrUndefined(arg: unknown): arg is Exclude<typeof arg, null | undefined> {
    return isNotNull(arg) && isNotUndefined(arg);
}
