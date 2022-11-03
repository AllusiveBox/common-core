import { getType, isString } from "./types.util";
import { Environment } from "../exnums";

/**
 *
 * Parses the node process environment `NODE_ENV` variable and returns the stored value as an Environment EXnum.
 *
 * @returns {Environment} The environment that the node process is set as.
 * @since Version 0.1.0
 *
 */
export function getEnvironment(): Environment {
	return isString(process.env.NODE_ENV) ?
		Environment.getEnvironment(process.env.NODE_ENV) : Environment.UNKNOWN;
}

/**
 *
 * Sets the node process environment `NODE_ENV` variable with the provided environment value.
 *
 * @param {Environment | string} arg The environment to set the process to.
 * @returns {void}
 * @throws {TypeError} If the provided value is not an Environment or string.
 * @since Version 0.1.0
 *
 */
export function setEnvironment(
	arg: Environment | string
): void {
	let environment: Environment;

	if (isString(arg)) {
		environment = Environment.getEnvironment(arg);
	} else if (Environment.isValid(arg)) {
		environment = arg;
	} else {
		throw new TypeError(`Unable to set environment with type: ${getType(arg)}; Must be either a string `
			+ "or valid Environment instance");
	}

	process.env.NODE_ENV = Environment.getValue(environment);
}
