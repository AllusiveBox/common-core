import {
	getType,
	isNotNullOrUndefined, isNotObject,
	isNullOrUndefined,
	isObject
} from "./types.util";
import {
	NestedKeyOf,
	Nullable
} from "../types";
import { NilError } from "../errors";

/**
 *
 * Gets the value stored in an object at the specified object path.
 * <br />
 * Due to issues with some versions of TypeScript, it may be that you need to annotate this method with `ts-ignore`
 * in order to get the code to compile properly.
 *
 * @param {TObject} obj The object to get the value from.
 * @param {string}  path The relative path for the field in the object to get the value of. Also known as
 * `propertyName`, `fieldName`, or `key`.
 * @returns {Nullable<TObject[keyof TObject]>} The value stored in the object at the specified path. Can be `null`.
 * @template TObject
 * @throws {NilError} If the provided `obj` parameter is `null` or `undefined`.
 * @throws {NilError} If the provided `path` parameter is `null` or `undefined`.
 * @throws {Error} If both the `obj` and `path` parameters are `null` or `undefined`.
 * @throws {TypeError} If the provided `obj` parameter is not an object.
 * @since Version 0.1.0
 *
 */
export function getProperty<TObject extends object>(
	obj: TObject,
	path: NestedKeyOf<TObject>
): Nullable<TObject[keyof TObject]> {
	// Validate
	if ((isNullOrUndefined(obj))
		// @ts-ignore
		&& (isNotNullOrUndefined(path))) {

		// @ts-ignore
		throw new NilError(`Attempting to get ${path} for null object`);
	} else if ((isNullOrUndefined(path))
		&& (isNotNullOrUndefined(obj))) {

		throw new NilError("Null or undefined path provided when attempting to access value from object");
	} else if ((isNullOrUndefined(obj))
		&& (isNullOrUndefined(path))) {

		throw new Error("Unable to get property from an object when both the object and property are null or " +
			"undefined");
	} else if (isNotObject(obj)) {

		throw new TypeError(`Unable to get property ${path} of type: ${getType(obj)}`);
	}

	const keys = path.split(".");

	let result: any = obj;
	for (const key of keys) {
		result = result[key];
	}

	return result || null;
}

/**
 *
 * Indicates if an object is empty.
 *
 * @param {object} arg The object to check.
 * @returns {boolean} True if the value is an empty object, otherwise false.
 * @since Version 0.1.0
 *
 */
export function isEmptyObject(
	arg: object
): arg is Record<string, never> {
	return isObject(arg) && Object.keys(arg).length === 0;
}

/**
 *
 * Indicates if an object is not empty.
 *
 * @param {object} arg The object to check.
 * @returns {arg is object} True if the value is not an empty object, otherwise false.
 * @since Version 0.1.0
 *
 */
export function isNotEmptyObject(
	arg: object
): arg is object {
	return isObject(arg) && Object.keys(arg).length !== 0;
}
