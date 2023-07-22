import EXnum from "../../exnum";

/**
 *
 * Error thrown when attempting to create a child of the {@link EXnum} class, but a required field is missing.
 *
 * @class EXnumMissingRequiredValue
 * @extends Error
 * @beta
 * @since Version 0.2.0
 *
 */
export default class EXnumMissingRequiredValue<T extends EXnum> extends Error {

    /**
     *
     * Creates an instance of the EXnumMissingRequiredValue error.
     *
     * @param {string} fieldName The required field that is missing.
     * @param {T}      exnum     The EXnum child that threw the error.
     * @template T
     * @constructor
     * @since Version 0.2.0
     *
     */
    constructor(
        fieldName: string,
        exnum: T
    ) {
        super(`Unable to create ${exnum} instance; Missing required field: ${fieldName}`);
        this.name = "EXnumMissingRequiredValue";
    }
}
