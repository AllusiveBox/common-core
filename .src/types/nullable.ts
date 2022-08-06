/**
 *
 * Utility type that is used to indicate if a type can be null or not.
 *
 * @type Nullable<T>
 * @template T
 * @see {@link Nilable} for a version that supports the wrapped type, null, and undefined.
 * @since Version 0.1.0
 *
 */
export type Nullable<T> = T | null;
