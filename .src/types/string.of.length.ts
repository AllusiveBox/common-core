/**
 *
 * Utility type that gets the length of a string as a type.
 * <br />
 * Reference: https://github.com/doox911-opensource/typescript/blob/main/type-challenges/medium/Length_of_String.md
 *
 * @type StringOfLength
 * @since Version 0.3.2
 *
 */
export type StringOfLength<
    S extends string,
    T extends Array<string> = Array<string>
> = S extends `${string}${infer R}`
    ? StringOfLength<R, [...T, string]>
    : T['length'];