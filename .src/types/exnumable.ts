/**
 *
 * Utility type that is used to indicate if a value's type can be converted to an {@link EXnum} instance.
 *
 * @type EXnumable
 * @beta
 * @since Version 0.2.0
 *
 */
export type EXnumable<T = (number | string)> = T extends (number | string) ? T : never;
