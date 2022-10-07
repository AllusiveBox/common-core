# Version 0.1.0 (Beta Release)
<details>
    <summary>Version 0.1.0 change log</summary>

## Newly Added 

### Errors

#### NilError

* Added the `NilError`. Intended to be thrown in instances where a value is not supposed to be null or undefined, but is null or undefined.
* This class has the following constructor signatures:
    * `new NilError();`
    * `new NilError(causedBy: string);`
* If provided, the optional `causedBy` parameter sets a field indicating what caused the error. This is additional information, alongside the Error's stack.

### Models

#### AbstractEntity

* Added the `AbstractEntity` model. Intended to be used as a base for any custom entities that that do things? Not really sure what all I'll do with this, but I wanted it, so it's here.
* This class has the following constructor signature:
    * `new AbstractEntity(code: string, text: string, type: string);`
    * **Note**: This class' constructor is **protected**, it cannot be called as is without first being extended.
* This class has the following static variables:
    * `SUPPORTED_TYPES: Array<AbstractEntity>;`
* This class has the following static methods:
    * `getType(): string;`
    * `isSupported(): boolean;`
    * `toString(): string`
* This class has the following instance based methods:
    * `isStrictEqual(entity: AbstractEntity): boolean;`
    * `isEqual(entity: AbstractEntity): boolean;`
    * `toString(): string;`

#### Environment

* Added the `Environment` model. This class extends the `AbstractEntity` model. It is intended to be a class based instance for the actual node process options that I intended to use / support, plus an unknown option.
* This class has the following constructor signature:
    * `new Environment(code: string, text: string);`
    * **Note**: This class' constructor is **private**, it cannot be called, even if extended.
* This class has the following static variables:
    * `DEVELOPMENT: Environment;`
    * `PRODUCTION: Environment;`
    * `TEST: Environment;`
    * `UNKNOWN: Environment;`
    * `SUPPORTED_TYPES: Array<Environment>;`
* This class has the following static methods:
    * `getEnvironment(environmentCode: string): Environment;`
* This class has the following instance based methods:
    * `isDev(): boolean;`
    * `isProd(): boolean;`
    * `isTest(): boolean;`
    * `isUnknown(): boolean;`

### Types

#### DateString, YearMonthDateString, Day, Month, Year, ZeroToNine, and OneToNine

* The `DateString` type is a utility type for strings formatted as YYYY-MM-DD strings. Due to TypeScript limitations, this is limited to between the years 1900 - 2099, but hey, that's a long time, yeah?
* The `YearMonthDateString` type is a utility type for strings formatted as YYYY-MM. Again, due to TypeScript limitations, this is limited to between the years 1900 - 2099.
* The `Day` type is a utility type representing strings between 01 - 31, as you would see in for calendar day.
* The `Month` type is a utility type representing strings between 01 - 12, as you would see in for calendar month.
* The `Year` type is a utility type representing strings between 1900 - 2099.
* The `ZeroToNine` type is a utility type representing the numbers 0 - 9 as strings.
* The `OneToNine` type is a utility type representing the numbers 1 - 9 as strings.

#### NestedArray

* The `NestedArray` type is a utility type indicating a variable is an array containing another array(s).

#### NestedKeyOf

* The `NestedKeyOf` type is a utility type that is used to indicate nested objects.

#### Nilable

* The `Nilable` type is a utility type indicating that a variable can either be the specified value, `null`, *or*, `undefined`.

#### Nullable

* The `Nullable` type is a utility type indicating that a variable can be either the specified value *or* `null`, but not `undefined`.

#### NumericalString

* The `NumericalString` type is a utility type that represents a number *or* a string, and is used in instances where the value can be either or.

### Utilities

#### ArrayUtil

* Added the `ArrayUtil` namespace, which has a bunch of utility functions related to JavaScript Arrays.
* Added the `isEmptyArray` function.
    * This function has the following signature:
        * `isEmptyArray<T>(arg: Array<T>): boolean;`
