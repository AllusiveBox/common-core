import {
    ExtendedErrorOptions,
    Maybe
} from "../types";
import {
    isFunction,
    isNotNullOrUndefined,
    isString
} from "../utils/types.util";

/**
 *
 * A customer Error class that extends the base JavaScript Error object with additional functionality.
 *
 * @class ExtendedError
 * @extends Error
 * @abstract
 * @since Version 0.4.0
 *
 */
export default abstract class ExtendedError<T extends object = never> extends Error {

    /**
     *
     * Additional context associated with the Error message.
     *
     * @type {Maybe<T>>}
     * @private
     * @template T
     * @since Version 0.4.0
     *
     */
    readonly #context: Maybe<T>;

    /**
     *
     * Abstract constructor for new {@link ExtendedError} instance.
     *
     * @param {string} message The message to report alongside the error.
     * @protected
     * @constructor
     * @since Version 0.4.0
     *
     */
    protected constructor(
        message: string
    );

    /**
     *
     * Abstract constructor for new {@link ExtendedError} instance. Sets the additional error options to the
     * provided values to provide additional details.
     *
     * @param {string}                message      The message to report alongside the Error.
     * @param {?ExtendedErrorOptions} [options={}] Additional options to include alongside the Error message.
     * @protected
     * @constructor
     * @since Version 0.4.0
     *
     */
    protected constructor(
        message: string,
        options?: ExtendedErrorOptions<T>
    );

    /**
     *
     * Abstract constructor for new {@link ExtendedError} instance. Sets the additional error options to the
     * provided values to provide additional details.
     *
     * @param {string}               message The message to report alongside the Error.
     * @param {ExtendedErrorOptions} options Additional options to include alongside the Error message.
     * @protected
     * @constructor
     * @since Version 0.4.0
     *
     */
    protected constructor(
        message: string,
        options: ExtendedErrorOptions<T>
    );

    protected constructor(
        message: string,
        options: ExtendedErrorOptions<T> = {}
    ) {
        super(
            message,
            { cause: options.cause }
        );
        this.name = this.constructor.name;
        this.#context = options.context;

        if (
            isString(this.cause)
            && options.wrapCause
        ) {
            const error: Error = new Error(this.cause);
            this.cause = error;
            Error.captureStackTrace(
                error,
                Error
            );
        }

        if (
            isNotNullOrUndefined(Error.captureStackTrace)
            && isFunction(Error.captureStackTrace)
        ) {
            Error.captureStackTrace(
                this,
                this.constructor
            );
        }
    }

    /**
     *
     * Additional context that was provided when the error was thrown.
     *
     * @returns{Maybe<T>}
     * @template T
     * @since Version 0.4.0
     *
     */
    get context(): Maybe<T> {
        return this.#context;
    }

}