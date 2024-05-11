import { Nullable } from "../types";
import { isString } from "../utils/types.util";
import Znum from "./znum";

/**
 *
 * Znum class used to represent an application environment.
 * <br />
 * Intended to be a bridge to safely access, and determine, a processes Environment by wrapping around the
 * {@link NodeJS#ProcessEnv#NODE_ENV} property.
 *
 * @class Environment
 * @extends Znum
 * @since Version 0.4.0
 *
 */
export default class Environment extends Znum<string> {

    /**
     *
     * An array of additional values that should map to {@link Environment#PRODUCTION}.
     *
     * @type {Array<string>}
     * @private
     * @static
     * @readonly
     *
     */
    static readonly #PRODUCTION_ALIASES: Array<string> = [
        "PROD",
        "LIVE"
    ];

    /**
     *
     * An array of additional values that should map to {@link Environment#DEVELOPMENT}.
     *
     * @type {Array<string>}
     * @private
     * @static
     * @readonly
     *
     */
    static readonly #DEVELOPMENT_ALIASES: Array<string> = [
        "DEV"
    ];

    /**
     *
     * Contains the mapping data for getting a value from an {@link Environment} at the static level.
     *
     * @type {Map<Environment, string>}
     * @protected
     * @static
     * @override
     * @readonly
     * @since Version 0.4.0
     *
     */
    protected static override readonly ZNUM_TO_VALUE_MAP: Map<Environment, string> = new Map<Environment, string>();

    /**
     *
     * Contains the mapping data for getting an {@link Environment} from a value at the static level.
     *
     * @type {Map<string, Environment>}
     * @protected
     * @static
     * @override
     * @readonly
     * @since Version 0.4.0
     *
     */
    protected static override readonly VALUE_TO_ZNUM_MAP: Map<string, Environment> = new Map<string, Environment>();

    /**
     *
     * Environment Znum to represent production environments.
     *
     * @type {Environment}
     * @static
     * @readonly
     * @since Version 0.4.0
     *
     */
    public static PRODUCTION: Environment = new Environment("PRODUCTION");

    /**
     *
     * Environment Znum to represent UAT / Staging environments.
     *
     * @type {Environment}
     * @static
     * @readonly
     * @since Version 0.4.0
     *
     */
    public static UAT: Environment = new Environment("UAT");

    /**
     *
     * Environment Znum to represent development environments.
     *
     * @type {Environment}
     * @static
     * @readonly
     * @since Version 0.4.0
     *
     */
    public static DEVELOPMENT: Environment = new Environment("DEVELOPMENT");

    /**
     *
     * Environment Znum to represent local environments.
     *
     * @type {Environment}
     * @static
     * @readonly
     * @since Version 0.4.0
     *
     */
    public static LOCAL: Environment = new Environment("LOCAL");

    /**
     *
     * Environment Znum to represent testing environments.
     *
     * @type {Environment}
     * @static
     * @readonly
     * @since Version 0.4.0
     *
     */
    public static TEST: Environment = new Environment("TEST");

    /**
     *
     * Environment Znum to represent an unknown and non-supported {@link Environment} type.
     *
     * @type {Environment}
     * @static
     * @readonly
     * @since Version 0.4.0
     *
     */
    public static UNKNOWN: Environment = new Environment("UNKNOWN");

    /**
     *
     * An array of all the supported {@link Environment} znums.
     *
     * @type {Array<Environment>}
     * @protected
     * @static
     * @override
     * @readonly
     * @since Version 0.4.0
     *
     */
    public static override readonly SUPPORTED_ZNUMS: Array<Environment> = [
        Environment.PRODUCTION,
        Environment.UAT,
        Environment.DEVELOPMENT,
        Environment.LOCAL,
        Environment.TEST,
        Environment.UNKNOWN
    ];

    /**
     *
     * The type for the {@link Environment} Znum, at a static level.
     *
     * @type {string}
     * @protected
     * @static
     * @override
     * @readonly
     * @since Version 0.4.0
     *
     */
    protected static override readonly TYPE: string = "Environment";

    /**
     *
     * Performs alias checking against the provided value.
     *
     * @param {unknown} value The value to alias check against.
     * @returns{unknown} The results from the alias check.
     * @private
     * @since Version 0.4.0
     *
     */
    static #aliasCheck(
        value: unknown
    ): unknown {
        if (isString(value)) {
            let temp: string = value.toUpperCase();
            if (this.#PRODUCTION_ALIASES.includes(temp)) {
                temp =  "production";
            } else if (this.#DEVELOPMENT_ALIASES.includes(temp)) {
                temp = "development"
            }

            return temp;
        }

        return value;
    }

    /**
     *
     * Gets the corresponding {@link Environment} value associated with the supplied value.
     *
     * @param {unknown} value The value to get the {@link Environment} of.
     * @returns{Environment} The value in its {@link Environment} form.
     * @static
     * @since Version 0.4.0
     *
     */
    public static getEnvironment(
        value: unknown
    ): Environment {
        if (Environment.isEnvironment(value)) {
            return value;
        }
        let environment: Nullable<Environment> = this.getZnum(
            this.#aliasCheck(value),
            false
        );

        return environment || Environment.UNKNOWN;
    }

    /**
     *
     * Gets the corresponding value associated with an {@link Environment}
     *
     * @param {unknown} environment The {@link Environment} to get the value of.
     * @returns{string} The {@link Environment} in its value form.
     * @static
     * @since Version 0.4.0
     *
     */
    public static override getValue(
        environment: unknown
    ): string {
        let value: Nullable<string> = super.getValue<string>(
            environment,
            false
        ) || null;

        return value || Environment.UNKNOWN.code as string;
    }

    /**
     *
     * Checks if the provided value is an {@link Environment} instance.
     *
     * @param {unknown} arg The value the check.
     * @returns{boolean} True if the value is an {@link Environment}, otherwise false.
     * @since Version 0.4.0
     *
     */
    public static isEnvironment(
        arg: unknown
    ): arg is Environment {
        return arg instanceof Environment;
    }

    /**
     *
     * Creates an Environment instance.
     *
     * @param {string} code A string value that represents the instance.
     * @private
     * @constructor
     * @since Version 0.4.0
     *
     */
    private constructor(
        code: string
    ) {
        super(code);
    }

    /**
     *
     * Sets the {@link Environment} maps with the provided key value pair.
     *
     * @param {string} value The string value to be mapped with the {@link Environment} instance.
     * @protected
     * @since Version 0.4.0
     *
     */
    protected setZnumMap(
        value: string
    ): void {
        Environment.ZNUM_TO_VALUE_MAP.set(
            this,
            value
        );
        Environment.VALUE_TO_ZNUM_MAP.set(
            value,
            this
        );
    }

    /**
     *
     * Indicates if the {@link Environment} is {@link Environment#DEVELOPMENT}.
     *
     * @returns{boolean}
     * @since Version 0.4.0
     *
     */
    public isDevelopment(): boolean {
        return this === Environment.DEVELOPMENT;
    }

    /**
     *
     * Indicates if the {@link Environment} is {@link Environment#LOCAL}.
     *
     * @returns{boolean}
     * @since Version 0.4.0
     *
     */
    public isLocal(): boolean {
        return this === Environment.LOCAL;
    }

    /**
     *
     * Indicates if the {@link Environment} is {@link Environment#PRODUCTION}.
     *
     * @returns{boolean}
     * @since Version 0.4.0
     *
     */
    public isProduction(): boolean {
        return this === Environment.PRODUCTION;
    }

    /**
     *
     * Indicates if the {@link Environment} is {@link Environment#TEST}.
     *
     * @returns{boolean}
     * @since Version 0.4.0
     *
     */
    public isTest(): boolean {
        return this === Environment.TEST;
    }

    /**
     *
     * Indicates if the {@link Environment} is {@link Environment#UAT}.
     *
     * @returns{boolean}
     * @since Version 0.4.0
     *
     */
    public isUat(): boolean {
        return this === Environment.UAT;
    }

    /**
     *
     * Indicates if the {@link Environment} is {@link Environment#UNKNOWN}.
     *
     * @returns{boolean}
     * @since Version 0.4.0
     *
     */
    public isUnknown(): boolean {
        return this === Environment.UNKNOWN
    }

    /**
     *
     * Returns the {@link Environment}'s type, as a string.
     *
     * @returns{string}
     * @since Version 0.4.0
     *
     */
    get type(): string {
        return "Environment";
    }

}