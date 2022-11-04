import IBasicLogger from "./i.basic.logger";

/**
 *
 * An extended logger type that implements fatal level logging.
 *
 * @interface IHasFatalLogs
 * @extends IBasicLogger
 * @since Version 0.3.0
 *
 */
export default interface IHasFatalLogs extends IBasicLogger {

	/**
	 *
	 * Logs messages at the fatal level.
	 * <br >
	 * <b>Note:</b> Fatal logs are intended to be used for fatal errors that the application cannot or should not
	 * recover from. For any other kind of error, use the {@link IBasicLogger.error} method.
	 *
	 * @param {any} args The data to log.
	 * @returns {void}
	 * @since Version 0.3.0
	 *
	 */
	fatal(...args: any): void;

}
