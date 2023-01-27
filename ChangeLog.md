# Version 0.X Change Log

## Version 0.3.0 (Beta Release)
<details>
    <summary>Version 0.3.0 Change Log</summary>

### Newly Added

* Nothing new was added the Version 0.3.0 release.

### Updates to existing Features

#### NestedKeyOf

* Updated the type definition for the NestedKeyOf type. This new definition should make it so that IDEs not complain about infinite possibilities for values and need to be ignored.

#### Breaking Changes

* While not necessarily a breaking change, the `json5` module was updated from version `2.2.1` to version `2.2.3`.
</details>

## Version 0.2.0 (Beta Release)
<details>
    <summary>Version 0.2.0 Change Log</summary>

### Newly Added

#### EXnum

* Added the EXNum class. This class replaces the old `AbstractEntity`. While there are some functional differences, it is intended to be a more friendly to work with replacement.

#### EXnumDoesNotExist

* Added the `EXNumDoesNotExist` Error. This error is intended to be thrown when attempting to look up an EXnum value from an EXnum class and the value does not exist.
* This Error is intended to be thrown during testing, as EXnums should not be designed to be created during runtime.

#### EXnumMissingRequiredValue

* Added the `EXnumMissingRequiredValue` Error. This error is intended to be thrown when attempting to create an EXnum that is missing a required field.
* This Error is intended to be thrown during testing, as EXnums should not be designed to be created during runtime.

#### Booleanable

* Added the utility type Booleanable. This type is intended to indicate that a value can be converted to a Boolean.

#### Falseable

* Added the utility type Falseable. This type is intended to indicate that a value is synonymous with the `false` boolean value.

#### Trueable

* Added the utility type Trueable. This type is intended to indicate that a value is synonymous with the `true` boolean value.

#### BooleanUtil

* Added the boolean utility sub package. This package contains a number of functions relating to booleans.
* This package contains the following constants:
  * `TRUE`
  * `FALSE`
* This package contains the following functions:
  * `convertToBoolean` - This function is intended to take a value and convert it into a boolean value.
    * This function has the following signature:
      * `convertToBoolean(arg: any, defaultValue: boolean = null): Nullable<boolean>;`
  * `isBooleanable` - This function indicates if a provided value can be converted into a boolean.
    * This function has the following signature:
      * `isBooleanable<T>(arg: T): boolean;`
  * `isFalse` - This function indicates if a provided value would convert to a `false` boolean value.
    * This function has the following signature:
      * `isFalse<T>(arg: T): boolean;`
  * `isTrue` - This function indicates if a provided value would convert to a `true` boolean value.
    * This function has the following signature:
      * `isTrue<T>(arg: T): boolean;`

### Updates to Existing Features

#### NilError

* This resource was moved as part of the restructuring from 0.1.0 to 0.2.0.
  * This resource may now be imported using the following options:
    * `import { NilError } from "@allusivebox/core";`
    * `import { NilError } from "@allusivebox/core/dist/.src";`
    * `import { NilError } from "@allusivebox/core/dist/.src/errors";`
    * `import { NilError } from "@allusivebox/core/dist/.src/errors/NilError";`
    * `import NilError from "@allusivebox/core/dist/.src/errors/NilError/nil.error";`

#### Environment

* Refactored the `Environment` class to extend the `EXnum` class, now that the `AbstractEntity` no longer exists.
* This resource was moved as part of the restructuring from 0.1.0 to 0.2.0.
  * This resource may now be imported using the following options:
    * `import { Environment } from "@allusivebox/core";`
    * `import { Environment } from "@allusivebox/core/dist/.src";`
    * `import { Environment } from "@allusivebox/core/dist/.src/exnums";`
    * `import { Environment } from "@allusivebox/core/dist/.src/exnums/Environment";`
    * `import Environment from "@allusivebox/core/dist/.src/exnums/Environment/environment";`

#### NestedArray

* Updated the documentation for the `NestedArray` utility type.

#### NestedKeyOf

* Updated the documentation for the `NestedKeyOf` utility type.
* Tagged this type as beta, due to the issues with TypeScript resolving infinitely.

#### Nilable

* Updated the documentation for the `Nilable` utility type.

#### Nullable

* Updated the documentation for the `Nullable` utility type.

#### ArrayUtil

* Added the `chunk` function. This function is intended to take a single array and break it into nested arrays.
  * This function has the following signatures:
    * `chunk<T>(items: Array<T>): NestedArray<T>;`
    * `chunk<T>(items: Array<T>, chunkSize: number): NestedArray<T>;`
* Added the `combine` function. This function is intended to combine two arrays into a single array.
  * This function has the following signature:
    * `combine<T, U>(array1: Array<T>, array2: Array<U>): Array<T | U>;`
* Added the `convertToString` function. This function takes an array and converts it to a string.
  * This function has the following signatures:
    * `convertToString<T>(items: Array<T>): string;`
    * `convertToString<T>(items: Array<T>, joinOn: string): string;`
* Added the `flatten` function. This function takes a nested array and converts it into a single array.

#### NumberUtil

* Changed the wording to a lot of the errors thrown by the NumberUtil functions.
* Added the `roundToTwo` function. This function takes a number and rounds to the nearest two decimal places.
  * This function has the following signature:
    * `roundToTwo(num: number): number;`

