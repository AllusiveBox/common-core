import {
    ZnumDoesNotExist,
    ZnumMissingRequiredValue
} from "../errors";
import {
    Znumable,
    Nullable
} from "../types";
import {
    getType,
    isNotNumber,
    isNotString,
    isNullOrUndefined,
    isNumericalString,
    isString
} from "../utils/types.util";

/**
 *
 * Abstract class that mimics the behavior of TypeScript Enums.
 * <br />
 * Children classes that extend this class should have the Znum "members" as static members of the class itself.
 * It is also recommended to restrict creation of the extended Znum class so that it is not possible to create them
 * outside the intended class.
 *
 * @class Znum
 * @abstract
 * @beta
 * @since Version 0.2.0
 *
 */
export default abstract class Znum<T extends Znumable> {

    /**
     *
     * Contains the mapping data for getting a value from a {@link Znum} at the static level.
     *
     * @type {Map<Znum, Znumable>}
     * @protected
     * @since Version 0.2.0
     *
     */
    protected static ZNUM_TO_VALUE_MAP: Map<Znum<Znumable>, Znumable>;

    /**
     *
     * Map that contains data for converting an {@link Znumable} value to a {@link Znum}.
     * <br />
     * <b>Note</b>: Values that are `strings` should be stored in UPPERCASE, while values that are numbers should be
     * stored as such.
     *
     * @type {Map<Znumable, Znum>}
     * @protected
     * @since Version 0.2.0
     *
     */
    protected static VALUE_TO_ZNUM_MAP: Map<Znumable, Znum<Znumable>>;

    /**
     *
     * An array of values that the {@link Znum} supports. Anything outside this list is considered an invalid value
     * for the {@link Znum} and should be treated as such.
     *
     * @type {Array<Znum>}
     * @protected
     * @static
     * @readonly
     * @since Version 0.2.0
     *
     */
    protected static readonly SUPPORTED_ZNUMS: Array<Znum<Znumable>>;

    /**
     *
     * The type for the {@link Znum}, at a static level.
     *
     * @type {string}
     * @protected
     * @static
     * @readonly
     * @since Version 0.2.0
     *
     */
    protected static readonly TYPE: string = "Znum";

    /**
     *
     * An {@link Znumable} representation of the {@link Znum}.
     *
     * @type {Znumable}
     * @private
     * @readonly
     * @since Version 0.2.0
     *
     */
    readonly #code: Znumable;

    /**
     *
     * A unique code for the {@link Znum}, in the form of a JavaScript Symbol, based off the {@link Znum#code} value.
     *
     * @type {symbol}
     * @private
     * @readonly
     * @since Version 0.4.0
     *
     */
    readonly #symbol: symbol;

    /**
     *
     * Gets the corresponding {@link Znum} value associated with the supplied value.
     *
     * @param {unknown} value The value to get the {@link Znum} of.
     * @returns {Znum} The {@link Znum} associated with the provided {@link Znumable}.
     * @throws {ZnumDoesNotExist} If the provided `value` does not map to a valid {@link Znum} instance.
     * @since Version 0.2.0
     *
     */
    public static getZnum<T extends Znum<U>, U extends Znumable>(
        value: unknown
    ): T;

    /**
     *
     * Gets the corresponding {@link Znum} value associated with the supplied value.
     * <br />
     * If `errorIfNotFound` is set to `false`, returns `null` when a matching {@link Znum} value is not found.
     *
     * @param {unknown} value           The value to get the {@link Znum} of.
     * @param {boolean} errorIfNotFound Indicates if the logic should error if the provided `value` does not map to
     * a {@link Znum}.
     * @returns {Nullable<Znum>}
     * @throws {ZnumDoesNotExist} If the provided `value` does not map to a valid {@link Znum} when the
     * `errorIfNotFound` flag is set to `true`.
     * @since Version 0.2.0
     *
     */
    public static getZnum<T extends Znum<U>, U extends Znumable>(
        value: unknown,
        errorIfNotFound: boolean
    ): Nullable<T>

