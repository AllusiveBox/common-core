import {
    ILoggerService,
    IProcessService
} from "./interfaces";
import { Environment } from "../znums";

/**
 *
 * A service that wraps around the `process` variable to perform various operations.
 *
 * @class ProcessService
 * @implements IProcessService
 * @since Version 0.4.0
 *
 */
export default class ProcessService implements IProcessService {

    /**
     *
     * Environment managed by the service. Set initially when the service is first loaded in by an application.  Once
     * set, it is not updated, except when the initial load detects a value that evaluates to
     * {@link Environment#UNKNOWN}.
     * <br />
     * Intended to be a more secure way of locking in the Environment value stored in `process.env.NODE_ENV`.
     *
     * @type {Environment}
     * @private
     * @static
     *
     */
    static #environment: Environment;

    static {
        this.#environment = Environment.getEnvironment(process.env.NODE_ENV);

        /* istanbul ignore next */
        if (this.#environment.isUnknown()) {
            console.warn(`Unknown Environment "${process.env.NODE_ENV}" detected`);
        }
    }

    /**
     *
     * The running application Environment for the application.
     *
     * @returns {Environment}
     * @static
     * @since Version 0.4.0
     *
     */
    static get environment(): Environment {
        return this.#environment;
    }

    /**
     *
     * The current directory the process service is set to be in. This is set to the value returned by
     * `process.cwd()` when the service instance is initialized.
     *
     * @type {string}
     * @private
     * @since Version 0.4.0
     *
     */
    #currentDirectory: string;

    /**
     *
     * The logger that will be used by the service instance.
     *
     * @type {ILoggerService}
     * @private
     * @since Version 0.4.0
     *
     */
    readonly #logger: ILoggerService;

    /**
     *
     * Creates a new instance.
     *
     * @param {ILoggerService} logger The logger to use with the service.
     * @constructor
     * @since Version 0.4.0
     *
     */
    constructor(
        logger: ILoggerService
    ) {
        this.#logger = logger;

        this.#currentDirectory = process.cwd();
    }

    /**
     *
     * Wrapper around the `process.chdir()` method with logging added to it.
     *
     * @param {string} newDir The new directory to change to.
     * @private
     * @since Version 0.4.0
     *
     */
    #changeDirectory(
        newDir: string
    ): this {
        this.logger.debug("Changing working directory...");
        process.chdir(newDir);

        this.#currentDirectory = process.cwd();
        this.logger.debug(`Working directory updated; New working directory: ${this.currentDirectory}`);

        return this;
    }

    /**
     *
     * Goes back one level in the current directory.
     *
     * @returns {ProcessService} The service instance, so it can be chained too, as needed.
     * @since Version 0.4.0
     *
     */
    back(): this {
        return this.#changeDirectory("../");
    }

    /**
     *
     * Changes the current working directory to the specified directory.
     *
     * @param {string} newDir The directory to change to.
     * @returns {ProcessService} The service instance, so it can be chained too, as needed.
     * @since Version 0.4.0
     *
     */
    change(
        newDir: string
    ): this {
        return this.#changeDirectory(newDir);
    }

    /**
     *
     * Parses the current `process.env` value and returns it as an {@link Environment}.
     *
     * @returns {Environment} The `process.env` value converted into an {@link Environment}.
     * @since Version 0.4.0
     *
     */
    getEnvironment(): Environment {
        let environment: Environment = ProcessService.#environment;

        if (!environment.isUnknown()) {
            return environment;
        }

        this.logger.debug("Parsing process.env.NODE_ENV...");
        environment = Environment.getEnvironment(process.env.NODE_ENV);
        if (environment.isUnknown()) {
            this.logger.warn(`Unknown Environment ${process.env.NODE_ENV} detected`);
        } else {
            this.logger.debug("Updating stored Environment");
            ProcessService.#environment = environment;
        }

        return environment;
    }

    /**
     *
     * Utility method that parses the `process.env` variable to indicate if the current {@link Environment} is
     * {@link Environment#DEVELOPMENT}.
     *
     * @returns {boolean} True if the current environment value evaluates to {@link Environment#DEVELOPMENT},
     * otherwise false.
     * @since Version 0.4.0
     *
     */
    isDevelopment(): boolean {
        return this.getEnvironment()
            .isDevelopment();
    }

    /**
     *
     * Utility method that parses the `process.env` variable to indicate if the current {@link Environment} is
     * {@link Environment#LOCAL}.
     *
     * @returns {boolean} True if the current environment value evaluates to {@link Environment#LOCAL}, otherwise
     * false.
     * @since Version 0.4.0
     *
     */
    isLocal(): boolean {
        return this.getEnvironment()
            .isLocal();
    }

    /**
     *
     * Utility method that parses the `process.env` variable to indicate if the current {@link Environment} is
     * {@link Environment#PRODUCTION}.
     *
     * @returns {boolean} True if the current environment value evaluates to {@link Environment#PRODUCTION},
     * otherwise false.
     * @since Version 0.4.0
     *
     */
    isProd(): boolean {
        return this.getEnvironment()
            .isProduction();
    }

    /**
     *
     * Utility method that parses the `process.env` variable to indicate if the current {@link Environment} is
     * {@link Environment#TEST}.
     *
     * @returns {boolean} True if the current environment value evaluates to {@link Environment#TEST}, otherwise false.
     * @since Version 0.4.0
     *
     */
    isTest(): boolean {
        return this.getEnvironment()
            .isTest();
    }

    /**
     *
     * Utility method that parses the `process.env` variable to indicate if the current {@link Environment} is
     * {@link Environment#UAT}.
     *
     * @returns {boolean} True if the current environment value evaluates to {@link Environment#UAT}, otherwise false.
     * @since Version 0.4.0
     *
     */
    isUat(): boolean {
        return this.getEnvironment()
            .isUat();
    }

    /**
     *
     * Utility method that parses the `process.env` variable to indicate if the current {@link Environment} is a
     * known and supported value.
     *
     * @returns {boolean} True if the current environment value evaluates to {@link Environment#UNKNOWN}, otherwise
     * false.
     * @since Version 0.4.0
     *
     */
    isUnknown(): boolean {
        return this.getEnvironment()
            .isUnknown();
    }

    /**
     *
     * The current directory the service instance is keyed to. If the value hasn't been modified, then it will be
     * the value stored in `process.cwd()` by default.
     *
     * @type {string}
     * @readonly
     * @since Version 0.4.0
     *
     */
    get currentDirectory(): string {
        return this.#currentDirectory;
    }

    /**
     *
     * The logger that will be used by the service instance.
     *
     * @type {ILoggerService}
     * @readonly
     * @since Version 0.4.0
     *
     */
    get logger(): ILoggerService {
        return this.#logger;
    }

}