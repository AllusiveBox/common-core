/**
 *
 * Utility type to restrict strings to the numbers 1 - 9.
 *
 * @type OneToNine
 * @since Version 0.1.0.
 *
 */
export type OneToNine = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

/**
 *
 * Utility type to restrict strings to the numbers 0 - 9.
 *
 * @type ZeroToNine
 * @since Version 0.1.0
 *
 */
export type ZeroToNine = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";

/**
 *
 * Utility type to restrict strings to 1900 - 2099, which is the format used for years. Due to TypeScript
 * limitations, the range is restricted to this range.
 *
 * @type Year
 * @since Version 0.1.0
 *
 */
export type Year = `19${ZeroToNine}${ZeroToNine}` | `20${ZeroToNine}${ZeroToNine}`;

/**
 *
 * Utility type to restrict strings to 01 - 12, which is the format used for months in a year.
 *
 * @type Month
 * @since Version 0.1.0
 *
 */
export type Month = `0${OneToNine}` | `1${"0" | "1" | "2"}`;

/**
 *
 * Utility type used to restrict strings to 01 - 31, which is the format used for days of a month.
 *
 * @type Day
 * @since Version 0.1.0
 *
 */
export type Day = `${"0"}${OneToNine}` | `${"1" | "2"}${ZeroToNine}` | `3${"0" | "1"}`

/**
 *
 * Utility type used to represent the year, month, and date in `YYYY-MM-DD` format.
 *
 * @type DateString
 * @since Version 0.1.0
 *
 */
export type DateString = `${Year}-${Month}-${Day}`;

/**
 *
 * Utility type used to represent a partial date, the year and month in `YYYY-MM` format.
 *
 * @type YearMonthDateString
 * @since Version 0.1.0
 *
 */
export type YearMonthDateString = `${Year}-${Month}`;
