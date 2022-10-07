/**
 *
 * Utility type that is used to indicate nested arrays.
 *
 * @type NestedArray<T>
 * @template T
 * @since Version 0.1.0
 *
 */
export type NestedArray<T> = T | Array<NestedArray<T>>;
