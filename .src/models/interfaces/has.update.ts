/**
 *
 * Interface to be used by a child of the {@link AbstractSystemEntity} class. Indicates that the class has an update
 * method.
 *
 * @interface HasUpdate
 * @since Introduced in Version 0.1.0.
 *
 */
export default interface HasUpdate {

	/**
	 *
	 * Updates the entity in the system.
	 *
	 * @param {any} args
	 * @returns {any} the results from the operation.
	 * @since Introduced in Version 0.1.0.
	 * 
	 */
	update(...args: any): any;

}
