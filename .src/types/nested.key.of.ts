/**
 *
 * Utility type that is used to indicate nested objects.
 * <br />
 * <b>Note:</b> Due to how TypeScript generates type unions, as of TypeScript 4.7.4, this logically works, however,
 * it requires the use of a `ts-ignore` to prevent error Type instantiation is excessively deep and possibly infinite.
 *
 * @type NestedKeyOf<TObject>
 * @template TObject
 * @since Version 0.1.0
 * @see {@link https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3 This article} for detailed
 * explanation of this type and how it works.
 *
 */
export type NestedKeyOf<TObject extends object> =
	{[Key in keyof TObject & string]: TObject[Key] extends object
		// @ts-ignore
		? `${Key}` | `${Key}.${NestedKeyOf<TObject[Key]>}`
		: Key
	}[keyof TObject & string];
