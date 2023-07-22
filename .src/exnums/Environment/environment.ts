import { EXnum } from "../EXnum";
import { EXnumable } from "../../types";

/**
 *
 * EXnum class used to represent application environments that an application can run in.
 *
 * @class Environment
 * @extends EXnum
 * @beta
 * @since Version 0.2.0
 *
 */
export default class Environment extends EXnum {

    /**
     *
     * Map that contains data for converting an Environment to an EXnumable value.
     *
     * @type {Map<Environment, string>}
     * @protected
     * @since Version 0.2.0
     *
     */
    protected static EXNUM_TO_VALUE_MAP: Map<Environment, string> = new Map<Environment, string>();

    /**
     *
     * Map that contains data for converting an EnvironmentEXnumable to a EXnum.
     *
     * @type {Map<string, Environment>}
     * @protected
     * @since Version 0.2.0
     *
     */
    protected static VALUE_TO_EXNUM_MAP: Map<string, Environment> = new Map<string, Environment>();

    /**
     *
     * Environment EXnum used to indicate a production environment.
     *
     * @type {Environment}
     * @public
     * @static
     * @since Version 0.2.0
     *
     */
    public static PRODUCTION: Environment = new Environment("PRODUCTION");

    /**
     *
     * Environment EXnum used to indicate a development environment that is <em>not</em> a local environment.
     *
     * @type {Environment}
     * @public
     * @static
     * @since Version 0.2.0
     *
     */
    public static DEVELOPMENT: Environment = new Environment("DEVELOPMENT");

    /**
     *
     * Environment EXnum used to indicate a development environment that is <em>local only</em>.
     *
     * @type {Environment}
     * @public
     * @static
     * @since Version 0.2.0
     *
     */
    public static LOCAL: Environment = new Environment("LOCAL");

    /**
     *
     * Environment EXnum used to indicate a test environment.
     *
     * @type {Environment}
     * @public
     * @static
     * @since Version 0.2.0
     *
     */
    public static TEST: Environment = new Environment("TEST");

    /**
     *
     * Environment EXnum used to indicate an unknown environment.
     *
     * @type {Environment}
     * @public
     * @static
     * @since Version 0.2.0
     *
     */
    public static UNKNOWN: Environment = new Environment("UNKNOWN");

    /**
     *
     * An array of Environments that the Environment EXnum supports.
     *
     * @type {Array<EXnum>}
     * @protected
     * @static
     * @readonly
     * @since Version 0.2.0
     *
     */
    protected static readonly SUPPORTED_EXNUMS: Array<EXnum> = [
        Environment.PRODUCTION,
        Environment.DEVELOPMENT,
        Environment.LOCAL,
        Environment.TEST,
        Environment.UNKNOWN
    ];

    /**
     *
     * An array of Environment EXnums that should support debug level logging.
     *
     * @type {Array<Environment>}
     * @protected
     * @static
     * @readonly
     *
     */
    protected static readonly SUPPORTS_DEBUG: Array<Environment> = [
        Environment.LOCAL,
        Environment.TEST,
        Environment.UNKNOWN
    ];

    /**
     *
     * The type for the Environment EXNum, at a static level.
     *
     * @type {string}
     * @protected
     * @static
     * @readonly
     * @since Version 0.2.0
     *
     */
    protected static readonly TYPE: string = "Environment";

    /**
     *
     * Gets the corresponding Environment value associated with the supplied EXnumable value. If no associated
     * Environment EXnum can be found, {@link Environment.UNKNOWN} is returned.
     * <br />
     * Alias for the {@link EXnum.getEXnum} method with the `errorIfNotFound` flag set to false.
     *
     * @param {EXnumable} value The value to get the Environment of.
     * @returns {Environment} The Environment associated with the EXnumable value.
     * @override
     * @since Version 0.2.0
     *
     */
    public static getEnvironment(
        value: string
    ): Environment {
        return this.getEXnum(
            value,
            false
        ) || Environment.UNKNOWN;
    }

    /**
     *
     * Gets the corresponding EXnumable value that maps to the provided Environment.
     *
     * @param {Environment} environment the environment to use to get the EXnumable value.
     * @returns {string} The string value associated with the provided Environment.
     * @override
     * @since Version 0.2.0
     *
     */
    public static override getValue(
        environment: Environment
    ): string {
        return this.EXNUM_TO_VALUE_MAP.get(environment) || "UNKNOWN";
    }

    /**
     *
     * Creates an instance of the Environment EXnum.
     *
     * @param {EXnumable} code The code that represents the Environment EXnum.
     * @private
     * @constructor
     * @since Version 0.2.0
     *
     */
    private constructor(
        code: EXnumable
    ) {
        super(
            code,
            "Environment"
        );
    }

    /**
     *
     * Sets the Environment EXnum maps with the provided value.
     *
     * @param {string} value The EXnumable value to map to the EXnum.
     * @returns {void}
     * @protected
     * @since Version 0.2.0
     *
     */
    protected setEXnumMap(
        value: string
    ): void {
        Environment.EXNUM_TO_VALUE_MAP.set(
            this,
            value
        );
        Environment.VALUE_TO_EXNUM_MAP.set(
            value,
            this
        );
    }

    /**
     *
     * Indicates if the Environment is {@link Environment.DEVELOPMENT}.
     *
     * @returns {boolean}
     * @since Version 0.2.0
     *
     */
    public isDevelopment(): boolean {
        return this === Environment.DEVELOPMENT;
    }

    /**
     *
     * Indicates if the Environment is {@link Environment.LOCAL}
     *
     * @returns {boolean}
     * @since Version 0.2.0
     *
     */
    public isLocal(): boolean {
        return this === Environment.LOCAL;
    }

    /**
     *
     * Indicates if the Environment is {@link Environment.PRODUCTION}
     *
     * @returns {boolean}
     * @since Version 0.2.0
     *
     */
    public isProduction(): boolean {
        return this === Environment.PRODUCTION;
    }

    /**
     *
     * Indicates if the Environment is {@link Environment.TEST}
     *
     * @returns {boolean}
     * @since Version 0.2.0
     *
     */
    public isTest(): boolean {
        return this === Environment.TEST;
    }

    /**
     *
     * Indicates if the Environment is {@link Environment.UNKNOWN}
     *
     * @returns {boolean}
     * @since Version 0.2.0
     *
     */
    public isUnknown(): boolean {
        return this === Environment.UNKNOWN;
    }

    /**
     *
     * Indicates if the Environment is configured to support debug logging.
     *
     * @returns {boolean}
     * @since Version 0.2.0
     *
     */
    public supportsDebug(): boolean {
        return Environment.SUPPORTS_DEBUG.includes(this);
    }

}
