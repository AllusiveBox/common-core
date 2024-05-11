import { ILoggerService } from "../../.src";

/**
 *
 * A fake {@link ILoggerService} instance.
 *
 * @class LoggerServiceFake
 * @implements ILoggerService
 *
 */
export default class LoggerServiceFake
    implements ILoggerService {

    readonly storedLogs: {
        debug: Array<unknown>;
        verbose: Array<unknown>;
        info: Array<unknown>;
        warn: Array<unknown>;
        error: Array<unknown>;
        fatal: Array<unknown>;
    } = {
        debug: [],
        verbose: [],
        info: [],
        warn: [],
        error: [],
        fatal: []
    };

    readonly displayDebug: boolean;
    readonly displayOnConsole: boolean;

    constructor(
        displayDebug?: boolean,
        displayOnConsole?: boolean
    ) {
        this.displayDebug = displayDebug || false;
        this.displayOnConsole = displayOnConsole || displayDebug || false;
    }

    debug(
        ...args: Array<unknown>
    ): void {
        this.storedLogs.debug.push(...args);
    }

    verbose(
        ...args: Array<unknown>
    ): void {
        this.storedLogs.verbose.push(...args);
    }

    info(
        ...args: Array<unknown>
    ): void {
        this.storedLogs.info.push(...args);
    }

    warn(
        ...args: Array<unknown>
    ): void {
        this.storedLogs.warn.push(...args);
    }

    error(
        ...args: Array<unknown>
    ): void {
        this.storedLogs.error.push(...args);
    }

    fatal(
        ...args: Array<unknown>
    ): void {
        this.storedLogs.fatal.push(...args);
    }

}