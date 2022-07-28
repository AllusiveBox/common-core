/**
 *
 * Interface to be used by a child of the {@link AbstractSystemEntity} class. Indicates that the class has a create
 * method.
 *
 * @interface HasCreate
 * @since Version 0.1.0
 *
 */
export default interface HasCreate {

	/**
	 *
	 * Creates an entity in the system.
	 * @param {any} args
	 * @returns {any} The results from the operation.
	 * @since Version 0.1.0
	 *
	 */
	create(...args: any): any;

}
