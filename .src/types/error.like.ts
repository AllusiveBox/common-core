import { NumericalString } from "./numerical.string";

/**
 *
 * Interface that represents an {@link Error}-like object, but for one reason or another, is not an actual
 * JavaScript {@link Error} object.
 * <br />
 * <b>Note</b>: Unlike the JavaScript  {@link Error} object, this {@link ErrorLike} interface only cares if the
 * `message` field is present and that it is a `string`. The other fields are all considered optional, as they do not
 * provide nearly as much context as the actual {@link Error#message} does.
 *
 * @interface ErrorLike
 * @since 0.6.0
 *
 */
export interface ErrorLike<T = unknown> {

    message: string;

    name?: string;

    stack?: string;

    cause?: T

}

/**
 *
 * Interface that represents an {@link Error}-like object, but for one reason or another, is not an actual
 * JavaScript {@link Error} object.
 * <br />
 * In addition to all the {@link ErrorLike} fields, it also includes a {@link code} field which is either a
 * {@link NumericalString}, or a `number` that can provide additional context.
 *
 * @interface ErrorLikeWithCode
 * @extends ErrorLike
 * @since 0.6.0
 *
 */
export interface ErrorLikeWithCode extends ErrorLike {

    code: (NumericalString | number);

}