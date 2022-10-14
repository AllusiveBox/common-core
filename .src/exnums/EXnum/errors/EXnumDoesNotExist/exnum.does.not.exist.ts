import EXnum from "../../exnum";
import { EXnumable } from "../../../../types";

/**
 *
 * Error thrown when attempting to get either an {@link EXnum} or {@link EXnumable} value from an EXnum instance and
 * the provided lookup value does not map to anything.
 *
 * @class XnumDoesNotExistError
 * @extends Error
 * @beta
 * @since Version 0.2.0
 *
 */
export default class EXnumDoesNotExist<T extends typeof EXnum> extends Error {

	/**
	 *
	 * Creates an instance of the EXnumDoesNotExist error.
	 *
	 * @param {EXnum | EXnumable} value      The invalid value that was provided.
	 * @param {T}                 exnumClass The EXnum child that threw the error.
	 * @template T
	 * @constructor
	 * @since Version 0.2.0
	 *
	 */
	constructor(
		value: EXnum | EXnumable,
		exnumClass: T
	) {

		let message: string;
		if (value instanceof EXnum) {
			message = `Unable to get ${exnumClass} for ${value}; Ensure the correct value is provided and that the`
				+ `${exnumClass} class is properly configured`
		} else {
			message = `Unable to convert ${exnumClass} into Xnumable value; Ensure the correct value is provided and`
				+ `that the ${exnumClass} class is properly configured`
		}

		super(message);
		this.name = "EXnumDoesNotExist";
	}

}
