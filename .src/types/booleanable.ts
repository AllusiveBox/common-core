import { Falseable } from './falseable';
import { Trueable } from './trueable';

/**
 *
 * Utility type used to indicate values that can be converted to a boolean.
 *
 * @type Booleanable
 * @since Version 0.2.0
 * @see {@link https://www.npmjs.com/package/boolean Boolean npm package} for additional details.
 *
 */
export type Booleanable = Falseable | Trueable;
