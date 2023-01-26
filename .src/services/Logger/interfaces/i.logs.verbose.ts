import ILogger from "./i.logger";

/**
 *
 * An extended logger type that implements verbose level logging.
 *
 * @interface ILogsVerbose
 * @extends ILogger
 * @since Version 0.3.0
 *
 */
export default interface ILogsVerbose extends ILogger {

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
