type OneToNine = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type ZeroToNine = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";
type Year = `19${ZeroToNine}${ZeroToNine}` | `20${ZeroToNine}${ZeroToNine}`;
type Month = `0${OneToNine}` | `1${"0" | "1" | "2"}`;
type Day = `${"0"}${OneToNine}` | `${"1" | "2"}${ZeroToNine}` | `3${"0" | "1"}`

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
