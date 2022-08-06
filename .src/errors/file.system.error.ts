/**
 *
 * An error thrown when there is an error with a {@link AbstractSystemEntity} child.
 *
 * @class FileSystemError
 * @extends Error
 * @since Version 0.1.0
 *
 */
export default class FileSystemError extends Error {

	/**
	 *
	 * Creates a FileSystemError instance.
	 *
	 * @constructor
	 * @since Version 0.1.0.
	 *
	 */
	constructor();

	/**
	 *
	 * Creates a FileSystemError instance with additional information provided.
	 *
	 * @param errorMessage The additional information to include with the error.
	 * @constructor
	 * @since Version 0.1.0
	 *
	 */
	constructor(errorMessage);

	/**
	 *
	 * Creates a FileSystemError instance.
	 *
	 * @param {?string} [errorMessage] Additional error information to include with the error.
	 * @constructor
	 * @since Version 0.1.0
	 *
	 */
	constructor(
		errorMessage?: string
	) {
		super(errorMessage);
		this.name = "FileSystemError";
	}

}
