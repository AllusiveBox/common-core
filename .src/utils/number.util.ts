import {
    getType,
    isNotNullOrUndefined,
    isNotNumber,
    isNotString
} from "./types.util";

/**
 *
 * Variable for the number zero.
 *
 * @type {number}
 * @since Version 0.1.0
 *
 */
export const ZERO: number = 0;

/**
 *
 * Variable for the number one.
 *
 * @type {number}
 * @since Version 0.1.0
 *
 */
export const ONE: number = 1;

/**
 *
 * Variable for the number ten.
 *
 * @type {number}
 * @since Version 0.1.0
 *
 */
export const TEN: number = 10;

/**
 *
 * Variable for the number one hundred.
 *
 * @type {number}
 * @since Version 0.1.0
 *
 */
export const ONE_HUNDRED: number = 100;

/**
 *
 * Variable for the number one thousand.
 *
 * @type {number}
 * @since Version 0.1.0
 *
 */
export const ONE_THOUSAND: number = 1000;

/**
 *
 * Variable for the number ten thousand.
 *
 * @type {number}
 * @since Version 0.1.0
 *
 */
export const TEN_THOUSAND: number = 10000;

/**
 *
 * Formats the given number into a two character string.
 *
 * @param {number} num The number to format. Should be greater than `0`, but less than `100`.
 * @returns {string} the provided number formatted as a two character string.
 * @throws {TypeError} If the provided value is not a number.
 * @throws {Error} If the provided value is less than `0`.
 * @throws {Error} If the provided value is greater than `100`.
 * @since Version 0.1.0
 *
 */
export function convertToTwoCharacterString(
    num: number
): string {
    // Validate
    if (isNotNumber(num)) {
        throw new TypeError(`Cannot convert type: ${getType(num)} to a string; Must be of type number`);
    } else if (num < ZERO) {
        throw new Error("Cannot convert a negative number to a string; Must be a positive number");
    } else if (num >= ONE_HUNDRED) {
        throw new Error("Cannot convert a number larger than 100 to a string; Must be a number between 0 and 99");
    }

    return num < TEN ? `${ZERO}${num}` : `${num}`;
}

/**
 *
 * Rounds a number to the specified number of decimal places.
 *
 * @param {number} num           The number to round.
 * @param {number} decimalPlaces The number of decimal places to round to.
 * @returns {number} The original number rounded to the specified number of decimal places.
 * @throws {TypeError} If the provided `num` parameter is not a number.
 * @throws {TypeError} If the provided `decimalPlaces` parameter is not a number.
 * @since Version 0.1.0
 *
 */
export function roundToNth(
    num: number,
    decimalPlaces: number
): number {
    // Edge cases before validation to ensure they work correctly
    if ((isNotNullOrUndefined(num))
        && (isNotString(num) && (isNaN(num)))) {

        return 0;
    } else if (num === Infinity) {
        return Infinity;
    }

    // Validate
    if (isNotNumber(num)) {
        throw new TypeError(`Unsupported type: ${getType(num)} for parameter "num"; Must be a number`);
    }

    if (isNotNumber(decimalPlaces)) {
        throw new TypeError(`Unsupported type: ${getType(decimalPlaces)} for parameter "decimalPlaces"; `
            + "Must be a number");
    }

    return Number(Math.round(Number(`${num}e${decimalPlaces}`)) + `e-${decimalPlaces}`) || 0;
}

/**
 *
 * Rounds a given number to two decimal places.
 *
 * @param {number} num The number to round.
 * @returns {number} The provided number rounded to the nearest two decimal places.
 * @throws {TypeError} If the provided `num` parameter is not a number.
 * @since Version 0.2.0
 *
 */
export function roundToTwo(
    num: number
): number {
    return roundToNth(
        num,
        2
    );
}
