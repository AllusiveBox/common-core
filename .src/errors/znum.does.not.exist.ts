import Znum from "../znums/znum";
import ExtendedError from "./extended.error";
import { Znumable } from "../types";
import {
    isNotObject,
    isObject,
    isZnum
} from "../utils/types.util";

/**
 *
 * Error thrown when attempting to get either an {@link Znum} or {@link Znumable} value from a Znum instance and
 * the provided lookup value does not map to anything.
 *
 * @class XnumDoesNotExistError
 * @extends ExtendedError
 * @beta
 * @since Version 0.2.0
 *
 */
export default class ZnumDoesNotExist<
    U extends Znumable = Znumable,
    T extends typeof Znum<U> = typeof Znum<U>
> extends ExtendedError<Znum<U>> {

    /**
     *
     * Creates an instance of the ZnumDoesNotExist Error.
     * <br />
     * Sets the {@link ZnumDoesNotExist#context} field based off the provided {@link Znum}.
     *
     * @param {Znum<U>} znum      The individual {@link Znum} that did not map to a valid {@link Znumable} value.
     * @param {T}       ZnumClass The {@link Znum} instance that performed the lookup.
     * @constructor
     * @template T
     * @template U
     * @since Version 0.2.0
     *
     */
    constructor(
        znum: Znum<U>,
        ZnumClass: T
    );

    /**
     *
     * Creates an instance of the ZnumDoesNotExist Error.
     * <br />
     * Sets the {@link ZnumDoesNotExist#cause} field based off the provided znumable value.
     *
     * @param {Znumable} znumable  The {@link Znumable} value that did not map to a valid {@link Znum}.
     * @param {T}        ZnumClass The {@link Znum} instance that performed the lookup.
     * @constructor
     * @template T
     * @since Version 0.2.0
     *
     */
    constructor(
        znumable: Znumable,
        ZnumClass: T
    );

    /**
     *
     * Creates an instance of the ZnumDoesNotExist error.
     *
     * @param {(Znum | Znumable)} value     The invalid value that was provided.
     * @param {T}                 ZnumClass The Znum child that threw the error.
     * @template T
     * @constructor
     * @since Version 0.2.0
     *
     */
    constructor(
        value: Znum<U> | Znumable,
        ZnumClass: T
    ) {
        let message: string;
        if (isZnum(value)) {
            message = `Unable to get ${ZnumClass} for "${value.code}"; Ensure the correct value is provided and `
                + `that the ${ZnumClass} class is properly configured`
        } else {
            message = `Unable to convert ${ZnumClass} into Znumable value; Ensure that the ${ZnumClass} is `
                + "properly configured";
        }

        super(
            message,
            {
                cause: isNotObject(value) ? `"${value}" does not map to a Znum` : undefined,
                context: isObject(value) ? value : undefined
            }
        );
    }

}
