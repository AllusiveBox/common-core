/**
 *
 * Interface to be used by a child of the {@link AbstractSystemEntity} class. Indicates that the class has a read
 * method.
 *
 * @interface HasRead
 * @since Introduced in Version 0.1.0.
 *
 */
export default interface HasRead {

	/**
	 *
	 * Reads the contents of an entity in the system.
	 *
	 * @param {any} args
	 * @returns {any} The results from the operation.
	 * @since Introduced in Version 0.1.0.
	 *
	 */
	read(...args): any;

}
