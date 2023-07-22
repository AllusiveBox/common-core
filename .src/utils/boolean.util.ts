import {
    boolean as booleanFunc,
    isBooleanable as isBooleanableFunc
} from "boolean";
import {
    Booleanable,
    Falseable,
    Nullable,
    Trueable
} from "../types";

/**
 *
 * Variable for true.
 *
 * @type {boolean}
 * @since Version 0.2.0
 *
 */
export const TRUE: boolean = true;

/**
 *
 * Variable for false.
 *
 * @type {boolean}
 * @since Version 0.2.0
 *
 */
export const FALSE: boolean = false;

/**
 *
 * Converts the provided value to a boolean, or `null`, if no `defaultValue` is provided.
 *
 * @param {any}               arg                 The value to convert to a boolean.
 * @param {Nullable<boolean>} [defaultValue=null] The value to default to if not provided.
 * @returns {Nullable<boolean>} The provided value in boolean form.
 * @since Version 0.2.0
 *
 */
export function convertToBoolean(
    arg: any,
    defaultValue: Nullable<boolean> = null
): Nullable<boolean> {
    return isBooleanable(arg) ? booleanFunc(arg) : defaultValue == null ? null : !!defaultValue
}

/**
 *
 * Indicates if the provided value is synonymous with either the `true` or `false` boolean value.
 *
 * @param {T} arg the value to check.
 * @returns {boolean} True if the provided value is synonymous with either the `true` or `false` boolean values,
 * otherwise false.
 * @template T
 * @since Version 0.2.0
 *
 */
export function isBooleanable<T>(
    arg: T
): arg is T & Booleanable {
    return isBooleanableFunc(arg) === TRUE;
}

/**
 *
 * Indicates if the provided value is synonymous with a boolean value of `false`.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the provided value is synonymous with a boolean value of `false`, otherwise false.
 * @template T
 * @since Version 0.2.0
 *
 */
export function isFalse<T>(
    arg: T
): arg is T & Falseable {
    return booleanFunc(arg) === FALSE;
}

/**
 *
 * Indicates if the provided value is synonymous with a boolean value of `true`.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the provided value is synonymous with a boolean value of `true`, otherwise false.
 * @template T
 * @since Version 0.2.0
 *
 */
export function isTrue<T>(
    arg: T
): arg is T & Trueable {
    return booleanFunc(arg) === TRUE;
}