    /**
     *
     * Gets the corresponding {@link Znum} value associated with the supplied value.
     * <br />
     * If `errorIfNotFound` is set to `false`, returns `null` when a matching {@link Znum} value is not found.
     *
     * @param {Znumable} value                  The value to get the {@link Znum} of.
     * @param {boolean}  [errorIfNotFound=true] Indicates if the logic should error if the provided `value` does not
     * map to a {@link Znum}.
     * @returns {Nullable<Znum>} The {@link Znum} associated with the provided value. Can be null, if
     * `errorIfNotFound` is set to true.
     * @throws {ZnumDoesNotExist} If the provided `value` does not map to a valid {@link Znum} when the
     * `errorIfNotFound` flag is set to true.
     * @since Version 0.2.0
     *
     */
    public static getZnum<T extends Znum<U>, U extends Znumable>(
        value: Znumable,
        errorIfNotFound: boolean = true
    ): Nullable<T> {
        if (isNumericalString(value)) {
            /*
             Znumable numerical values should be stored as numbers. This casting ensures that NumericalStrings do
             not incorrectly return non-existing values.
             */
            value = Number(value);
        } else if (isString(value)) {
            /*
             Znumable string values are stored in uppercase. This casting ensures that strings do not incorrectly
             return non-existing values due to casing issues.
             */
            value = value.toUpperCase();
        }

        let Znum: Nullable<Znum<Znumable>> = this.VALUE_TO_ZNUM_MAP.get(value) || null;

        if (
            errorIfNotFound
            && isNullOrUndefined(Znum)
        ) {
            throw new ZnumDoesNotExist(
                value,
                this
            );
        }

        return Znum as T;
    }

    /**
     *
     * Gets the corresponding {@link Znumable} value associated with an {@link Znum}.
     *
     * @param {unknown} Znum The {@link Znum} to get the value of.
     * @returns {T} The {@link Znumable} in its value form.
     * @throws {ZnumDoesNotExist} If the provided `Znum` does not map to a valid {@link Znumable} value.
     * @template T
     * @since Version 0.2.0
     *
     */
    public static getValue<T extends Znumable>(
        Znum: unknown
    ): T;

    /**
     *
     * Gets the corresponding {@link Znumable} value that maps to the provided {@link Znum}.
     * <br />
     * If `errorIfNotFound` is set to `false`, returns `null` when a matching {@link Znumable} value is not found.
     *
     * @param {unknown} Znum            The {@link Znum} to get the value of.
     * @param {boolean} errorIfNotFound Indicates if the logic should error if the provided {@link Znum} does not
     * map to a {@link Znumable} value.
     * @returns {Nullable<T>} The {@link Znumable} value associated with the provided {@link Znum}, or `null`, if
     * the `errorIfNotFound` flag is set to `false`, and the {@link Znum} does not map to an {@link Znumable} value.
     * @throws {ZnumDoesNotExist} If the provided `Znum` does not map to a valid {@link Znumable} value when the
     * `errorIfNotFound` flag is set to `true`.
     * @template T
     * @since Version 0.2.0
     *
     */
    public static getValue<T extends Znumable>(
        Znum: unknown,
        errorIfNotFound: boolean
    ): Nullable<T>

    /**
     *
     * Gets the corresponding {@link Znumable} value that maps to the provided {@link Znum}.
     * <br />
     * If `errorIfNotFound` is set to `false`, returns `null` when a matching {@link Znumable} value is not found.
     *
     * @param {Znum}    Znum                   The {@link Znum} to get the value of.
     * @param {boolean} [errorIfNotFound=true] Indicates if the logic should error if the provided {@link Znum}
     * does not map to a {@link Znumable} value.
     * @returns {Nullable<Znumable>} The {@link Znumable} value associated with the provided {@link Znum}. Can be
     * null, if `errorIfNotFound` is set to true.
     * @throws {ZnumDoesNotExist} If the provided `Znum` does not map to a valid {@link Znumable} value when the
     * `errorIfNotFound` flag is set to true.
     * @since Version 0.2.0
     *
     */
    public static getValue<T extends Znumable>(
        Znum: Znum<T>,
        errorIfNotFound: boolean = true
    ): Nullable<Znumable> {
        let value: Nullable<Znumable> = this.ZNUM_TO_VALUE_MAP.get(Znum) || null;

        if (
            errorIfNotFound
            && isNullOrUndefined(value)
        ) {
            throw new ZnumDoesNotExist(
                Znum,
                this
            );
        }

        return value;
    }

