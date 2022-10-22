/**
 *
 * Utility type that is used to indicate if a type can be `null` or the supplied type.
 * <br />
 * Useful for TypeScript projects where the `strictNullChecks` flag is enabled.
 *
 * @type Nullable
 * @since Version 0.2.0
 *
 */
export type Nullable<T> = T | null;
