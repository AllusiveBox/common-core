import { Nullable } from "../../types";
import { isNotNullOrUndefined } from "../../utils/types.util";

/**
 *
 * An Error thrown when a value is either `null` or `undefined` and shouldn't be.
 *
 * @class NilError
 * @extends Error
 * @since Version 0.1.0
 *
 */
export default class NilError extends Error {

    /**
     *
     * String containing information on the cause of the error.
     *
     * @type {Nullable<string>}
     * @private
     * @readonly
     * @since Version 0.1.0
     *
     */
    readonly #causedBy: Nullable<string>;

    /**
     *
     * Creates a NilError instance.
     *
     * @constructor
     * @since Version 0.1.0
     *
     */
    constructor();

    /**
     *
     * Creates a NilError instance and specifies what caused the error.
     *
     * @param {string} causedBy String indicating what caused the error.
     * @constructor
     * @since Version 0.1.0
     *
     */
    constructor(
        causedBy: string
    );

    /**
     *
     * Creates a NilError instance.
     *
     * @param {?string} [causedBy] String indicating the cause of the error. Optional.
     * @constructor
     * @since Version 0.1.0
     *
     */
    constructor(
        causedBy?: string
    ) {
        let errorMessage: string = "Null or undefined value";
        if (isNotNullOrUndefined(causedBy)) errorMessage += `; Cause: ${causedBy}`;

        super(errorMessage);
        this.name = "NilError";
        this.#causedBy = causedBy || null;
    }

    /**
     *
     * Indicates what caused the error. If nothing was provided to the constructor, returns `null`.
     *
     * @returns {Nullable<string>}
     * @since Version 0.1.0
     *
     */
    get causedBy(): Nullable<string> {
        return this.#causedBy;
    }

}


