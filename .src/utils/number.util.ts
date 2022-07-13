import {
	isBoolean,
	isNotBoolean,
	isNotNullOrUndefined,
	isNotNumber,
	isNotObject,
	isNotString,
	isNullOrUndefined,
} from "./types.util";
import { NumericalString } from "../types";

/**
 *
 * Type alias for the object used by the {@link convertToTwoCharacterNumericalString} function.
 *
 * @type FormatAsTwoCharacterOptions
 *
 */
type FormatAsTwoCharacterOptions = {

	/**
	 *
	 * Indicates if an error should be thrown if a negative number is passed. Optional.
	 *
	 * @type {?boolean}
	 *
	 */
	suppressErrorOnNegative?: boolean;

	/**
	 *
	 * Indicates if the error that is thrown when given a value that is exceeds 100 should be suppressed or not.
	 * Optional.
	 *
	 * @type {?boolean}
	 *
	 */
	suppressErrorOnValueTooLarge?: boolean;

};

/**
 *
 * Variable for the number zero.
 *
 * @type {number}
 * @since Introduced in Version 0.1.0.
 *
 */
export const ZERO = 0;

/**
 *
 * Variable for the number one.
 *
 * @type {number}
 * @since Introduced in Version 0.1.0.
 *
 */
export const ONE = 1;

/**
 *
 * Variable for the number ten.
 *
 * @type {number}
 * @since Introduced in Version 0.1.0.
 *
 */
export const TEN = 10;

/**
 *
 * Variable for the number one hundred.
 *
 * @type {number}
 * @since Introduced in Version 0.1.0.
 *
 */
export const ONE_HUNDRED = 100;

/**
 *
 * Variable for the number one thousand.
 *
 * @type {number}
 * @since Introduced in Version 0.1.0.
 *
 */
export const ONE_THOUSAND = 1000;

/**
 *
 * Variable for the number ten thousand.
 *
 * @type {number}
 * @since Introduced in Version 0.1.0.
 *
 */
export const TEN_THOUSAND = 10000;

/**
 *
 * Formats the given number as a two character numerical string.
 *
 * @param {number} num The number to format.
 * @returns {NumericalString} The provided number formatted as a numerical string.
 * @throws {TypeError} An error is thrown if the provided num param is not a number.
 * @throws {Error} An error is thrown if the provided number is more than two digits.
 * @since Introduced in Version 0.1.0.
 *
 */
export function convertToTwoCharacterNumericalString(
	num: number
): NumericalString;

/**
 *
 * Formats the given number as a two character numerical string.
 *
 * @param {number}                      num     The number to format.
 * @param {FormatAsTwoCharacterOptions} options An object containing optional configurations.
 * @param {?boolean}                    [options.suppressErrorOnValueTooLarge=true]
 * @param {?boolean}                    [options.errorOnNegative
 * @returns {NumericalString} The provided number formatted as a numerical string.
 * @throws {TypeError} An error is thrown if the provided num param is not a number.
 * @throws {TypeError} An error is thrown if the provided options param is not an object.
 * @throws {TypeError} An error is thrown if the provided `options.suppressErrorOnValueTooLarge` param is not a
 * boolean.
 * @throws {TypeError} An error is thrown if the provided `options.errorOnNegative` param is not a boolean.
 * @throws {Error} An error is thrown if the provided number is more than two digits, unless the
 * `options.suppressError` flag is set.
 * @since Introduced in Version 0.1.0.
 *
 */
export function convertToTwoCharacterNumericalString(
	num: number,
	options: FormatAsTwoCharacterOptions
): NumericalString;

/**
 *
 * Formats the given number as a two character numerical string.
 *
 * @param {number}                       num       The number to format.
 * @param {?FormatAsTwoCharacterOptions} [options] An object containing optional configurations.
 * @returns {NumericalString} The provided number formatted as a numerical string.
 * @throws {TypeError} An error is thrown if the provided num param is not a number.
 * @throws {TypeError} An error is thrown if the provided options param is not an object.
 * @throws {TypeError} An error is thrown if the provided `options.suppressErrorOnValueTooLarge` param is not a
 * boolean.
 * @throws {TypeError} An error is thrown if the provided `options.errorOnNegative` param is not a boolean.
 * @throws {Error} An error is thrown if the provided number is more than two digits, unless the
 * `options.suppressError` flag is set.
 * @since Introduced in Version 0.1.0.
 *
 */