#### ObjectUtil

* Updated the documentation for a number of functions.

#### ProcessUtil

* Updated the documentation for a number of functions.
* Removed extra overloads for the `setEnvironment` function.
  * This function now has the following signature:
    * `setEnvironment(arg: Environment, string): void;`

#### StringUtil

* Updated the documentation for a number of functions.
* Changed the wording to a lot of errors thrown by the StringUtil functions.
* Added the `capitalize` function. This function takes a string and capitalizes the first letter, leaving the rest of the string as is.
  * This function has the following signature:
    * `capitalize(str: string): string;`
* Added the `singleQuotes` function. This function takes a string and wraps it in single quotes.
  * This function has the following signature:
    * `singleQuotes(arg: string): string;`

#### TimeUtil

* Added some missing versioning tags in the TimeUtil.
* Changed the wording to a lot of errors thrown by the TimeUtil functions.
* Added the `sleep` function. This function forces the application to delay further processing for a specified amount of time.
  * This function has the following signatures:
    * `sleep(): Promise<void>;`
    * `sleep(ms: number): Promise<void>;`

#### TypesUtil

* Updated the documentation for a number of functions.

### Breaking Changes

* A number of features were dropped between the 0.1.0 beta and the 0.2.0 beta, additionally, the overall file structure for the project was changed. To see what project content was impacted by the file restructure, check the [Updates to existing features](#updates-to-existing-features) section for full details.
* A number of previous features were removed.
  * `AbstractEntity`
  * `OneToNine`
  * `ZeroToNine`
  * `Year`
  * `Month`
  * `Day`
  * `DateString`
  * `YearMonthDateString`
  * `NumericalString`
  * `DateUtil`

#### NumberUtil

* The `convertToTwoCharacterNumericalString` function was renamed to `convertToTwoCharacterString`. Additionally, this method now only takes a single parameter, and it will always error when given a negative number, or a number that is greater than 99.
* The `convertToTwoCharacterString` now returns a `string`, rather than a `NumericalString`.

#### TypesUtil

* Removed all references to `AbstractEntity`, `DateString`, and `YearMonthDateString`. 
</details>

## Version 0.1.0 (Beta Release)
<details>
    <summary>Version 0.1.0 Change Log</summary>

### Newly Added 

#### Errors

##### NilError

* Added the `NilError`. Intended to be thrown in instances where a value is not supposed to be null or undefined, but is null or undefined.
* This class has the following constructor signatures:
    * `new NilError();`
    * `new NilError(causedBy: string);`
* If provided, the optional `causedBy` parameter sets a field indicating what caused the error. This is additional information, alongside the Error's stack.

#### Models

##### AbstractEntity

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

##### Environment

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

#### Types

##### DateString, YearMonthDateString, Day, Month, Year, ZeroToNine, and OneToNine

* The `DateString` type is a utility type for strings formatted as YYYY-MM-DD strings. Due to TypeScript limitations, this is limited to between the years 1900 - 2099, but hey, that's a long time, yeah?
* The `YearMonthDateString` type is a utility type for strings formatted as YYYY-MM. Again, due to TypeScript limitations, this is limited to between the years 1900 - 2099.
* The `Day` type is a utility type representing strings between 01 - 31, as you would see in for calendar day.
* The `Month` type is a utility type representing strings between 01 - 12, as you would see in for calendar month.
* The `Year` type is a utility type representing strings between 1900 - 2099.
* The `ZeroToNine` type is a utility type representing the numbers 0 - 9 as strings.
* The `OneToNine` type is a utility type representing the numbers 1 - 9 as strings.

##### NestedArray

* The `NestedArray` type is a utility type indicating a variable is an array containing another array(s).

##### NestedKeyOf

* The `NestedKeyOf` type is a utility type that is used to indicate nested objects.

##### Nilable

* The `Nilable` type is a utility type indicating that a variable can either be the specified value, `null`, *or*, `undefined`.

##### Nullable

* The `Nullable` type is a utility type indicating that a variable can be either the specified value *or* `null`, but not `undefined`.

##### NumericalString

* The `NumericalString` type is a utility type that represents a number *or* a string, and is used in instances where the value can be either or.

#### Utilities

##### ArrayUtil

* Added the `ArrayUtil` namespace, which has a bunch of utility functions related to JavaScript Arrays.
* Added the `isEmptyArray` function.
    * This function has the following signature:
        * `isEmptyArray<T>(arg: Array<T>): boolean;`
* Added the `isNotEmptyArray` function.
    * This function has the following signature:
        * `isNotEmptyArray<T>(arg: Array<T>): boolean;`

##### DateUtil

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

##### NumberUtil

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

##### ObjectUtil

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

##### ProcessUtil

* Added the `ProcessUtil` namespace, which has a bunch of utility functions relating to the node process variable.
* Added the `getEnvironment` function.
    * This function has the following signature:
        * `getEnvironment(): Environment;`
* Added the `setEnvironment` function.
    * This function has the following signatures:
        * `setEnvironment(environment: Environment): void;`
        * `setEnvironment(environmentString: string): void;`

##### StringUtil

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

##### TimeUtil

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

##### TypesUtil

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
