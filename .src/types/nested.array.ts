/**
 *
 * Utility type that is used to indicate an array containing an array.
 *
 * @type NestedArray
 * @since Version 0.2.0
 *
 */
export type NestedArray<T> = T | Array<NestedArray<T>>;
