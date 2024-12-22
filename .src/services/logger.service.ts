import winston, { Logger } from "winston";
import { ILoggerService } from "./interfaces";

/**
 *
 * A service that wraps around the `winston` package to create a uniform logger service for my personal liking. You
 * are honestly better off just using winston. No, seriously.
 *
 * @class LoggerService
 * @implements ILoggerService
 * @since Version 0.5.0
 *
 */
export default class LoggerService implements ILoggerService {

    /**
     *
     * Flag indicating if debug logs should be displayed or recorded.
     *
     * @type {boolean}
     * @private
     * @readonly
     *
     */
    readonly #displayDebug: boolean;

    /**
     *
     * Flag indicating if all logs should display in the debug console, or if only the standard `debug` level logs
     * should.
     * <br />
     * <b>Note</b>: Setting this value to true will result in duplicate logs for all non-`debug` level logs
     * displayed in the terminal.
     *
     * @type {boolean}
     * @private
     * @readonly
     *
     */
    readonly #displayOnConsole: boolean;

    readonly #internalLogger: Logger;

    constructor() {
        this.#internalLogger = winston.createLogger();
    }

    debug(
        ...args: Array<unknown>
    ): void {

    }

    verbose(
        ...args: Array<unknown>
    ): void {

    }

    info(
        ...args: Array<unknown>
    ): void {

    }

    warn(
        ...args: Array<unknown>
    ): void {

    }

    error(
        ...args: Array<unknown>
    ): void {

    }

    fatal(
        ...args: Array<unknown>
    ): void {

    }

    get displayDebug(): boolean {
        return this.#displayDebug;
    }

    get displayOnConsole(): boolean {
        return this.#displayOnConsole;
    }

    get internalLogger(): Logger {
        return this.#internalLogger;
    }

}