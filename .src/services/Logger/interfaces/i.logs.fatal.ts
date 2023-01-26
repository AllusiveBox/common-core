import ILogger from "./i.logger";

/**
 *
 * An extended logger type that implements fatal level logging.
 *
 * @interface ILogsFatal
 * @extends ILogger
 * @since Version 0.3.0
 *
 */
export default interface ILogsFatal extends ILogger {

	/**
	 *
	 * Logs messages at the fatal level.
	 * <br >
	 * <b>Note:</b> Fatal logs are intended to be used for fatal errors that the application cannot or should not
	 * recover from. For any other kind of error, use the {@link ILogger.error} method.
	 *
	 * @param {any} args The data to log.
	 * @returns {void}
	 * @since Version 0.3.0
	 *
	 */
	fatal(...args: any): void;

}