    /**
     *
     * Checks to see if a provided value is a valid {@link Znum} value.
     *
     * @param {T} arg The value to check.
     * @returns {boolean}
     * @template T
     * @since Version 0.2.0
     *
     */
    public static isValid<T, U extends Znumable>(
        arg: T
    ): arg is T & Znum<U> {
        return this.isZnum(arg)
            && this.SUPPORTED_ZNUMS.includes(arg);
    }

    /**
     *
     * Checks if the provided value is a {@link Znum} instance.
     *
     * @param {unknown} arg The value the check.
     * @returns{boolean} True if the value is a {@link Znum} or child instance, otherwise false.
     * @since Version 0.4.0
     *
     */
    public static isZnum(
        arg: unknown
    ): arg is Znum<any> {
        return arg instanceof Znum;
    }

    /**
     *
     * Converts the class to a string value.
     *
     * @returns {string}
     * @since Version 0.2.0
     *
     */
    public static toString(): string {
        return this.TYPE;
    }

    /**
     *
     * Abstract constructor. Sets the {@link Znum#code}, {@link Znum#symbol}, and {@link Znum#type} fields.
     *
     * @param {T} code The code that will be converted to a Symbol.
     * @protected
     * @constructor
     * @template T
     * @since Version 0.2.0
     *
     */
    protected constructor(
        code: T
    ) {
        // Validate
        if (isNullOrUndefined(code)) {
            throw new ZnumMissingRequiredValue("code");
        } else if (
            isNotString(code)
            && isNotNumber(code)
        ) {
            throw new TypeError(`Invalid type: ${getType(code)} for field "code"; Field must be a valid `
                + "Znumable value");
        }

        /*
            Format the data to ensure uniformity.

            * All numerical codes should be stored as numbers.
            * All string codes should be stored in uppercase.
         */
        if (isNumericalString(code)) {
            this.#code = Number(code);
        } else if (isString(code)) {
            this.#code = code.toUpperCase();
        } else {
            this.#code = code;
        }

        this.#symbol = Symbol(this.#code);
        this.setZnumMap(this.#code);
    }

    /**
     *
     * Sets the {@link Znum} maps with the provided value.
     *
     * @param {Znumable} value The {@link Znumable} value to map to the {@link Znum}.
     * @returns {void}
     * @protected
     * @since Version 0.2.0
     *
     */
    protected abstract setZnumMap(
        value: Znumable
    ): void;

    /**
     *
     * Abstract method that converts a {@link Znum} instance into a standard object. Useful for testing purposes.
     *
     * @returns {object}
     * @since Version 0.5.0
     *
     */
    public abstract toJSON(): object;

    /**
     *
     * Converts the {@link Znum} to a string.
     *
     * @returns {string}
     * @since Version 0.2.0
     *
     */
    public toString(): string {
        return `${this.type}:${this.code}`;
    }

    /**
     *
     * Returns the code for the {@link Znum}.
     *
     * @returns {T}
     * @template T
     * @since Version 0.2.0
     *
     */
    get code(): T {
        return this.#code as T;
    }

    /**
     *
     * Returns the Symbol for the {@link Znum}.
     *
     * @returns{symbol}
     * @since Version 0.4.0
     *
     */
    get symbol(): symbol {
        return this.#symbol;
    }

    /**
     *
     * Returns the {@link Znum}'s type.
     *
     * @returns {string}
     * @abstract
     * @since Version 0.2.0
     *
     */
    abstract get type(): string;
}
