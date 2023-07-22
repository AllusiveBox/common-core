import {
    getType,
    isArray,
    isNotArray,
    isNotNumber,
    isNotString
} from "./types.util";
import {
    EmptyArray,
    NestedArray
} from "../types";

/**
 *
 * Takes an array and splits it into chunks, storing the chunks inside a nested array.
 *
 * @param {Array<T>} items The array of items to chunk.
 * @returns {NestedArray<T>} The original array, converted into a nested array.
 * @throws {TypeError} If the provided `items` parameter is not an array.
 * @template T
 *
 */
export function chunk<T>(
    items: Array<T>
): NestedArray<T>;

/**
 *
 * Takes an array and splits it into chunks, storing the chunks inside a nested array.
 *
 * @param {Array<T>} items     The array of items to chunk.
 * @param {number}   chunkSize The size of each sub array.
 * @returns {NestedArray<T>} The original array, converted into a nested array with sub elements of the specified
 * `chunkSize`.
 * @throws {TypeError} If the provided `items` parameter is not an array.
 * @throws {TypeError} If the provided `chunkSize` is not a number.
 * @throws {Error} If the provided `chunkSize` is less than 1.
 * @template T
 * @since Version 0.2.0
 *
 */
export function chunk<T>(
    items: Array<T>,
    chunkSize: number
): NestedArray<T>

/**
 *
 * Takes an array and splits it into chunks, storing the chunks inside a nested array.
 *
 * @param {Array<T>} items          The array of items to chunk.
 * @param {number}   [chunkSize=10] The size of each sub array.
 * @returns {NestedArray<T>} The original array, converted into a nested array with sub elements of the specified
 * `chunkSize`.
 * @throws {TypeError} If the provided `items` parameter is not an array.
 * @throws {TypeError} If the provided `chunkSize` is not a number.
 * @throws {Error} If the provided `chunkSize` is less than 1.
 * @template T
 * @since Version 0.2.0
 *
 */
export function chunk<T>(
    items: Array<T>,
    chunkSize: number = 10
): NestedArray<T> {
    // Validate
    if (isNotArray(items)) {
        throw new TypeError(`Unable to chunk type: ${getType(items)}; Must be an Array`);
    } else if (isNotNumber(chunkSize)) {
        throw new TypeError(`Unable to determine chunking size with type ${getType(chunkSize)}`);
    } else if (chunkSize < 1) {
        throw new Error("Unable to chunk an array smaller than 1 element each");
    }

    const chunkedArray: NestedArray<T> = new Array<T>();
    let index: number = 0;

    // While the current index is less than the array length
    while (index < items?.length) {
        chunkedArray.push(items.slice(
            index,
            chunkSize + index
        ));
        index += chunkSize;
    }

    return chunkedArray;
}

/**
 *
 * Combines two arrays into a singular array.
 *
 * @param {Array<T>} array1 The first array to combine.
 * @param {Array<U>} array2 The second array to combine.
 * @returns {Array<T | U>} A new array combining the two provided arrays.
 * @template T
 * @template U
 * @since Version 0.2.0
 *
 */
export function combine<T, U = T>(
    array1: Array<T>,
    array2: Array<U>
): Array<T | U> {
    const combinedArray: Array<T | U> = new Array<T | U>();

    if (isNonEmptyArray(array1)) {
        combinedArray.push(...array1);
    }

    if (isNonEmptyArray(array2)) {
        combinedArray.push(...array2);
    }

    return combinedArray;
}

/**
 *
 * Takes an array and converts it to a comma seperated string.
 * @param {Array<T>} items The array to join to a string.
 * @returns {string} The original array as a comma seperated string.
 * @template T
 * @throws {TypeError} If the provided `items` parameter is not an array.
 * @since Version 0.2.0
 *
 */
export function convertToString<T>(
    items: Array<T>
): string;

/**
 *
 * Takes an array and converts it to a string using the specified joining string.
 *
 * @param {Array<T>} items  The array to join to a string.
 * @param {string}   joinOn The string to use to join the array elements.
 * @returns {string} The original array as a string.
 * @template T
 * @throws {TypeError} If the provided `items` parameter is not an array.
 * @throws {TypeError} If the provided `joinOn` parameter is not a string.
 * @since Version 0.2.0
 *
 */
export function convertToString<T>(
    items: Array<T>,
    joinOn: string
): string;

/**
 *
 * Takes an array and converts it to a string using the specified joining string.
 *
 * @param {Array<T>} items         The array to join to a string.
 * @param {string}   [joinOn=", "] The string to use to join the array elements.
 * @returns {string} The original array as a string.
 * @template T
 * @throws {TypeError} If the provided `items` parameter is not an array.
 * @throws {TypeError} If the provided `joinOn` parameter is not a string.
 * @since Version 0.2.0
 *
 */
export function convertToString<T>(
    items: Array<T>,
    joinOn: string = ", "
): string {
    // Validate
    if (isNotArray(items)) {
        throw new TypeError(`Unable to convert ${getType(items)} to a string using Array logic; Items must be of `
            + "type Array");
    }

    if (isNotString(joinOn)) {
        throw new TypeError(`Unable to join Array into a string with type: ${getType(joinOn)}; Convert to a ` +
            "string first");
    }

    return items.length !== 0 ? items.join(joinOn) : "";
}

/**
 *
 * Flattens an array to a single dimension of array items.
 *
 * @param {Array<NestedArray<T>>} items The array of items to flatten.
 * @returns {Array<T>} The items from the original array flattened into a single array.
 * @template T
 * @since Version 0.2.0
 *
 *
 */
export function flatten<T>(
    items: Array<NestedArray<T>>
): Array<T> {
    // Validate
    if (isNotArray(items)) {
        throw new TypeError(`Unable to flatten type: ${getType(items)}; Must be an Array`);
    }
    const flattenedArray: Array<T> = new Array<T>();

    items?.forEach((item) => {
        isArray(item) ? flattenedArray.push(...flatten(item)) : flattenedArray.push(item);
    });

    return flattenedArray;
}

/**
 *
 * Helper method that indicates if the provided array is an empty array.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the array is empty, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isEmptyArray<T>(
    arg: unknown
): arg is EmptyArray {
    return ((isArray(arg))
        && (arg.length === 0));
}

/**
 *
 * Helper method that indicates if the provided array is not empty.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} True if the array is not empty, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNonEmptyArray<T>(
    arg: unknown
): arg is Array<T> {
    return ((isArray(arg))
        && (arg.length !== 0));
}
