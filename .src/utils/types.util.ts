// import { isEmptyArray, isNotEmptyArray } from "./array.util";
// import { isEmptyObject, isNotEmptyObject } from "./object.util";
// import { isEmptyString, isSetString } from "./string.util";
// import { DateString } from "../types";
// import { AbstractEntity } from "../models";

// /**
//  *
//  * A regex used to determine of a string meets the requirements of a {@link DateString} or not. Used by the
//  * {@link isDateString} function.
//  *
//  * @type {RegExp}
//  *
//  */
// const DATE_STRING_REGEX = new RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/);
//
// /**
//  *
//  * An array of all the months with 30 days in them. Used by the {@link isDateString} function to help determine date
//  * accuracy.
//  *
//  * @type {Array<number>}
//  *
//  */
// const MONTHS_WITH_30_DAYS = [4, 6, 9, 11];

/**
 *
 * Utility method that returns the type of a provided argument. More descriptive than the native `typeof` feature.
 *
 * @param {unknown} arg The argument to get the type of.
 * @returns {string} A string representing the type of object.
 * @since Version 0.1.0
 *
 */
export function getType(arg: unknown): string {

    if (isArray(arg)) {
        return "Array";
    }

	// if (isAbstractEntity(arg)) {
	// 	return arg.type || "AbstractEntity";
	// }

    if (isBoolean(arg)) {
        return "Boolean";
    }

    if (isDate(arg)) {
        return "Date";
    }

	// if (isDateString(arg)) {
	// 	return "DateString";
	// }

    if (isError(arg)) {
        return "Error";
    }

    if (isNull(arg)) {
        return "Null";
    }

    if (isNumber(arg)) {
        return "Number";
    }

    if (isObject(arg)) {
        return "Object";
    }

    if (isString(arg)) {
        return "String";
    }

    if (isUndefined(arg)) {
        return "Undefined";
    }

    return "Unknown";
}

/**
 *
 * Checks if a value is an array.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is an array, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isArray<T>(arg: T): arg is T & Array<any> {
    return Array.isArray(arg);
}

/**
 *
 * Checks if a value is not an array.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not an array, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotArray<T>(arg: T): arg is Exclude<T, Array<any>> {
    return !isArray(arg);
}

// /**
//  *
//  * Checks if a value is an AbstractEntity.
//  *
//  * @param {T} arg The value to check.
//  * @returns {boolean}
//  * @template T
//  * @since Version 0.1.0
//  *
//  */
// export function isAbstractEntity<T>(arg: T): arg is T & AbstractEntity {
// 	return arg instanceof AbstractEntity;
// }
//
// /**
//  *
//  * Checks if a value is not an AbstractEntity.
//  *
//  * @param {T} arg The value to check.
//  * @returns {boolean}
//  * @template T
//  * @since Version 0.1.0
//  *
//  */
// export function isNotAbstractEntity<T>(arg: T): arg is Exclude<T, AbstractEntity> {
// 	return !isAbstractEntity(arg);
// }

