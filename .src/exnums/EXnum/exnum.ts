import {
    EXnumDoesNotExist,
    EXnumMissingRequiredValue
} from "./errors"
import {
    EXnumable,
    Nullable
} from "../../types";
import {
    isNotNumber,
    isNotString,
    isNullOrUndefined,
    isString
} from "../../utils/types.util";

/**
 *
 * Abstract class that mimics the behavior of TypeScript Enums.
 * <br />
 * Children classes that extend the EXnum class should have the EXnum "members" as static members of the class itself.
 * It is also recommended to restrict creation of the extended EXnum class so that it is not possible to create them
 * outside the intended class.
 *
 * @class EXnum
 * @abstract
 * @beta
 * @since Version 0.2.0
 *
 */
export default abstract class EXnum {

    /**
     *
     * Map that contains data for converting a EXnum to a Xnumable value.
     *
     * @type {Map<EXnum, EXnumable>}
     * @protected
     * @since Version 0.2.0
     *
     */
    protected static EXNUM_TO_VALUE_MAP: Map<EXnum, EXnumable>;

    /**
     *
     * Map that contains data for converting a Xnumable value to a EXnum.
     *
     * @type {Map<EXnumable, EXnum>}
     * @protected
     * @since Version 0.2.0
     *
     */
    protected static VALUE_TO_EXNUM_MAP: Map<EXnumable, EXnum>;

    /**
     *
     * An array of values that the EXnum supports. Anything outside this list is considered an invalid value for the
     * EXnum and should be treated as such.
     *
     * @type {Array<EXnum>}
     * @protected
     * @static
     * @readonly
     * @since Version 0.2.0
     *
     */
    protected static readonly SUPPORTED_EXNUMS: Array<EXnum>;

    /**
     *
     * The type for the EXnum, at a static level.
     *
     * @type {string}
     * @protected
     * @static
     * @readonly
     * @since Version 0.2.0
     *
     */
    protected static readonly TYPE: string = "EXnum";

    /**
     *
     * A unique code for the EXnum, in the form of a JavaScript Symbol.
     *
     * @type {symbol}
     * @private
     * @readonly
     * @since Version 0.2.0
     *
     */
    readonly #code: symbol;

    /**
     *
     * A string representing the type for the EXnum. This should almost always be the same value as what is stored in
     * the static type.
     *
     * @type {string}
     * @private
     * @readonly
     * @since Version 0.2.0
     *
     */
    readonly #type: string;

    /**
     *
     * Gets the corresponding EXnum value associated with the supplied value.
     *
     * @param {EXnumable} value The Xnumable to use to get the EXnum.
     * @returns {EXnum} The EXnum associated with the provided Xnumable.
     * @throws {EXnumDoesNotExist} If the provided `value` does not map to a valid EXnum.
     * @since Version 0.2.0
     *
     */
    public static getEXnum<T extends EXnum>(
        value: EXnumable
    ): T;

    /**
     *
     * Gets the corresponding EXnum value associated with the supplied value. If `errorIfNotFound` is set to `false`,
     * this can return `null`, otherwise an error is thrown.
     *
     * @param {EXnumable} value           The Xnumable to use to get the EXnum.
     * @param {boolean}  errorIfNotFound Indicates if the logic should error if the provided Xnumable does not map
     * to a EXnum.
     * @returns {Nullable<EXnum>}
     * @throws {EXnumDoesNotExist} If the provided `value` does not map to a valid EXnum when the `errorIfNotFound`
     * flag is set to `true`.
     * @since Version 0.2.0
     *
     */
    public static getEXnum<T extends EXnum>(
        value: EXnumable,
        errorIfNotFound: boolean
    ): Nullable<T>

    /**
     *
     * Gets the corresponding EXnum value associated with the supplied value. If `errorIfNotFound` is set to `false`,
     * this can return `null`, otherwise an error is thrown.
     *
     * @param {EXnumable} value                  The value to get the EXnum of.
     * @param {boolean}  [errorIfNotFound=true] Indicates if the logic should error if the provided EXnum does not map
     * to a Xnumable value.
     * @returns {Nullable<EXnum>} The EXnum associated with the provided value. Can be null, if `errorIfNotFound` is
     * set to true.
     * @throws {EXnumDoesNotExist} If the provided `value` does not map to a valid EXnum when the `errorIfNotFound`
     * flag is set to true.
     * @since Version 0.2.0
     *
     */
    public static getEXnum<T extends EXnum>(
        value: EXnumable,
        errorIfNotFound: boolean = true
    ): Nullable<T> {
        // EXnumable values are stored in uppercase when strings, so this needs to account for that
        if (isString(value)) {
            value = value.toUpperCase();
        }

        let exnum: Nullable<EXnum> = this.VALUE_TO_EXNUM_MAP.get(value) || null;

        if ((errorIfNotFound)
            && (isNullOrUndefined(exnum))) {

            throw new EXnumDoesNotExist(
                value,
                this
            );
        }

        return exnum as T;
    }

