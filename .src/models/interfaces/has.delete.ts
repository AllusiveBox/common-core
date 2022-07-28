/**
 *
 * Interface to be used by a child of the {@link AbstractSystemEntity} class. Indicates that the class has a delete
 * method.
 *
 * @interface HasDelete
 * @since Version 0.1.0
 *
 */
export default interface HasDelete {

	/**
	 *
	 * Deletes the entity from the system.
	 *
	 * @param {any} args
	 * @returns {any} The results from the operation.
	 * @since Version 0.1.0
	 *
	 */
	delete(...args): any;

}
