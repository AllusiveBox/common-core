import {
    getType,
    isNotString,
    isString
} from "./types.util";
import { EmptyString } from "../types";

/**
 *
 * Capitalizes the first character in a string. If the string is empty, returns the empty string.
 *
 * @param {string} str The string to capitalize
 * @returns {string} The string with the first character capitalized.
 * @throws {TypeError} If the provided value is not a string.
 * @since Version 0.2.0
 *
 */
export function capitalize(
    str: string
): string {
    // Validate
    if (isNotString(str)) {
        throw new TypeError(`Cannot capitalize type of ${getType(str)}; Convert to a string first`);
    }

    return str ? str.charAt(0)
        .toUpperCase() + str.substring(
        1,
        str.length
    ) : "";
}

/**
 *
 * Wraps the provided string in double quotes.
 *
 * @param {string} arg The string to wrap in quotes.
 * @returns {string} The provided string wrapped in double quotes.
 * @throws {TypeError} If the provided value is not a string.
 * @since Version 0.1.0
 *
 */
export function doubleQuotes(
    arg: string
): string {
    // Validate
    if (isNotString(arg)) {
        throw new TypeError(`Cannot wrap type of ${getType(arg)} in double quotes; Convert to a string first`);
    }

    return `"${arg}"`;
}

/**
 *
 * Indicates if the provided string is not empty.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the value is a non-empty string, otherwise false.
 * @since Version 0.3.2
 *
 */
export function isNonEmptyString(
    arg: unknown
): arg is string {
    return ((isString(arg))
        && (arg !== ""));
}

/**
 *
 * Indicates if the provided string is empty.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the string is empty, otherwise false.
 * @since Version 0.1.0
 *
 */
export function isEmptyString(
    arg: unknown
): arg is EmptyString {
    return ((isString(arg))
        && (arg === ""));
}

/**
 *
 * Wraps the provided string in single quotes.
 *
 * @param {string} arg The string to wrap in single quotes.
 * @returns {string} The provided string wrapped in single quotes.
 * @throws {TypeError} If the provided value is not a string.
 * @since Version 0.2.0
 *
 */
export function singleQuotes(
    arg: string
): string {
    // Validate
    if (isNotString(arg)) {
        throw new TypeError(`Cannot wrap type of ${getType(arg)} in single quotes; Convert to string first`);
    }

    return `'${arg}'`;
}
