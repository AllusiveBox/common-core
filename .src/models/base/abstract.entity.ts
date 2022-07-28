/**
 *
 * Abstract class for class based entities.
 *
 * @class AbstractEntity
 * @abstract
 * @since Version 0.1.0
 *
 */
export default abstract class AbstractEntity {

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
     * A string representing an identifier for the entity.
     *
     * @type {string}
     * @private
     * @readonly
     * @since Version 0.1.0
     *
     */
    readonly #code: string;

    /**
     *
     * A string representing the entity in a readable format.
     *
     * @type {string}
     * @private
     * @readonly
     * @since Version 0.1.0
     *
     */
    readonly #text: string;

    /**
     *
     * A string representing the typing information for the entity.
     *
     * @type {string}
     * @private
     * @readonly
     * @since Version 0.1.0
     *
     */
    readonly #type: string;

    /**
     *
     * An array of all the supported {@link AbstractEntity}s.
     *
     * @type {Array<AbstractEntity>}
     * @static
     * @readonly
     * @since Version 0.1.0
     *
     */
    public static readonly SUPPORTED_TYPES: Array<AbstractEntity>;

    /**
     *
     * Abstract constructor. Sets the {@link code}, {@link text}, and {@link type} fields.
     *
     * @param {string} code A string representing the entity. Comparable to an enum code. Should not have spaces or
     * lowercase letters.
     * @param {string} text A string representing the entity in an easily readable format. Typically, the `code`
     * value but with proper capitalization and spaces, if any are present.
     * @param {string} type A string representing the entity type. This should be the same value for all entities in
     * an associated class.
     * @protected
     * @constructor
     * @since Version 0.1.0
     *
     */
    protected constructor(code: string, text: string, type: string) {
        this.#code = code;
        this.#text = text;
        this.#type = type;
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
     * Indicates if a provided entity is supported.
     *
     * @param {AbstractEntity} entity the entity to check.
     * @returns {boolean} True if the entity is supported, otherwise false.
     * @since Version 0.1.0
     *
     */
    public static isSupported(entity: AbstractEntity): boolean {
        return this.SUPPORTED_TYPES.includes(entity);
    }

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
     * Gets all the fields associated with the entity.
     *
     * @returns {Array<string>}
     * @protected
     * @abstract
     * @since Version 0.1.0
     *
     */
    protected abstract getFields(): Array<string>;

    /**
     *
     * Strictly checks each element of an entity and verifies that the entity matches.
     *
     * @param {AbstractEntity} entity The entity to check against.
     * @returns {boolean} True if the two entities are strictly equal, otherwise false.
     * @since Version 0.1.0
     *
     */
    public isStrictEqual(entity: AbstractEntity): boolean {
        return this === entity;
    }

    /**
     *
     * Checks if a provided entity is equal to another.
     *
     * @param {AbstractEntity} entity The entity to check against.
     * @returns {boolean} True if the two entities are equal, otherwise false.
     * @since Version 0.1.0
     *
     */
    public isEqual(entity: AbstractEntity): boolean {
        const myFields = this.getFields();
        const otherFields = entity.getFields ?
            entity.getFields() : Object.keys(entity);

        if (myFields.length !== otherFields.length) {
            return false;
        }

        let isMatch = true;
        myFields.forEach((field) => {
            // Validate that the field is in the other entities fields
            if (!otherFields.includes(field)) {
                isMatch = false;
            } else if ((this[field] !== entity[field])) {
                isMatch = false;
            }
        });

        return isMatch;
    }

    /**
     *
     * Converts the entity to a string.
     *
     * @returns {string} The entity as a string.
     * @since Version 0.1.0
     *
     */
    public toString(): string { return `${this.type}:${this.code}`; }

    /**
     *
     * Gets the entity's code.
     *
     * @returns {string}
     * @since Version 0.1.0
     *
     */
    get code(): string { return this.#code; }

    /**
     *
     * Gets the entity's text.
     *
     * @returns {string}
     * @since Version 0.1.0
     *
     */
    get text(): string { return this.#text; }

    /**
     *
     * Gets the entity's type.
     *
     * @returns {string}
     * @since Version 0.1.0
     *
     */
    get type(): string { return this.#type; }

}
