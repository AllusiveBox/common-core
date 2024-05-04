/**
 *
 * Utility type that is used to indicate if a type can be `undefined` or the supplied type.
 * <br />
 * Useful for TypeScript projects where `strictNullChecks` flag is enabled.
 *
 * @type Maybe
 * @since Version 0.4.0
 *
 */
export type Maybe<T> = T | undefined;