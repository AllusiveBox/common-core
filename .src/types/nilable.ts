/**
 *
 * Utility type that is used to indicate if a type can be null, undefined, or the type it is wrapped around.
 *
 * @type Nilable<T>
 * @template T
 * @see {@link Nullable} for a version that supports only the wrapped type and null.
 * @since Version 0.1.0
 *
 */
export type Nilable<T> = T | null | undefined;
