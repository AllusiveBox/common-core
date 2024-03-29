import {
    getType,
    isNotNumber
} from "./types.util";
import { ONE_THOUSAND } from "./number.util";

/**
 *
 * Interface that describes the {@link Milliseconds} utility.
 *
 * @interface Millisecond
 * @since Version 0.1.0
 *
 */
export interface Millisecond {

    /**
     *
     * Calculates the number of milliseconds equal to the specified number of seconds.
     *
     * @param {number} [seconds=1] The number of seconds to convert.
     * @returns {number} The number of seconds converted to milliseconds.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    inSeconds(seconds?: number): number;

    /**
     *
     * Calculates the number of seconds based off the specified number of milliseconds.
     *
     * @param {number} milliseconds The number of milliseconds to convert.
     * @returns {number} The number of milliseconds converted into seconds.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    toSeconds(milliseconds?: number): number;

    /**
     *
     * Calculates the number of milliseconds equal to the specified number of minutes.
     *
     * @param {number} [minutes=1] The number of minutes to convert.
     * @returns {number} The number of minutes converted to milliseconds.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    inMinutes(minutes?: number): number;

    /**
     *
     * Calculates the number of minutes based off the specified amount of milliseconds.
     *
     * @param {number} milliseconds The number of milliseconds to convert.
     * @returns {number} The number of milliseconds converted into seconds.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    toMinutes(milliseconds?: number): number;

    /**
     *
     * Calculates the number of milliseconds equal to the specified number of hours.
     *
     * @param {number} [hours=1] The number of hours to convert.
     * @returns {number} The number of minutes converted to milliseconds.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    inHours(hours?: number): number;

    /**
     *
     * Calculates the number of hours based off the specified amount of milliseconds.
     *
     * @param {number} milliseconds The number of milliseconds to convert.
     * @returns {number} The number of milliseconds converted into hours.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    toHours(milliseconds?: number): number;

    /**
     *
     * Calculates the number of milliseconds equal to the specified number of days.
     *
     * @param {number} [days=1] The number of days to convert.
     * @returns {number} The number of days converted to milliseconds.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    inDays(days?: number): number;

    /**
     *
     * Calculates the number of days based off the specified amount of milliseconds.
     *
     * @param {number} milliseconds The number of milliseconds to convert.
     * @returns {number} The number of milliseconds converted into days.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    toDays(milliseconds?: number): number;

    /**
     *
     * Calculates the number of milliseconds equal to the specified number of weeks.
     *
     * @param {number} [weeks=1] The number of weeks to convert.
     * @returns {number} The number of weeks converted to milliseconds.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    inWeeks(weeks?: number): number;

    /**
     *
     * Calculates the number of weeks based off the specified amount of milliseconds.
     *
     * @param {number} milliseconds The number of milliseconds to convert.
     * @returns {number} The number of milliseconds converted into weeks.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    toWeeks(milliseconds?: number): number;

    /**
     *
     * Calculates the number of milliseconds equal to the specified number of months.
     *
     * @param {number} [months=1] The number of months to convert.
     * @returns {number} The number of months converted to milliseconds.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    inMonths(months?: number): number;

    /**
     *
     * Calculates the number of months based off the specified amount of milliseconds.
     *
     * @param {number} milliseconds The number of milliseconds to convert.
     * @returns {number} The number of milliseconds converted into months.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    toMonths(milliseconds?: number): number;

    /**
     *
     * Calculates the number of milliseconds equal to the specified number of years.
     *
     * @param {number} [years=1] The number of years to convert.
     * @returns {number} The number of years converted to milliseconds.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    inYears(years?: number): number;

    /**
     *
     * Calculates the number of years based off the specified amount of milliseconds.
     *
     * @param {number} milliseconds the number of milliseconds to convert.
     * @returns {number} The number of milliseconds converted into years.
     * @throws {TypeError} If the provided value to convert is not a number.
     * @since Version 0.1.0
     *
     */
    toYears(milliseconds?: number): number;

}

/**
 *
 * Helper function to calculate the number of milliseconds in a given unit of time.
 *
 * @param {number} [multiplier=1] The millisecond multiplier.
 * @returns {(unit: number) => number} A function configured with a specified multiplier. Takes a single additional
 * unit of time and calculates the number of milliseconds in it. (e.g. seconds, minutes, hours, etc).
 * @throws {TypeError} If the unit passed to the returned function is not a number.
 *
 */
function calculateMilliseconds(multiplier: number): (unit: number) => number {
    return function (unit: number = 1): number {
        if (isNotNumber(unit)) {
            throw new TypeError(`Cannot convert type: ${getType(unit)} to milliseconds; Must be of type number`);
        }
        return unit * multiplier;
    }
}

/**
 *
 * Helper function to calculate the number of time in a given unit, based off the supplied number of milliseconds.
 *
 * @param {number} [divider=1] The milliseconds divider.
 * @returns {(unit: number) => number} A function configured with a specified divider. Takes a single additional
 * amount of milliseconds and uses it to calculate the number of the specified unit.
 * @throws {TypeError} If the milliseconds passed to the returned function is not a number.
 *
 */
function convertFromMilliseconds(divider: number): (unit: number) => number {
    return function (milliseconds: number = 1): number {
        if (isNotNumber(milliseconds)) {
            throw new TypeError(`Cannot convert type: ${getType(milliseconds)} from milliseconds; Must be of type number`);
        }
        return Math.round(milliseconds / divider);
    }
}

/**
 *
 * Utility type that calculates the number of milliseconds for the specified unit of time.
 *
 * @type {Millisecond}
 * @since Version 0.1.0
 *
 */
export const Milliseconds: Millisecond = {
    inSeconds: calculateMilliseconds(1e3),
    toSeconds: convertFromMilliseconds(1e3),
    inMinutes: calculateMilliseconds(6e4),
    toMinutes: convertFromMilliseconds(6e4),
    inHours: calculateMilliseconds(3.6e6),
    toHours: convertFromMilliseconds(3.6e6),
    inDays: calculateMilliseconds(8.64e7),
    toDays: convertFromMilliseconds(8.64e7),
    inWeeks: calculateMilliseconds(6.048e8),
    toWeeks: convertFromMilliseconds(6.048e8),
    inMonths: calculateMilliseconds(2.628e9),
    toMonths: convertFromMilliseconds(2.628e9),
    inYears: calculateMilliseconds(3.154e10),
    toYears: convertFromMilliseconds(3.154e10)
};

/**
 *
 * Artificially delays application processing by generating a new promise that resolves after 1000 milliseconds.
 *
 * @returns {Promise<void>}
 * @since Version 0.2.0
 *
 */
export function sleep(): Promise<void>;

/**
 *
 * Artificially delays application processing by generating a new promise that resolves after the specified number
 * of milliseconds.
 *
 * @param {number} ms The number of milliseconds until the generated promise resolves.
 * @returns {Promise<void>}
 * @since Version 0.2.0
 *
 */
export function sleep(
    ms: number
): Promise<void>;

/**
 *
 * Artificially delays application processing by generating a new promise that resolves after the specified number
 * of milliseconds.
 *
 * @param {number} [ms=ONE_THOUSAND] The number of milliseconds until the generated promise resolves.
 * @returns {Promise<void>}
 * @since Version 0.2.0
 *
 */
export function sleep(
    ms: number = ONE_THOUSAND
): Promise<void> {
    if (isNotNumber(ms)) ms = ONE_THOUSAND;
    return new Promise(resolve => setTimeout(
        resolve,
        ms
    ));
}
