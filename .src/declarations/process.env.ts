import { Maybe } from "../types";

/**
 *
 * Extends the NodeJS namespace.
 *
 * @namespace NodeJS
 * @since Version 0.4.0
 *
 */
declare namespace NodeJS {

    /**
     *
     * The named `process.env` variables supported by this package.
     *
     * @interface ProcessEnv
     * @since Version 0.4.0
     *
     */
    interface ProcessEnv {

        /**
         *
         * The environment the process is running in.
         * <br />
         * Use the {@link Environment} class to safely check and modify this, if necessary, rather than use strings
         * directly.
         *
         * @type {Maybe<string>}
         * @since Version 0.4.0
         *
         */
        NODE_ENV: Maybe<string>;

    }

}

export {}