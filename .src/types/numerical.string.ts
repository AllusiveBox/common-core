/**
 *
 * Utility type that is used to indicate a number that is formatted as a string, or a number that could be converted
 * into a string.
 *
 * @type NumericalString
 * @example "1"
 * @example 1
 * @since Version 0.3.1
 *
 */
export type NumericalString = `${number}` | number;