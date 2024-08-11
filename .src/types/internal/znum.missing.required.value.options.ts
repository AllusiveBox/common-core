import { Znumable } from "../znum/znumable";
import { Znum } from "../../znums";

/**
 *
 * Configuration options for an {@link ZnumMissingRequiredValue} instance.
 *
 * @type ZnumMissingRequiredValueOptions
 * @since Version 0.4.0
 *
 */
export type ZnumMissingRequiredValueOptions<T extends Znum<Znumable> = Znum<Znumable>> = {

    /**
     *
     * The name of the field that was missing.
     *
     * @type {keyof T & string}
     * @template T
     * @since Version 0.4.0
     *
     */
    fieldName: keyof T & string;

    /**
     *
     * The invalid value that was received.
     *
     * @type {unknown}
     * @since Version 0.4.0
     *
     */
    receivedValue: string

} & ({

    /**
     *
     * The expected type for field specified in {@link ZnumMissingRequiredValueOptions#fieldName}.
     *
     * @type {string}
     * @since Version 0.4.0
     *
     */
    expectedValue: string;

} | {

    /**
     *
     * An array of expected types for the field specified in {@link ZnumMissingRequiredValueOptions#fieldName}.
     *
     * @type {Array<string>}
     * @since Version 0.4.0
     *
     */
    expectedValues: Array<string>;

});