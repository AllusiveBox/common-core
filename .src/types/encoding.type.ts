/**
 *
 * Utility type used along to indicate the various types of encoding formats that can be used when dealing with data.
 * <br />
 * Consult
 * [the nodejs file system buffers and character encoding documents]{@link https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings}
 * for additional information.
 *
 * @type {EncodingType}
 * @since Introduced in Version 0.1.0.
 *
 */
export type EncodingType = "utf8" | "utf16le" | "latin1" | "base64" | "hex" | "ascii" | "binary" | "ucs2"
