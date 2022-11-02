import { getType, isNotString, isString } from "./types.util";

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
 * Indicates if the provided string is empty.
 *
 * @param {string} arg The string to check.
 * @returns {boolean} True if the string is empty, otherwise false.
 * @since Version 0.1.0
 *
 */
export function isEmptyString(
	arg: string
): arg is "" {
	return isString(arg) && arg === "";
}

/**
 *
 * Indicates if the provided string is set.
 *
 * @param {string} arg the string to check.
 * @returns {boolean} True if the string is not empty, otherwise false.
 * @since Version 0.1.0
 *
 */
export function isSetString(
	arg: string
): arg is Exclude<typeof arg, ""> {
	return isString(arg) && arg !== "";
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
