import {
	isNullOrUndefined,
	isObject
} from "./types.util";
import { NestedKeyOf, Nullable } from "../types";

/**
 *
 * Gets the value stored in an object at the specified object path.
 *
 * @param {TObject} object The object to get the value from.
 * @param {string}  path   The relative path for the field in the object to get the value of. Also known
 * as the `propertyName`, `fieldName`, or `key`.
 * @returns {Nullable<TObject[keyof TObject]>} The value stored in the object at the specified path. Can be null.
 * @template TObject
 * @since Introduced in Version 0.1.0.
 *
 */
export function getProperty<TObject extends object>(
	object: TObject,
	path: NestedKeyOf<TObject>
): Nullable<TObject[keyof TObject]> {
	// Validate
	if (isNullOrUndefined(object)) {
		throw new Error("Cannot get property of an object that is either null or undefined");
		// @ts-ignore
	} else if (isNullOrUndefined(path)) {
		throw new Error("Cannot get property of an object with a path that is either null or undefined");
	}

	const keys = path.split('.');
	let result: any = object;
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
 * @since Introduced in Version 0.1.0.
 *
 */
export function isEmptyObject(arg: object): arg is Record<string, never>  {
	return isObject(arg) && Object.keys(arg).length === 0;
}

/**
 *
 * Indicates if an object is not empty.
 *
 * @param {object} arg The object to check.
 * @returns {boolean} True if the value is not an empty object, otherwise false.
 * @since Introduced in Version 0.1.0.
 *
 */
export function isNotEmptyObject(arg: object): arg is object {
	return isObject(arg) && Object.keys(arg).length !== 0;
}