* Added the `isNotEmptyArray` function.
    * This function has the following signature:
        * `isNotEmptyArray<T>(arg: Array<T>): boolean;`

#### DateUtil

* Added the `DateUtil` namespace, which has a bunch of utilty functions related to JavaScript dates (which everyone loves).
* Added the `calculateDaysApart` function.
    * This function has the following signatures:
        * `calculateDaysApart(date: Date): number;`
        * `calculateDaysApart(firstDate: Date, secondDate: Date): number;`
* Added the `convertToDateString` function.
    * This function has the following signatures:
        * `convertToDateString(date: Date): DateString;`
        * `convertToDatekString(dateAsString: string): DateString;`
* Added the `convertToYearAndMonthDateString` function.
    * This function has the following signatures:
        * `convertToYearAndMonthDateString(date: Date): YearMonthDateString;`
        * `convertToYearAndMonthDateString(dateAsString: string): YearMonthDateString;`
* Added the `getMonthOffset` function.
    * This function has the following signature:
        * `getMonthOffset(date: Date): number;`

#### NumberUtil

* Added the `NumberUtil` namespace, which has a bunch of utility functions for JavaScript numbers.
* Added the following constants:
    * `ZERO: number = 0;`
    * `ONE: number = 1;`
    * `TEN: number = 10;`
    * `ONE_HUNDRED: number = 100;`
    * `ONE_THOUSAND: number = 1000;`
    * `TEN_THOUSAND: number = 10000;`
* Added the `convertToTwoCharacterNumericalString` function.
    * This function has the following signatures:
        * `convertToTwoCharacterNumericalString(num: number): NumericalString;`
        * `convertToTwoCharacterNumericalString(num: number, options: FormatAsTwoCharacterOptions): NumericalString;`
* Added the `roundToNth` function.
    * This function has the following signature:
        * `roundToNth(num: number, decimalPlaces: number): number;`

#### ObjectUtil

* Added the `ObjectUtil` namespace, which has a bunch of utility functions for JavaScript objects.
* Added the `getProperty` function.
    * This function has the following signature:
        * `getProperty<TObject extends object>(object: TObject, path: NestedKeyOf<TObject>): Nullable<TObject<keyof TObject]>;`
* Added the `isEmptyObject` function.
    * This function has the following signature:
        * `isEmptyObject(arg: object): boolean;`
* Added the `isNotEmptyObject` function.
    * This function has the following signature:
        * `isNotEmptyObject(arg: object): boolean;`

#### ProcessUtil

* Added the `ProcessUtil` namespace, which has a bunch of utility functions relating to the node process variable.
* Added the `getEnvironment` function.
    * This function has the following signature:
        * `getEnvironment(): Environment;`
* Added the `setEnvironment` function.
    * This function has the following signatures:
        * `setEnvironment(environment: Environment): void;`
        * `setEnvironment(environmentString: string): void;`

#### StringUtil

* Added the `StringUtil` namespace, which has a bunch of utility functions relating to JavaScript strings.
* Added the `doubleQuotes` function.
    * This function has the following signature:
        * `doubleQuotes(arg: string): string;`
* Added the `isEmptyString` function.
    * This function has the following signature:
        * `isEmptyString(arg: string): boolean;`
* Added the `isSetString` function.
    * This function has the following signature:
        * `isSetString(arg: string): boolean;`

#### TimeUtil

* Added the `TimeUtil` namespace, which has a utility functions related to time.
* Added the Millisecond interface.
    * This interface has the following methods associated with it:
        * `inSeconds(seconds?: number): number;`
        * `toSeconds(milliseconds?: number): number;`
        * `inMinutes(minutes?: number): number;`
        * `toMinutes(milliseconds?: number): number;`
        * `inHours(hours?: number): number;`
        * `toHours(milliseconds?: number): number;`
        * `inDays(days?: number): number;`
        * `toDays(milliseconds?: number): number;`
        * `inWeeks(weeks?: number): number;`
        * `toWeeks(milliseconds?: number): number;`
        * `inMonths(months?: number): number;`
        * `toMonths(milliseconds?: number): number;`
        * `inYears(years?: number): number;`
        * `toYears(milliseconds?: number): number;`
