/**
 *
 * Configuration options for an {@link ExtendedError} instance.
 *
 * @interface ExtendedErrorOptions
 * @since Version 0.4.0
 *
 */
export interface ExtendedErrorOptions<T extends object = never> {

    /**
     *
     * The cause of the {@link ExtendedError}.
     *
     * @type {?(Error | string)}
     * @since Version 0.4.0
     *
     */
    cause?: (Error | string);

    /**
     *
     * Additional context to be passed along to the error.
     *
     * @type {?T}
     * @template T
     * @since Version 0.4.0
     *
     */
    context?: T;

    /**
     *
     * Flag indicating if the provided {@link ExtendedErrorOptions#cause} should be wrapped in an Error object if it
     * is a string.
     *
     * @type {?boolean}
     * @since Version 0.4.0
     *
     */
    wrapCause?: boolean;

}