import { ListenerSignature, TypedEmitter } from "tiny-typed-emitter";
import { Nullable } from "../../types";

/**
 *
 * Abstract class for operating system based entities.
 *
 * @class AbstractSystemEntity
 * @extends TypedEmitter
 * @abstract
 * @since Version 0.1.0
 *
 */
export default abstract class AbstractSystemEntity<L extends ListenerSignature<L>> extends TypedEmitter<L> {

	/**
	 *
	 * Static string indicating the typing information for the entity.
	 *
	 * @type {string}
	 * @protected
	 * @static
	 * @readonly
	 * @since Version 0.1.0
	 *
	 */
	protected static readonly TYPE: string;

	/**
	 *
	 * Name for the entity.
	 *
	 * @type {string}
	 * @private
	 * @since Version 0.1.0
	 *
	 */
	#name: string;

	/**
	 *
	 * The location of the entity in the system.
	 *
	 * @type {string}
	 * @private
	 * @since Version 0.1.0
	 *
	 */
	#location: string;

	/**
	 *
	 * Abstract constructor. Sets the {@link name}, {@link location}, and {@link options}.
	 *
	 * @param {string}           name     The name of the entity in the system.
	 * @param {Nullable<string>} location The location of the entity in the system. If not provided, the current
	 * working directory is used.
	 * @protected
	 * @constructor
	 * @since Version 0.1.0
	 *
	 */
	protected constructor(
		name: string,
		location?: Nullable<string>,
	) {
		super();
		this.#name = name;
		this.#location = location || process.cwd();
	}

	/**
	 *
	 * Method that indicates the type for a class at the static level.
	 *
	 * @returns {string} The class-level typing information.
	 * @static
	 * @since Version 0.1.0
	 *
	 */
	public static getType(): string { return this.TYPE; }

	/**
	 *
	 * Method that indicates the string formatting for a class at the static level.
	 *
	 * @returns {string} The class-level string formatting.
	 * @static
	 * @since Version 0.1.0
	 *
	 */
	public static toString(): string { return this.getType(); }

	/**
	 *
	 * Abstract method that converts the entity into a string.
	 *
	 * @returns {string} The entity as a string.
	 * @abstract
	 * @since Version 0.1.0
	 *
	 */
	public abstract toString(): string;

	/**
	 *
	 * Gets the name of the entity.
	 *
	 * @returns {string}
	 * @since Version 0.1.0
	 *
	 */
	get name(): string { return this.#name; }

	/**
	 *
	 * Sets the name of the entity.
	 *
	 * @param {string} arg
	 * @protected
	 * @since Version 0.1.0
	 *
	 */
	protected set name(arg: string) { this.#name = arg; }

	/**
	 *
	 * Gets the entity's location in the file system.
	 *
	 * @returns {string}
	 * @since Version 0.1.0
	 *
	 */
	get location(): string { return this.#location; }

	/**
	 *
	 * Sets the entity's location in the file system.
	 *
	 * @param {string} arg
	 * @protected
	 * @since Version 0.1.0
	 *
	 */
	protected set location(arg: string) { this.#location = arg; }

}


