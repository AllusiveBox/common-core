/**
 *
 * Utility type that is used to indicate an object that may contain additional nested objects.
 * <br />
 * Refer to {@link https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3 this article} for a
 * detailed explanation of how this type is supposed to work.
 * <br />
 * <b>Note:</b> Due to how TypeScript generates type unions, as of TypeScript 4.8.4, this logically works, however,
 * it requires the use of a `ts-ignore` to prevent error Type instantiation is excessively deep and possibly infinite.
 *
 * @type NestedKeyOf
 * @beta
 * @since Version 0.1.0
 *
 */
export type NestedKeyOf<TObject extends object> =
    {
        [Key in keyof TObject & string]: TObject[Key] extends object
        ? `${Key}` | `${Key}.${NestedKeyOf<TObject[Key]> extends infer U extends string ? U : never}`
        : Key
    }[keyof TObject & string];
