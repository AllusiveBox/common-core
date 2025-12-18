import {
    ErrorLike,
    ErrorLikeWithCode
} from "../types";
import {
    isObject,
    isString
} from "./types.util";


/**
 *
 * Helper function that checks if the provided value is {@link ErrorLike}.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} `true` if the provided value is an Error-like object, otherwise `false`.
 * @see ErrorLike
 * @since 0.6.0
 *
 */
export function isErrorLike(
    arg: unknown
): arg is ErrorLike {
    return isObject(arg)
        && "message" in arg
        && isString(arg.message)
}

/**
 *
 * Helper function that checks if the provided value is {@link ErrorLikeWithCode}.
 *
 * @param {unknown} arg The value to check.
 * @returns {boolean} `true` if the provided value is an Error-like object with a `code` field, otherwise `false`.
 * @see ErrorLikeWithCode
 * @since 0.6.0
 *
 */
export function isErrorLikeWithCode(
    arg: unknown
): arg is ErrorLikeWithCode {
    return isErrorLike(arg)
        && "code" in arg
        && Number.isNaN(Number(arg.code))
}