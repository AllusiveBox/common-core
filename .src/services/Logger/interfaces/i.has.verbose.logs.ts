import IBasicLogger from "./i.basic.logger";

/**
 *
 * An extended logger type that implements verbose level logging.
 *
 * @interface IHasVerboseLogs
 * @extends IBasicLogger
 * @since Version 0.3.0
 * 
 */
export default interface IHasVerboseLogs extends IBasicLogger {

	/**
	 *
	 * Logs messages at the verbose level.
	 * <br />
	 * <b>Note:</b> Verbose level logs are different from information logs as they are intended to be more wordy and
	 * informative. These should be used sparingly to capture additional information alongside the other log levels.
	 *
	 * @param {any} args The data to log.
	 * @returns {void}
	 * @since Version 0.3.0
	 *
	 */
	verbose(...args: any): void;

}
