import Environment from "../../znums/environment";
import { ILoggerService } from "./i.logger.service";

/**
 *
 * Interface outlining the basic requirements for a ProcessService instance.
 *
 * @interface IProcessService
 * @since Version 0.4.0
 *
 */
export interface IProcessService {

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
    readonly currentDirectory: string;

    /**
     *
     * The logger that will be used by the service instance.
     *
     * @type {ILoggerService}
     * @readonly
     * @since Version 0.4.0
     *
     */
    readonly logger: ILoggerService;

    /**
     * 
     * Goes back one level based on the {@link IProcessService#currentDirectory}. 
     * 
     * @returns {IProcessService} The service instance, so it can be chained too, as necessary.
     * @since Version 0.4.0
     * 
     */
    back(): this;

    /**
     * 
     * Changes the {@link IProcessService#currentDirectory}.
     * 
     * @param {string} arg The location to change to.
     * @returns {void}
     * @since Version 0.4.0
     *
     */
    change(
        arg: string
    ): void;

    /**
     *
     * Parses the `process.env` variable to get the current running environment.
     *
     * @returns {Environment} The current running environment.
     * @since Version 0.4.0
     *
     */
    getEnvironment(): Environment;

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
    isDevelopment(): boolean;

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
    isLocal(): boolean;

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
    isProd(): boolean;

    /**
     *
     * Utility method that parses the `process.env` variable to indicate if the current {@link Environment} is
     * {@link Environment#TEST}.
     *
     * @returns {boolean} True if the current environment value evaluates to {@link Environment#TEST}, otherwise false.
     * @since Version 0.4.0
     *
     */
    isTest(): boolean;

    /**
     *
     * Utility method that parses the `process.env` variable to indicate if the current {@link Environment} is
     * {@link Environment#UAT}.
     *
     * @returns {boolean} True if the current environment value evaluates to {@link Environment#UAT}, otherwise false.
     * @since Version 0.4.0
     *
     */
    isUat(): boolean;

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
    isUnknown(): boolean;

}