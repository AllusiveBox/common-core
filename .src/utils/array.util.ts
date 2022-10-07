import { isArray } from "./types.util";

/**
 *
 * Helper method that indicates if the provided array is an empty array.
 *
 * @param {Array<T>} arg The array to check.
 * @returns {boolean} True if the array is empty, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isEmptyArray<T>(arg: Array<T>): arg is Exclude<typeof arg, Array<T>> {
    return isArray(arg) && arg.length === 0;
}

/**
 *
 * Helper method that indicates if the provided array is not empty.
 *
 * @param {Array<T>} arg The array to check.
 * @returns {boolean} True if the array is not empty, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotEmptyArray<T>(arg: Array<T>): arg is Array<T> {
    return !isEmptyArray(arg);
}
