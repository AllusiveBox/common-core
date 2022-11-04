/**
 *
 * Interface that outlines general logger requirements.
 *
 * @interface IBasicLogger
 * @since Version 0.3.0
 *
 */
export default interface IBasicLogger {

	/**
	 *
	 * Logs messages at the debug level.
	 * <br >
	 * <b>Note:</b> Messages logged at this level should be ignored when the {@link Environment} is not configured
	 * for debug logging. See {@link Environment.SUPPORTS_DEBUG} for a list of environments that support debug logging.
	 *
	 * @param {any} args The data to log.
	 * @returns {void}
	 * @since Version 0.3.0
	 *
	 */
	debug(...args: any): void;

	/**
	 *
	 * Logs messages at the information level.
	 * <br />
	 * <b>Note:</b> Information logs are intended to be used for general logging.
	 *
	 * @param {any} args The data to log.
	 * @returns {void}
	 * @since Version 0.3.0
	 *
	 */
	info(...args: any): void;

	/**
	 *
	 * Logs messages at the warning level.
	 * <br />
	 * <b>Note:</b> Warning logs are intended to be used for alerting of potential issues, or extremely low level
	 * errors.
	 *
	 * @param {any} args The data to log.
	 * @returns {void}
	 * @since Version 0.3.0
	 *
	 */
	warn(...args: any): void;

	/**
	 *
	 * Logs messages at the error level.
	 * <br />
	 * <b>Note:</b> Error logs are intended to be used for non-fatal errors that the application can recover from.
	 *
	 * @param {any} args The data to log.
	 * @returns {void}
	 * @since Version 0.3.0
	 *
	 */
	error(...args: any): void;

}
