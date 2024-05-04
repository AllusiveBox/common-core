import ExtendedError from "./extended.error";

/**
 *
 * An Error thrown when a value is either `null` or `undefined` and shouldn't be.
 *
 * @class NilError
 * @extends ExtendedError
 * @since Version 0.1.0
 *
 */
export default class NilError<T extends object> extends ExtendedError<T> {

    /**
     *
     * Creates a NilError instance.
     *
     * @constructor
     * @since Version 0.1.0
     *
     */
    constructor();

    /**
     *
     * Creates a NilError instance and specifies what caused the error.
     *
     * @param {string} message The message to report alongside the Error.
     * @constructor
     * @since Version 0.1.0
     *
     */
    constructor(
        message: string
    );

    /**
     *
     * Creates a NilError instance and specifies what caused the error and provides some additional context for the
     * Error.
     *
     * @param {string} message The message to report alongside the Error.
     * @param {T}      context The additional context to go with the Error.
     * @constructor
     * @since Version 0.4.0
     *
     */
    constructor(
        message: string,
        context: T
    );

    /**
     *
     * Creates a NilError instance.
     *
     * @param {string} message
     * @param {T}      context
     * @constructor
     * @template T
     * @since Version 0.1.0
     *
     */
    constructor(
        message?: string,
        context?: T
    ) {
        const cause: string = "Null or undefined value";
        const errorMessage: string = message || cause;
        super(
            errorMessage,
            {
                cause: "Null or undefined value",
                context: context
            }
        );
    }

}


