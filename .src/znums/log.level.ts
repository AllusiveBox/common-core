import Znum from "./znum";

/**
 *
 * Znum class used to represent the concept of a log level.
 * <br />
 * Intended to be used alongside a class that extends the {@link ILoggerService} interface.
 *
 * @class LogLevel
 * @extends Znum
 * @since Version 0.5.0
 *
 */
export default class LogLevel extends Znum<string> {

    /**
     *
     * Contains the mapping data for getting a value from an {@link LogLevel} at the static level.
     *
     * @type {Map<LogLevel, string>}
     * @static
     * @override
     * @readonly
     * @since Version 0.5.0
     *
     */
    public static override readonly ZNUM_TO_VALUE_MAP: Map<LogLevel, string> = new Map<LogLevel, string>();

    /**
     *
     * Contains the mapping data for getting a {@link LogLevel} from a value at the static level.
     *
     * @type {Map<string, LogLevel>}
     * @static
     * @override
     * @readonly
     * @since Version 0.5.0
     *
     */
    public static override readonly VALUE_TO_ZNUM_MAP: Map<string, LogLevel> = new Map<string, LogLevel>();

    /**
     *
     * Contains the mapping data for getting a {@link LogLevel} from a number value at the static level.
     *
     * @type {Map<number, LogLevel>}
     * @static
     * @override
     * @readonly
     * @since Version 0.5.0
     * 
     */
    public static readonly NUMBER_TO_ZNUM_MAP: Map<number, LogLevel> = new Map<number, LogLevel>();

    /**
     *
     * Log level used for fatal errors that will result in the application needing to terminate.
     *
     * @type {LogLevel}
     * @since Version 0.5.0
     *
     */
    public static readonly FATAL: LogLevel = new LogLevel("Fatal", 0);

    /**
     *
     * Log level used for non-fatal errors.
     *
     * @type {LogLevel}
     * @since Version 0.5.0
     *
     */
    public static readonly ERROR: LogLevel = new LogLevel("Error", 1);

    /**
     *
     * Log level used to report warnings.
     *
     * @type {LogLevel}
     * @since Version 0.5.0
     *
     */
    public static readonly WARN: LogLevel = new LogLevel("Warn", 2);

    /**
     *
     * Log level used for general purpose logging.
     *
     * @type {LogLevel}
     * @since Version 0.5.0
     *
     */
    public static readonly INFO: LogLevel = new LogLevel("Info", 3);

    /**
     *
     * Log level used for more verbose logging details that would not belong in a {@link LogLevel#INFO} level log
     * message.
     *
     * @type {LogLevel}
     * @since Version 0.5.0
     *
     */
    public static readonly VERBOSE: LogLevel = new LogLevel("Verbose", 4);

    /**
     *
     * Log level used for low-level debug log messages.
     * <br />
     * <b>Note</b>: It is not advised to use this in a production system.
     *
     * @type {LogLevel}
     * @since Version 0.5.0
     *
     */
    public static readonly DEBUG: LogLevel = new LogLevel("Debug", 5);

    /**
     *
     * An Array of all the supported {@link LogLevel} {@link Znum}s.
     *
     * @type {Array<LogLevel>}
     * @static
     * @override
     * @readonly
     * @since Version 0.5.0
     *
     */
    public static override readonly SUPPORTED_ZNUMS: Array<LogLevel> = [
        LogLevel.FATAL,
        LogLevel.ERROR,
        LogLevel.WARN,
        LogLevel.INFO,
        LogLevel.VERBOSE,
        LogLevel.DEBUG
    ];

    /**
     *
     * The type for the {@link LogLevel} {@link Znum}, at the static level.
     *
     * @type {string}
     * @static
     * @override
     * @readonly
     * @since Version 0.5.0
     *
     */
    public static override readonly TYPE: string = "LogLevel"

    /**
     *
     * The numerical value for the log level. Used to indicate priority.
     *
     * @type {number}
     * @private
     * @readonly
     *
     */
    readonly #logValue: number;

    /**
     *
     * Gets the corresponding {@link LogLevel} associated with the supplied value.
     * <br />
     * Alias for {@link LogLevel#getZnum}.
     *
     * @param {unknown} value The value to get the {@link LogLevel} of.
     * @returns {LogLevel} The value in its {@link LogLevel} form.
     * @static
     * @throws {ZnumDoesNotExist} If the provided `value` does not map to a valid {@link Znum} instance.
     * @see LogLevel#getZnum
     * @since Version 0.5.0
     *
     */
    public static getLogLevel(
        value: unknown
    ): LogLevel {
        if (LogLevel.isLogLevel(value)) {
            return value;
        }

        return this.getZnum(value);
    }