* Added the Milliseconds constant, which extends the Millisecond interface.

#### TypesUtil

* Added the `TypesUtil` namespace, which has a lot of type guarding and general typing related functions in it.
* Added the `getType` function.
    * This function has the following signature:
        * `getType(arg: unknown): string;`
* Added the `isArray` function.
    * This function has the following signature:
        * `isArray<T>(arg: T): boolean;`
* Added the `isNotArray` function.
    * This function has the following signature:
        * `isNotArray<T>(arg: T): boolean;`
* Added the `isAbstractEntity` function.
    * This function has the following signature:
        * `isAbstractEntity<T>(arg: T): boolean;`
* Added the `isNotAbstractEntity` function.
    * This function has the following signature:
        * `isNotAbstractEntity<T>(arg: T): boolean;`
* Added the `isBoolean` function.
    * This function has the following signature:
        * `isBoolean<T>(arg: T): boolean;`
* Added the `isNotBoolean` function.
    * This function has the following signature:
        * `isNotBoolean<T>(arg: T): boolean;`
* Added the `isDate` function.
    * This function has the following signature:
        * `isDate<T>(arg: T): boolean;`
* Added the `isNotDate` function.
    * This function has the following signature:
        * `isNotDate<T>(arg: T): boolean;`
* Added the `isDateString` function.
    * This function has the following signature:
        * `isDateString<T>(arg: T): boolean;`
* Added the `isNotDateString` function.
    * This function has the following signature:
        * `isNotDateString<T>(arg: T): boolean;`
* Added the `isEmpty` function.
    * This function has the following signature:
        * `isEmpty<T>(arg: T): boolean;`
* Added the `isNotEmpty` function.
    * This function has the following signature:
        * `isNotEmpty<T>(arg: T): boolean;`
* Added the `isError` function.
    * This function has the following signature:
        * `isError<T>(arg: T): boolean;`
* Added the `isNotError` function.
    * This function has the following signature:
        * `isNotError<T>(arg: T): boolean;`
* Aded the `isNull` function.
    * This function has the following signature:
        * `isNull<T>(arg: T): boolean;`
* Added the `isNotNull` function.
    * This function has the following signature:
        * `isNotNull<T>(arg: T): boolean;`
* Added the `isNumber` function.
    * This function has the following signature:
        * `isNumber<T>(arg: T): boolean;`
* Added the `isNotNumber` function.
    * This function has the following signature:
        * `isNotNumber<T>(arg: T): boolean;`
* Added the `isObject` function.
    * This function has the following signature:
        * `isObject<T>(arg: T): boolean;`
* Added the `isNotObject` function.
    * This function has the following signature:
        * `isNotObject<T>(arg: T): boolean;`
* Added the `isString` function.
    * This function has the following signature:
        * `isString<T>(arg: T): boolean;`
* Added the `isNotString` function.
    * This function has the following signature:
        * `isNotString<T>(arg: T): boolean;`
* Added the `isUndefined` function.
    * This function has the following signature:
        * `isUndefined<T>(arg: T): boolean;`
* Added the `isNotUndefined` function.
    * This function has the following signature:
        * `isNotUndefined<T>(arg: T): boolean;`
* Added the `isNullOrUndefined` function.
    * This function has the following signature:
        * `isNullOrUndefined<T>(arg: T): boolean;`
* Added the `isNotNullOrUndefined` function.
    * This function has the following signature:
        * `isNotNullOrUndefined<T>(arg: T): boolean;`
    
</details>
