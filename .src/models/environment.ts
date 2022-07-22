import AbstractEntity from "./base/abstract.entity";
import { getType, isNotString } from "../utils/types.util";

/**
 *
 * Class used to indicate the environment an application can be running on.
 *
 * @class Environment
 * @extends AbstractEntity
 * @since Introduced in Version 0.1.0.
 *
 */
export default class Environment extends AbstractEntity {

	/**
	 *
	 * Static string that represents the value that should be returned
	 * @type {string}
	 * @protected
	 * @static
	 * @readonly
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	protected static readonly TYPE: string = "Environment";

	/**
	 *
	 * Environment flag for development.
	 *
	 * @type {Environment}
	 * @static
	 * @readonly
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	public static readonly DEVELOPMENT: Environment = new Environment("DEVELOPMENT", "Development");

	/**
	 *
	 * Environment flag for production.
	 *
	 * @type {Environment}
	 * @static
	 * @readonly
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	public static readonly PRODUCTION: Environment = new Environment("PRODUCTION", "Production");

	/**
	 *
	 * Environment flag for testing.
	 *
	 * @type {Environment}
	 * @static
	 * @readonly
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	public static readonly TEST: Environment = new Environment("TEST", "Test");

	/**
	 *
	 * Environment flag for unknown environments.
	 * <br />
	 * <b>Note: While this is a preconfigured Environment, it is not a supported one, thus it is not included in the
	 * {@link Environment.SUPPORTED_TYPES} array.
	 *
	 * @type {Environment}
	 * @static
	 * @readonly
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	public static readonly UNKNOWN: Environment = new Environment("UNKNOWN", "Unknown");

	/**
	 *
	 * An array of all the supported environment values.
	 *
	 * @type {Array<Environment>}
	 * @static
	 * @readonly
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	public static readonly SUPPORTED_TYPES: Array<Environment> = [
		Environment.DEVELOPMENT,
		Environment.PRODUCTION,
		Environment.TEST
	];

	/**
	 *
	 * Private constructor used to create the static environment values in the class.
	 *
	 * @param {string} code A string representing the entity.
	 * @param {string} text A string representing the entity.
	 * @private
	 * @constructor
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	private constructor(code: string, text: string) {
		super(code, text, Environment.TYPE);
	}

	/**
	 *
	 * Method used to get the environment that corresponds to the selected string. Searches off the
	 * {@link Environment.code} or {@link Environment.text} fields.
	 *
	 * @param {string} environmentCode The environment code or text to search off.
	 * @returns {Environment} An environment associated with the provided string value. If unable to determine an
	 * association, {@link Environment.UNKNOWN} is returned.
	 * @throws {TypeError} An error is thrown if the provided value is not a string.
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	public static getEnvironment(environmentCode: string): Environment {
		// Validate
		if (isNotString(environmentCode)) {
			throw new TypeError(`Cannot get environment with type: ${getType(environmentCode)}; Must be `
				+ "of type string");
		}

		// Set the environment code to lowercase, so testing is easier
		environmentCode = environmentCode.toLowerCase();

		let environment: Environment = Environment.UNKNOWN;

		if ((environmentCode === this.DEVELOPMENT.code.toLowerCase())
			|| (environmentCode === this.DEVELOPMENT.text.toLowerCase())) {

			environment = this.DEVELOPMENT;
		} else if ((environmentCode === this.PRODUCTION.code.toLowerCase())
			|| (environmentCode === this.PRODUCTION.text.toLowerCase())) {

			environment = this.PRODUCTION;
		} else if ((environmentCode === this.TEST.code.toLowerCase())
			|| (environmentCode === this.TEST.text.toLowerCase())) {

			environment = this.TEST;
		}

		return environment;
	}

	/**
	 *
	 * Gets all the fields associated with the Environment entity.
	 *
	 * @returns {Array<string>} An array of the fields used by the Environment class.
	 * @protected
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	protected getFields(): Array<string> {
		return ["code", "text", "type"];
	}

	/**
	 *
	 * Indicates if the environment is {@link Environment.DEVELOPMENT}.
	 * @returns {boolean} True if the environment is {@link Environment.DEVELOPMENT}, otherwise false.
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	public isDev(): boolean { return this === Environment.DEVELOPMENT; }

	/**
	 *
	 * Indicates if the environment is {@link Environment.PRODUCTION}.
	 *
	 * @returns {boolean} True if the environment is {@link Environment.PRODUCTION}, otherwise false.
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	public isProd(): boolean { return this === Environment.PRODUCTION; }

	/**
	 *
	 * Indicates if the environment is {@link Environment.TEST}.
	 *
	 * @returns {boolean} True if the environment is {@link Environment.TEST}, otherwise false.
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	public isTest(): boolean { return this === Environment.TEST; }

	/**
	 *
	 * Indicates if the environment is {@link Environment.UNKNOWN}.
	 *
	 * @returns {boolean} True if the environment is {@link Environment.UNKNOWN}, otherwise false.
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	public isUnknown(): boolean { return this === Environment.UNKNOWN; }

}
