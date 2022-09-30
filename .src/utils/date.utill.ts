import { DateString, YearMonthDateString } from "../types";
import { getType, isDate, isNotDate, isString } from "./types.util";
import { convertToTwoCharacterNumericalString, ONE } from "./number.util";
import { Milliseconds } from "./time.util";

/**
 *
 * The offset for months in JavaScript, since the Date object starts at 0.
 *
 * @type {number}
 * @see ONE
 *
 */
const MONTH_OFFSET = ONE;

/**
 *
 * Calculates the number of days between the provided date and the current date.
 *
 * @param {Date} date The date to compare against the current date.
 * @returns {number} The number of days between the provided date and the current date.
 * @since Version 0.1.0
 *
 */
export function calculateDaysApart(date: Date): number;

/**
 *
 * Calculates the number of days between two dates.
 *
 * @param {Date} firstDate  The first date to compare against.
 * @param {Date} secondDate The second date to compare against.
 * @returns {number} The number of days between the two dates.
 * @throws {TypeError} If the first param is not a Date.
 * @throws {TypeError} If the second param is not a Date.
 * @since Version 0.1.0
 *
 */
export function calculateDaysApart(firstDate: Date, secondDate: Date): number;

/**
 *
 * Calculates the number of days between two dates.
 *
 * @param {Date} firstDate               The first date to compare against.
 * @param {Date} [secondDate=new Date()] The second date to compare against. Defaults to new date, if a value is not
 * provided.
 * @returns {number} The number of days between the two dates.
 * @throws {TypeError} If the first param is not a Date.
 * @throws {TypeError} If the second param is not a Date.
 * @since Version 0.1.0
 *
 */
export function calculateDaysApart(firstDate: Date, secondDate: Date = new Date()) {
	// Validate
	if (isNotDate(firstDate)) {

		throw new TypeError(`Cannot calculate days apart with type: ${getType(firstDate)} for first param; `
			+ "Must be a valid Date object");
	} else if (isNotDate(secondDate)) {
		throw new TypeError(`Cannot calculate days apart with type: ${getType(secondDate)} for second param; `
			+ "Must be a valid Date object");
	}

	const diffInTime = firstDate.getTime() - secondDate.getTime();
	return (Math.floor(Math.abs(diffInTime / Milliseconds.inDays())));
}

/**
 *
 * Converts the provided Date object to a DateString.
 *
 * @param {Date} date The Date object to convert.
 * @returns {DateString} The Date object as a DateString.
 * @throws {TypeError} If the provided value is not a Date object.
 * @since Version 0.1.0
 *
 */
export function convertToDateString(date: Date): DateString;

/**
 *
 * Converts the provided Date formatted string to a DateString.
 *
 * @param {string} dateAsString A Date object converted to string form to convert.
 * @returns {DateString} The string converted to a DateString.
 * @throws {TypeError} If the provided value is not a valid Date formatted string.
 * @since Version 0.1.0
 *
 */
export function convertToDateString(dateAsString: string): DateString;

/**
 *
 * Takes a Date object or a Date formatted string and converts it to a DateString.
 *
 * @param {(Date | string)} dateOrString The Date object or string to convert.
 * @returns {DateString} The provided value converted to a DateString.
 * @throws {TypeError} If the provided value is not a Date object or Date formatted string.
 * @since Version 0.1.0
 *
 */
export function convertToDateString(dateOrString: Date | string): DateString {
	let dateAux: Date;

	// Validate
	if (isDate(dateOrString)) {
		dateAux = dateOrString;
	} else if ((isString(dateOrString))
		&& (Date.parse(dateOrString))) {

		dateAux = new Date(dateOrString);
	} else {
		throw new TypeError(`Cannot convert type: ${getType(dateOrString)} to DateString; Must be a valid Date `
			+ "object or Date formatted as a string");
	}

	return [
		dateAux.getFullYear(),
		convertToTwoCharacterNumericalString(getMonthOffset(dateAux)),
		convertToTwoCharacterNumericalString(dateAux.getDate())
	].join("-") as DateString;
}

/**
 *
 * Takes a Date object or a Date formatted string and converts it to a YearMonthDateString.
 *
 * @param {(Date | string)} dateOrString The Date object or string to convert.
 * @returns {DateString} The provided value converted to a YearMonthDateString.
 * @throws {TypeError} If the provided value is not a Date object or Date formatted string.
 * @since Version 0.1.0
 *
 */
export function convertToYearAndMonthDateString(dateOrString: Date | string): YearMonthDateString {
	let dateAux: Date;

	// Validate
	if (isDate(dateOrString)) {
		dateAux = dateOrString;
	} else if ((isString(dateOrString))
		&& (Date.parse(dateOrString))) {

		dateAux = new Date(dateOrString);
	} else {
		throw new TypeError(`Cannot convert type: ${getType(dateOrString)} to YearMonthDateString; Must be a `
			+ "valid Date object or Date formatted as a string");
	}

	return [
		dateAux.getFullYear(),
		convertToTwoCharacterNumericalString(getMonthOffset(dateAux))
	].join("-") as YearMonthDateString;
}

/**
 *
 * Calculates the month offset or a given date and returns it.
 *
 * @param {Date} date The Date object to get the month offset of.
 * @returns {number} The month associated with the Date object, formatted as a standard number.
 * @throws {Error} If the provided param is not a Date object.
 * @since Version 0.1.0
 *
 */
export function getMonthOffset(date: Date): number {
	// Validate
	if (isNotDate(date)) {
		throw new TypeError(`Cannot get month offset of type: ${getType(date)}; Must be of type Date`);
	}

	return date.getMonth() + MONTH_OFFSET;
}
