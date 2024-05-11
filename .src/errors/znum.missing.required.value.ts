import ExtendedError from "./extended.error";
import { Znumable } from "../types";
import { ZnumMissingRequiredValueOptions } from "../types/znum.missing.required.value.options";
import { isObject } from "../utils/types.util";
import { Znum } from "../znums";

/**
 *
 * Error thrown when attempting to create a child of the {@link Znum} class, but a required field is missing.
 *
 * @class ZnumMissingRequiredValue
 * @extends Error
 * @beta
 * @since Version 0.2.0
 *
 */
export default class ZnumMissingRequiredValue<
    U extends Znumable = Znumable,
    T extends Znum<U> = Znum<U>
> extends ExtendedError<ZnumMissingRequiredValueOptions<T>> {

    /**
     *
     * Creates an instance of the ZnumMissingRequiredValue error, specifying the name of the field that has its
     * value missing.
     *
     * @param {string} fieldName The name of the field that is missing its value.
     * @constructor
     * @since Version 0.4.0
     *
     */
    constructor(
        fieldName: string
    );

    /**
     *
     * Creates an instance of the ZnumMissingRequiredValue error, specifying additional details of the missing data.
     *
     * @param {ZnumMissingRequiredValueOptions<T>} options The additional details that resulted in the error.
     * @constructor
     * @template T
     * @since Version 0.4.0
     *
     */
    constructor(
        options: ZnumMissingRequiredValueOptions<T>
    );

    /**
     *
     * Creates an instance of the ZnumMissingRequiredValue error.
     *
     * @param {string} arg The required field that is missing.
     * @constructor
     * @since Version 0.2.0
     *
     */
    constructor(
        arg: (string | ZnumMissingRequiredValueOptions<T>)
    ) {
        // object arg constructor
        if (isObject(arg)) {
            const message: string = `Unable to create Znum instance; Missing required field "${arg.fieldName}"`;

            super(
                message,
                {
                    context: arg
                }
            );
        }
        // string arg constructor
        else {
            const message: string = `Unable to create Znum instance; Missing required field "${arg}"`;
            super(message);
        }
    }
}
