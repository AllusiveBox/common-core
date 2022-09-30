import { getType, isEmpty, isString } from "./types.util";
import { Environment } from "../models";

/**
 *
 * Gets the environment from the node process.
 *
 * @returns {Environment} The environment that the node environment is set on.
 * @since Version 0.1.0
 *
 */
export function getEnvironment(): Environment {
	return isEmpty(process.env.NODE_ENV) ?
		Environment.getEnvironment(process.env.NODE_ENV) : Environment.UNKNOWN;
}

/**
 *
 * Sets the `process.env.NODE_ENV` variable with the supplied Environment.
 *
 * @param {Environment} environment The Environment to set.
 * @throws {TypeError} If the provided value is not an Environment.
 * @since Version 0.1.0
 *
 */
export function setEnvironment(environment: Environment);

/**
 *
 * Sets the node process environment setting with the supplied string. Looks up the corresponding
 * {@link Environment} based off the provided value, and sets the `process.env.NODE_ENV` variable. If the provided
 * value does not map to a valid Environment, {@link Environment.UNKNOWN} is set instead.
 *
 * @param {string} environmentString The environment as a string.
 * @throws {TypeError} If the provided value is not a string.
 * @since Version 0.1.0
 *
 */
export function setEnvironment(environmentString: string);

/**
 *
 * Sets the node processes environment setting.
 *
 * @param {(Environment | string)} arg The environment to set.
 * @throws {TypeError} If the provided value is not an Environment or string value.
 * @since Version 0.1.0
 *
 */
export function setEnvironment(arg: Environment | string) {
	let environment: Environment;

	if (isString(arg)) {
		environment = Environment.getEnvironment(arg);
	} else if (Environment.isSupported(arg)) {
		environment = arg;
	} else {
		throw new TypeError(`Unable to set environment with type: ${getType(arg)}; Must be of type Environment `
			+ "or string");
	}

	process.env.NODE_ENV = environment.code;
}