export function convertToTwoCharacterNumericalString(
	num: number,
	options?: FormatAsTwoCharacterOptions
): NumericalString {
	// Validate
	if (isNotNumber(num)) {
		throw TypeError(`Cannot convert type: ${typeof num} to numerical string; Must be of type number`);
	}

	let suppressErrorOnToBig: boolean;
	let suppressErrorOnNegative: boolean;

	// Configure default options
	if (isNullOrUndefined(options)) {
		suppressErrorOnToBig = false;
	} else if (isNotObject(options)) {
		throw TypeError(`Formatting options must be a valid object; Detected type: ${typeof options}`);
	}

	if ((isNotNullOrUndefined(options?.suppressErrorOnValueTooLarge))
		&& (isNotBoolean(options?.suppressErrorOnValueTooLarge))) {

		throw new TypeError(`Invalid type: ${typeof options?.suppressErrorOnValueTooLarge} for option `
			+ "\"suppressErrorOnValueTooLarge\"; Must be of type boolean");
	} else if (isBoolean(options?.suppressErrorOnValueTooLarge)) {
		suppressErrorOnToBig = !!options?.suppressErrorOnValueTooLarge;
	} else {
		suppressErrorOnToBig = false;
	}

	if ((isNotNullOrUndefined(options?.suppressErrorOnNegative))
		&& (isNotBoolean(options?.suppressErrorOnNegative))) {

		throw new TypeError(`Invalid type: ${typeof options?.suppressErrorOnNegative} for option `
			+ "\"suppressErrorOnNegative\"; Must be of type boolean");
	} else if (isBoolean(options?.suppressErrorOnNegative)) {
		suppressErrorOnNegative = !!options?.suppressErrorOnNegative;
	} else {
		suppressErrorOnNegative = false;
	}

	if ((!suppressErrorOnNegative)
		&& (num < ZERO)) {

		throw new Error(`Negative Number Error: Unable to convert ${num} as it is negative`);
	}

	let str: NumericalString = `${num}`;

	if ((num < ZERO)
		&& (num > -TEN)) {

		str = `-${ZERO}${(-num)}` as NumericalString;
	} else if ((num >= ZERO)
		&& (num < TEN)) {

		str = `${ZERO}${num}` as NumericalString;
	} else if (((num >= ONE_HUNDRED) || (num <= -ONE_HUNDRED))
		&& (!suppressErrorOnToBig)) {

		throw new Error(`Formatting Error: Unable to convert ${num} to two characters`);
	} else if (num >= ONE_HUNDRED) {
		console.debug(`Suppressing error for number: ${num}`);
	}

	return str;
}

/**
 *
 * Rounds a given number to the provided decimal place.
 *
 * @param {number} num           The number to round.
 * @param {number} decimalPlaces The number of decimal places to round.
 * @returns {number} The provided number rounded to the specified decimal place.
 * @throws {TypeError} An error is thrown if the provided num param is not a number.
 * @throws {TypeError} An error is thrown if the provided decimalPlaces param is not a number.
 * @since Introduced in Version 0.1.0.
 *
 */
export function roundToNth(
	num: number,
	decimalPlaces: number
): number {
	// Validate
	if ((isNotNullOrUndefined(num))
		&& (isNotString(num) && (isNaN(num)))) {

		return 0;
	} else if (num === Infinity) {
		return Infinity;
	}

	if (isNotNumber(num)) {
		throw new TypeError(`Unsupported type: ${typeof num} for parameter "num"; Must be of type number`);
	}

	if (isNotNumber(decimalPlaces)) {
		throw new TypeError(`Unsupported type: ${typeof decimalPlaces} for parameter "decimalPlaces"; Must be of type `
			+ "number");
	}

	return Number(Math.round(Number(`${num}e${decimalPlaces}`)) + `e-${decimalPlaces}`) || 0;
}