    /**
     *
     * Checks if the provided value is a {@link LogLevel} instance.
     *
     * @param {unknown} arg The value to check.
     * @returns {boolean} True if the value is a {@link LogLevel}, otherwise false.
     * @since Version 0.5.0
     *
     */
    public static isLogLevel(
        arg: unknown
    ): arg is LogLevel {
        return arg instanceof LogLevel;
    }

    /**
     *
     * Creates a new {@link LogLevel} instance.
     *
     * @param {string} logLevel A string value that represents the instance.
     * @param {number} logValue A numerical value that represents the instance.
     * @private
     * @constructor
     * @since Version 0.5.0
     *
     */
    private constructor(
        logLevel: string,
        logValue: number
    ) {
        super(logLevel);

        this.#logValue = logValue;

        // Numerical mapping unique to LogLevels
        LogLevel.NUMBER_TO_ZNUM_MAP.set(
            logValue,
            this
        );
    }

    /**
     *
     * Sets the {@link LogLevel} maps with the provided key value pair.
     *
     * @param {string} value  The string value to be mapped with the {@link LogLevel} instance.
     * @param {number} value The numerical value to be mapped with the {@link LogLevel} instance.
     * @protected
     * @since Version 0.5.0
     *
     */
    protected setZnumMap(
        value: string
    ): void {
        // Standard Znum mapping
        LogLevel.ZNUM_TO_VALUE_MAP.set(
            this,
            value
        );
        LogLevel.VALUE_TO_ZNUM_MAP.set(
            value,
            this
        );
    }

    /**
     *
     * Converts the {@link LogLevel} instance into a standard JavaScript object.
     *
     * @returns {{code: string, value: number, type: string, symbol: symbol}}
     * @since Version 0.5.0
     * 
     */
    public toJSON(): { code: string, value: number, type: string, symbol: symbol } {
        return {
            code: this.code,
            value: this.logValue,
            type: this.type,
            symbol: this.symbol
        };
    }

    /**
     *
     * Converts the {@link LogLevel} into a numerical form.
     *
     * @returns {number}
     * @since Version 0.5.0
     *
     */
    public override valueOf(): number {
        return this.logValue;
    }

    /**
     *
     * Indicates if the value is {@link LogLevel#FATAL}.
     *
     * @returns {boolean} True if {@link LogLevel#FATAL}, otherwise false.
     * @since Version 0.5.0
     *
     */
    public isFatal(): boolean {
        return this === LogLevel.FATAL;
    }

    /**
     *
     * Indicates if the value is {@link LogLevel#ERROR}.
     *
     * @returns {boolean} True if {@link LogLevel#ERROR}, otherwise false.
     * @since Version 0.5.0
     *
     */
    public isError(): boolean {
        return this === LogLevel.ERROR;
    }

    /**
     *
     * Indicates if the value is {@link LogLevel#WARN}.
     *
     * @returns {boolean} True if {@link LogLevel#WARN}, otherwise false.
     * @since Version 0.5.0
     *
     */
    public isWarning(): boolean {
        return this === LogLevel.WARN;
    }

    /**
     *
     * Indicates if the value is {@link LogLevel#INFO}.
     *
     * @returns {boolean} True if {@link LogLevel#INFO}, otherwise false.
     * @since Version 0.5.0
     *
     */
    public isInfo(): boolean {
        return this === LogLevel.INFO;
    }

    /**
     *
     * Indicates if the value is {@link LogLevel#VERBOSE}.
     *
     * @returns {boolean} True if {@link LogLevel#VERBOSE}, otherwise false.
     * @since Version 0.5.0
     *
     */
    public isVerbose(): boolean {
        return this === LogLevel.VERBOSE;
    }

    /**
     *
     * Indicates if the value is {@link LogLevel#DEBUG}.
     *
     * @returns {boolean} True if {@link LogLevel#DEBUG}, otherwise false.
     * @since Version 0.5.0
     * 
     */
    public isDebug(): boolean {
        return this === LogLevel.DEBUG;
    }

    get logValue(): number {
        return this.#logValue;
    }

    /**
     *
     * Returns the {@link LogLevel}'s type, as a string.
     *
     * @returns {string}
     * @since Version 0.5.0
     *
     */
    get type(): string {
        return "LogLevel";
    }

}