/**
 *
 * Checks if a value is a boolean.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is a boolean, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isBoolean<T>(arg: T): arg is T & boolean {
    return typeof arg === "boolean";
}

/**
 *
 * Checks if a value is not a boolean.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not a boolean, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotBoolean<T>(arg: T): arg is Exclude<T, boolean> {
    return !isBoolean(arg);
}

/**
 *
 * Checks if a value is a date.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is a Date, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isDate<T>(arg: T): arg is T & Date {
    return (isNotNull(arg)
        && (Object.prototype.toString.call(arg) === "[object Date]")
        && (!!Date.parse(arg as unknown as string)));
}

/**
 *
 * Checks if a value is not a Date.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not a Date, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotDate<T>(arg: T): arg is Exclude<T, Date> {
    return !isDate(arg);
}

// /**
//  *
//  * Checks if a value is a date string.
//  *
//  * @param {T} arg The value to check.
//  * @returns {boolean} True if the value is a {@link DateString}, otherwise false.
//  * @template T
//  * @since Version 0.1.0
//  *
//  */
// export function isDateString<T>(arg: T): arg is T & DateString {
// 	let dateAuxArray: Array<string> = new Array<string>();
// 	if ((isString(arg))
// 		&& (isNotNullOrUndefined(arg.match(DATE_STRING_REGEX)))) {
//
// 		dateAuxArray = arg.split("-");
// 	} else {
// 		return false;
// 	}
// 	const year = parseInt(dateAuxArray[0]);
// 	const month = parseInt(dateAuxArray[1]);
// 	const date = parseInt(dateAuxArray[2]);
//
// 	// Validate the month and date values
// 	if ((month > 12)
// 		|| (month < 0)) {
//
// 		return false;
// 	} else if ((date > 31)
// 		|| (date < 0)) {
//
// 		return false;
// 	} else if ((month === 2)
// 		&& (date > 29)) {
//
// 		return false;
// 	} else if ((MONTHS_WITH_30_DAYS.includes(month))
// 		&& (date > 30)) {
//
// 		return false;
// 	} else if ((year > 2099)
// 		|| (year < 1900)) {
//
// 		return false;
// 	}
//
// 	const dateAux = new Date(`${month}/${date}/${year}`);
//
// 	return isDate(dateAux);
// }
//
// /**
//  *
//  * Checks if a value is not a date string.
//  *
//  * @param {T} arg The value to check.
//  * @returns {boolean} True if the value is not a {@link DateString}, otherwise false.
//  * @template T
//  * @since Version 0.1.0
//  *
//  */
// export function isNotDateString<T>(arg: T): arg is Exclude<T, DateString> {
// 	return !isDateString(arg);
// }
//
// /**
//  *
//  * Checks if a value is empty.
//  *
//  * @param {T} arg The value to check.
//  * @returns {boolean} True if the value is empty, otherwise false.
//  * @template T
//  * @since Version 0.1.0
//  *
//  */
// export function isEmpty<T>(arg: T): arg is T & (Array<T> | object | string) {
// 	if (isArray(arg)) {
// 		return isEmptyArray(arg);
// 	} else if (isString(arg)) {
// 		return isEmptyString(arg);
// 	} else if (isObject(arg)) {
// 		return isEmptyObject(arg);
// 	} else {
// 		return isNullOrUndefined(arg);
// 	}
// }
//
// /**
//  *
//  * Checks if a value is not empty.
//  *
//  * @param {T} arg The value to check.
//  * @returns {boolean} True if the value is not empty, otherwise false.
//  * @template T
//  * @since Version 0.1.0
//  *
//  */
// export function isNotEmpty<T>(arg: T): arg is Exclude<T, Array<any> | object | string> {
//     if (isArray(arg)) {
//         return isNotEmptyArray(arg);
//     } else if (isString(arg)) {
//         return isSetString(arg);
//     } else if (isObject(arg)) {
//         return isNotEmptyObject(arg);
//     } else {
//         return isNotNullOrUndefined(arg);
//     }
// }

/**
 *
 * Checks if a value is an Error.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is an Error, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isError<T>(arg: T): arg is T & Error {
    return arg instanceof Error;
}

/**
 *
 * Checks if a value is not an Error.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not an Error, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotError<T>(arg: T): arg is Exclude<T, Error> {
    return !isError(arg);
}

/**
 *
 * Checks if a value is null.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is null, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNull<T>(arg: T): arg is T & null {
    return arg === null;
}

/**
 *
 * Checks if a value is not null.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not null, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotNull<T>(arg: T): arg is Exclude<T, null> {
    return !isNull(arg);
}

/**
 *
 * Checks if a value is a number.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is a number, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNumber<T>(arg: T): arg is T & number {
    return typeof arg === "number" && !isNaN(arg);
}

/**
 *
 * Checks if a value is not a number.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not a number, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotNumber<T>(arg: T): arg is Exclude<T, number> {
    return !isNumber(arg);
}

/**
 *
 * Checks if a value is an object.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is an object, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isObject<T>(arg: T): arg is T & object {
    return isNotNull(arg)
        && isNotArray(arg)
        && isNotDate(arg)
        && typeof arg === "object";
}

/**
 *
 * Checks if a value is not an object.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not an object, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotObject<T>(arg: T): arg is Exclude<T, object> {
    return !isObject(arg);
}

/**
 *
 * Checks if a value is a string.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is a string, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isString<T>(arg: T): arg is T & string {
    return typeof arg === "string";
}

/**
 *
 * Checks if a value is not a string.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not a string, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotString<T>(arg: T): arg is Exclude<T, string> {
    return !isString(arg);
}

/**
 *
 * Checks if a value is undefined.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is undefined, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isUndefined<T>(arg: T): arg is T & undefined {
    return typeof arg === "undefined";
}

/**
 *
 * Checks if the value is not undefined.
 *
 * @param {T} arg The value to check.
 * @returns {boolean} True if the value is not undefined, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotUndefined<T>(arg: T): arg is Exclude<T, undefined> {
    return !isUndefined(arg);
}

/**
 *
 * Checks if the value is either null or undefined.
 *
 * @param {T} arg
 * @returns {boolean} True if the value is either null or undefined, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNullOrUndefined<T>(arg: T): arg is T & (null | undefined) {
    return isNull(arg) || isUndefined(arg);
}

/**
 *
 * Checks if the value is neither null nor undefined.
 *
 * @param {T} arg
 * @returns {boolean} True if the value is neither null nor undefined, otherwise false.
 * @template T
 * @since Version 0.1.0
 *
 */
export function isNotNullOrUndefined<T>(arg: T): arg is Exclude<T, null | undefined> {
    return isNotNull(arg) && isNotUndefined(arg);
}