    /**
     *
     * Gets the corresponding EXnumable value that maps to the provided EXnum.
     *
     * @param {EXnum} exnum The EXnum to use to get the EXnumable value.
     * @returns {EXnumable} The EXnumable value associated with the provided EXnum.
     * @throws {EXnumDoesNotExist} If the provided `exnum` does not map to a valid Xnumable value.
     * @since Version 0.2.0
     *
     */
    public static getValue(
        exnum: EXnum
    ): EXnumable;

    /**
     *
     * Gets the corresponding Xnumable value that maps to the provided EXnum. If `errorIfNotFound` is set to `false`,
     * this can return `null`, otherwise an error is thrown.
     *
     * @param {EXnum}    exnum            The EXnum to use to get the Xnumable value.
     * @param {boolean} errorIfNotFound Indicates if the logic should error if the provided EXnum does not map to a
     * Xnumable value.
     * @returns {Nullable<EXnumable>} The Xnumable value associated with the provided EXnum, or `null`, if the
     * `errorIfNotFound` flag is set to `false`, and the EXnum does not map to a Xnumable value.
     * @throws {EXnumDoesNotExist} If the provided `exnum` does not map to a valid Xnumable value when the
     * `errorIfNotFound` flag is set to `true`.
     * @since Version 0.2.0
     *
     */
    public static getValue(
        exnum: EXnum,
        errorIfNotFound: boolean
    ): Nullable<EXnumable>

    /**
     *
     * Gets the corresponding Xnumable value that maps to the provided EXnum. If `errorIfNotFound` is set to `false`,
     * this can return `null`, otherwise an error is thrown.
     * @param {EXnum}    exnum                   The EXnum to convert to a Xnumable value.
     * @param {boolean} [errorIfNotFound=true] Indicates if the logic should error if the provided EXnum does not map
     * to a Xnumable value.
     * @returns {Nullable<EXnumable>} The Xnumable value associated with the provided EXnum. Can be null, if
     * `errorIfNotFound` is set to true.
     * @throws {EXnumDoesNotExist} If the provided `exnum` does not map to a valid `Xnumable` value when the
     * `errorIfNotFound` flag is set to true.
     * @since Version 0.2.0
     *
     */
    public static getValue(
        exnum: EXnum,
        errorIfNotFound: boolean = true
    ): Nullable<EXnumable> {
        let value: Nullable<EXnumable> = this.EXNUM_TO_VALUE_MAP.get(exnum) || null;

        if ((errorIfNotFound)
            && (isNullOrUndefined(value))) {

            throw new EXnumDoesNotExist(
                exnum,
                this
            );
        }

        return value;
    }

    /**
     *
     * Checks to see if a provided value is a valid EXnum value.
     *
     * @param {T} arg
     * @returns {boolean}
     * @template T
     * @since Version 0.2.0
     *
     */
    public static isValid<T>(
        arg: T
    ): arg is T & EXnum {
        return ((arg instanceof this)
            && (this.SUPPORTED_EXNUMS.includes(arg)));
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
        return this.TYPE
    }

    /**
     *
     * Abstract constructor. Sets the code and type fields for the EXnum.
     *
     * @param {EXnumable} code The code that will be converted to a Symbol.
     * @param {string}    type A string representing the type of EXnum.
     * @protected
     * @constructor
     * @since Version 0.2.0
     *
     */
    protected constructor(
        code: EXnumable,
        type: string
    ) {
        // Validate
        if (isNullOrUndefined(code)) {

            throw new EXnumMissingRequiredValue(
                "code",
                this
            );
        } else if ((isNotString(code))
            && (isNotNumber(code))) {

            throw new TypeError(`Invalid type: ${typeof code} for field "code"; Field must be a valid Xnumable value`);
        }

        if (isNullOrUndefined(type)) {
            throw new EXnumMissingRequiredValue(
                "type",
                this
            );
        } else if (isNotString(type)) {
            throw new TypeError(`Invalid type: ${typeof type} for field "type"; Field must be a string`);
        }

        /*
            Format the data to ensure uniformity.

            * All codes should be stored in uppercase.
            * All types should be stored as capital first letter and the rest lowercase.
         */
        if (isString(code)) {
            code = code.toUpperCase();
        }

        this.#code = Symbol(code);
        // todo: zakauff 10/21/2022 Capitalize first letter only
        this.#type = type.toLowerCase();

        this.setEXnumMap(code);
    }

    /**
     *
     * Sets the EXnum maps with the provided value.
     *
     * @param {EXnumable} value The EXnumable value to map to the EXnum.
     * @returns {void}
     * @protected
     * @since Version 0.2.0
     *
     */
    protected abstract setEXnumMap(
        value: EXnumable
    ): void;

    /**
     *
     * Converts the EXnum to a string.
     *
     * @returns {string}
     * @since Version 0.2.0
     *
     */
    public toString(): string {
        return `${this.type}:${String(this.code)}`
    }

    /**
     *
     * Returns the code for the EXnum.
     *
     * @returns {symbol}
     * @since Version 0.2.0
     *
     */
    get code(): symbol {
        return this.#code;
    }

    /**
     *
     * Returns the EXnum's type.
     *
     * @returns {string}
     * @since Version 0.2.0
     *
     */
    get type(): string {
        return this.#type;
    }

}
