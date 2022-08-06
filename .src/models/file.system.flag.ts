import { AbstractEntity } from "./base";
import { Nilable } from "../types";
import { getType, isNotString, isNullOrUndefined } from "../utils/types.util";

/**
 *
 * Class used to indicate a file system flag when handling files in the file system.
 *
 * @class FileSystemFlag
 * @extends AbstractEntity
 * @since Version 0.1.0
 *
 */
export default class FileSystemFlag extends AbstractEntity {

	/**
	 *
	 * The flag used by Nodejs and the file system.
	 *
	 * @type {string}
	 * @private
	 * @readonly
	 *
	 */
	readonly #flag: Nilable<string>;

	/**
	 *
	 * Static string that represents the value that should be returned when the class is converted to a string.
	 *
	 * @type {string}
	 * @protected
	 * @static
	 * @readonly
	 * @since Version 0.1.0
	 *
	 */
	protected static readonly TYPE: string = "FileSystemFlag";

	/**
	 *
	 * Flag used for standard asynchronous appending operations. If the file does not exist, it will attempt to
	 * create it before appending any data.
	 *
	 * @type {FileSystemFlag}
	 * @static
	 * @readonly
	 * @see {@link APPEND_SYNCHRONOUS} for the synchronous version of this flag.
	 * @see {@link APPEND_ONLY_EXISTING} for the version of this flag that errors when the file does not already exist.
	 * @see {@link WRITE} for a flag that will replace existing data in a file when writing to it, instead of
	 * appending to the end of the file.
	 * @since Version 0.1.0
	 *
	 */
	public static readonly APPEND: FileSystemFlag = new FileSystemFlag(
		"APPEND",
		"Append / create files asynchronously",
		"a"
	);

	/**
	 *
	 * Flag used for to asynchronously append to an existing file. If attempting to write to a file that does not
	 * exist using this flag, an error will be thrown.
	 *
	 * @type {FileSystemFlag}
	 * @static
	 * @readonly
	 * @see {@link APPEND} for the version of this flag that will create a file if it does not already exist before
	 * appending data.
	 * @see {@link WRITE_ONLY_EXISTING} for a flag that will replace existing data in a file when writing to it,
	 * instead of appending to the end of the file. This flag will still throw an error if the file does not exist.
	 * @since Version 0.1.0
	 *
	 */
	public static readonly APPEND_ONLY_EXISTING: FileSystemFlag = new FileSystemFlag(
		"APPEND_ONLY_EXISTING",
		"Append only existing files asynchronously",
		"ax"

	);

	/**
	 *
	 * Flag used to asynchronously append and read from a file. If a file does not exist before attempting to
	 * operate on it, it will be created.
	 *
	 * @type {FileSystemFlag}
	 * @see {@link APPEND_AND_READ_SYNCHRONOUS} for the synchronous version of this flag.
	 * @see {@link APPEND_AND_READ_ONLY_EXISTING} for the version of this flag that errors when the file does not
	 * already exist.
	 * @since Version 0.1.0
	 *
	 */
	public static readonly APPEND_AND_READ: FileSystemFlag = new FileSystemFlag(
		"APPEND_AND_READ",
		"Append / create and read files asynchronously",
		"a+"
	);

	/**
	 *
	 * Flag used to asynchronously append and read from a file. If attempting to operate on a file that does not
	 * exist using this flag, an error is thrown.
	 *
	 * @type {FileSystemFlag}
	 * @see {@link APPEND_AND_READ} for the version of this flag that will create the file before attempting to
	 * operate on it.
	 * @since Version 0.1.0
	 *
	 */
	public static readonly APPEND_AND_READ_ONLY_EXISTING: FileSystemFlag = new FileSystemFlag(
		"APPEND_AND_READ_ONLY_EXISTING",
		"Append and read only existing files",
		"ax+"
	);

	/**
	 *
	 * Flag used to synchronously append data to a file. If the file does not exist, it will be created before
	 * attempting to append the data.
	 *
	 * @type {FileSystemFlag}
	 * @see {@link APPEND} for the asynchronous version of this flag.
	 * @since Version 0.1.0
	 *
	 */
	public static readonly APPEND_SYNCHRONOUS: FileSystemFlag = new FileSystemFlag(
		"APPEND_SYNCHRONOUS",
		"Append / create files synchronously",
		"as"
	);

	/**
	 *
	 * Flag used to synchronously append or read data from a file. If the file does not exist, it will be created
	 * before attempting to operate on it.
	 *
	 * @type {FileSystemFlag}
	 * @see {@link APPEND_AND_READ} for the asynchronous version of this flag.
	 * @since Version 0.1.0
	 *
	 */
	public static readonly APPEND_AND_READ_SYNCHRONOUS: FileSystemFlag = new FileSystemFlag(
		"APPEND_AND_READ_SYNCHRONOUS",
		"Append and read files synchronously",
		"as+"
	);

	/**
	 *
	 * Flag used to asynchronously read data from a file. If the file does not exist, attempting to read it using
	 * this flag will throw an error.
	 *
	 * @type {FileSystemFlag}
	 * @since Version 0.1.0
	 *
	 */
	public static readonly READ: FileSystemFlag = new FileSystemFlag(
		"READ",
		"Read existing files asynchronously",
		"r"
	);

	/**
	 *
	 * Flag used to asynchronously read and write data to a file. If the file does not exist, attempting to operate
	 * on it using this flag will throw an error.
	 *
	 * @type {FileSystemFlag}
	 * @see {@link READ_AND_WRITE_SYNCHRONOUS} for the synchronous version of this flag.
	 * @since Version 0.1.0
	 *
	 */
	public static readonly READ_AND_WRITE: FileSystemFlag = new FileSystemFlag(
		"READ_AND_WRITE",
		"Read and write existing files asynchronously",
		"r+"
	);

	/**
	 *
	 * Flag used to synchronously read and write data from a file. If the file does not exist, attempting to operate
	 * on it using this flag will throw an error.
	 *
	 * @type {FileSystemFlag}
	 * @see {@link READ_AND_WRITE} for the asynchronous version of this flag.
	 * @since Version 0.1.0
	 *
	 */
	public static readonly READ_AND_WRITE_SYNCHRONOUS: FileSystemFlag = new FileSystemFlag(
		"READ_AND_WRITE_SYNCHRONOUS",
		"Read and write existing files synchronously",
		"rs+"
	);

	/**
	 *
	 * Flag used to asynchronously write data to a file. If the file does not already exist, it is created and the
	 * data is added. If the file does exist, the existing data is overwritten by the new data.
	 *
	 * @type {FileSystemFlag}
	 * @see {@link APPEND} for a flag that allows adding data to a file that may or may not exist without replacing the
	 * existing data.
	 * @see {@link WRITE_ONLY_EXISTING} for the version of this flag that throws an error when attempting to write to a
	 * file that does not already exist.
	 * @
	 *
	 */
	public static readonly WRITE: FileSystemFlag = new FileSystemFlag(
		"WRITE",
		"Write / create files asynchronously",
		"w"
	);


	/**
	 *
	 * Flag used to asynchronously write data to a non-existing file. If the file exists when attempting to write using
	 * this flag, it will throw an error.
	 *
	 * @type {FileSystemFlag}
	 * @see {@link WRITE} for the version of this flag that does not throw an error when the file doesn't already
	 * exist.
	 * @since Version 0.1.0
	 *
	 */
	public static readonly WRITE_ONLY_NON_EXISTING: FileSystemFlag = new FileSystemFlag(
		"WRITE_ONLY_NON_EXISTING",
		"Write only non-existing files asynchronously",
		"wx"
	);

	/**
	 *
	 * Flag used to asynchronously write and read from a file. If the file does not already exist when attempting to
	 * operate on it, it will create it. If the file already exists when attempting to write to it, it will
	 * overwrite the existing data.
	 *
	 * @type {FileSystemFlag}
	 * @see {@link APPEND_AND_READ} for a flag that appends data to the end of an existing file, instead of
	 * overwriting existing data.
	 * @since Version 0.1.0
	 *
	 */
	public static readonly WRITE_AND_READ: FileSystemFlag = new FileSystemFlag(
		"WRITE_AND_READ",
		"Write / create and read files asynchronously",
		"w+"
	);

	/**
	 *
	 * Flag used to asynchronously write and read from a non-existing file. IF the file does not already exist when
	 * attempting to operate on it, it will create it. If the file already exists when attempting to write or read
	 * it using this flag, an error is thrown.
	 *
	 * @type {FileSystemFlag}
	 * @since Version 0.1.0
	 *
	 */
	public static readonly WRITE_AND_READ_ONLY_NON_EXISTING: FileSystemFlag = new FileSystemFlag(
		"WRITE_AND_READ_ONLY_NON_EXISTING",
		"Write and read only existing files asynchronously",
		"wx+"
	);

	/**
	 *
	 * Represents an unknown flag. Attempting to operate using this flag will result in an error.
	 *
	 * @type {FileSystemFlag}
	 * @see {@link NULL} for a null representation of the file system flag class.
	 * @since Version 0.1.0
	 *
	 */
	public static readonly UNKNOWN_FLAG: FileSystemFlag = new FileSystemFlag(
		"UNKNOWN_FLAG",
		"Unknown flag",
		"UNKNOWN"
	);

	/**
	 *
	 * A null flag. Attempting to operate using this flag will result to whatever the operation defaults to. If
	 * there is no default, an error is thrown.
	 *
	 * @type {FileSystemFlag}
	 * @since Version 0.1.0
	 *
	 */
	public static readonly NULL: FileSystemFlag = new FileSystemFlag(
		"NULL",
		"null",
		null
	);

	/**
	 *
	 * Maps that has all the mapping information for converting a flag string to a {@link FileSystemFlag} entity.
	 *
	 * @type {Map<Nilable<string>, FileSystemFlag>}
	 * @static
	 * @readonly
	 * @since Version 0.1.0
	 *
	 */
	public static readonly MAP: Map<Nilable<string>, FileSystemFlag> = new Map<Nilable<string>, FileSystemFlag>([
		[FileSystemFlag.APPEND.flag, FileSystemFlag.APPEND],
		[FileSystemFlag.APPEND_ONLY_EXISTING.flag, FileSystemFlag.APPEND_ONLY_EXISTING],
		[FileSystemFlag.APPEND_AND_READ.flag, FileSystemFlag.APPEND_AND_READ],
		[FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING.flag, FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING],
		[FileSystemFlag.APPEND_SYNCHRONOUS.flag, FileSystemFlag.APPEND_SYNCHRONOUS],
		[FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS.flag, FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS],
		[FileSystemFlag.READ.flag, FileSystemFlag.READ],
		[FileSystemFlag.READ_AND_WRITE.flag, FileSystemFlag.READ_AND_WRITE],
		[FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS.flag, FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS],
		[FileSystemFlag.WRITE.flag, FileSystemFlag.WRITE],
		[FileSystemFlag.WRITE_ONLY_NON_EXISTING.flag, FileSystemFlag.WRITE_ONLY_NON_EXISTING],
		[FileSystemFlag.WRITE_AND_READ.flag, FileSystemFlag.WRITE_AND_READ],
		[FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING.flag, FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING],
		[null, FileSystemFlag.NULL]
	]);

	/**
	 *
	 * An array of all the supported file system flag values.
	 *
	 * @type {Array<FileSystemFlag>}
	 * @static
	 * @readonly
	 * @since Version 0.1.0
	 *
	 */
	public static readonly SUPPORTED_TYPES: Array<FileSystemFlag> = [
		FileSystemFlag.APPEND,
		FileSystemFlag.APPEND_ONLY_EXISTING,
		FileSystemFlag.APPEND_AND_READ,
		FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING,
		FileSystemFlag.APPEND_SYNCHRONOUS,
		FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS,
		FileSystemFlag.READ,
		FileSystemFlag.READ_AND_WRITE,
		FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS,
		FileSystemFlag.WRITE,
		FileSystemFlag.WRITE_ONLY_NON_EXISTING,
		FileSystemFlag.WRITE_AND_READ,
		FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING,
		FileSystemFlag.NULL
	];

	/**
	 *
	 * An array of all the asynchronous appending flags.
	 *
	 * @type {Array<FileSystemFlag>}
	 * @private
	 * @static
	 * @readonly
	 * @since Version 0.1.0
	 *
	 */
	static readonly #ASYNCHRONOUS_APPEND_FLAGS: Array<FileSystemFlag> = [
		FileSystemFlag.APPEND,
		FileSystemFlag.APPEND_ONLY_EXISTING,
		FileSystemFlag.APPEND_AND_READ,
		FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING
	];

	/**
	 *
	 * An array of all the synchronous appending flags.
	 *
	 * @type {Array<FileSystemFlag>}
	 * @private
	 * @static
	 * @readonly
	 *
	 */
	static readonly #SYNCHRONOUS_APPEND_FLAGS: Array<FileSystemFlag> = [
		FileSystemFlag.APPEND_SYNCHRONOUS,
		FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS
	];

	/**
	 *
	 * An array of all the asynchronous reading flags.
	 *
	 * @type {Array<FileSystemFlag>}
	 * @private
	 * @static
	 * @readonly
	 *
	 */
	static readonly #ASYNCHRONOUS_READ_FLAGS: Array<FileSystemFlag> = [
		FileSystemFlag.APPEND_AND_READ,
		FileSystemFlag.APPEND_AND_READ_ONLY_EXISTING,
		FileSystemFlag.READ,
		FileSystemFlag.READ_AND_WRITE,
		FileSystemFlag.WRITE_AND_READ,
		FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING
	];

	/**
	 *
	 * An array of all the synchronous reading flags.
	 *
	 * @type {Array<FileSystemFlag>}
	 * @private
	 * @static
	 * @readonly
	 * @since Version 0.1.0
	 *
	 */
	static readonly #SYNCHRONOUS_READ_FLAGS: Array<FileSystemFlag> = [
		FileSystemFlag.APPEND_AND_READ_SYNCHRONOUS,
		FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS
	];

	/**
	 *
	 * An array of all the asynchronous writing flags.
	 *
	 * @type {Array<FileSystemFlag>}
	 * @static
	 * @readonly
	 * @since Version 0.1.0
	 *
	 */
	static readonly #ASYNCHRONOUS_WRITE_FLAGS: Array<FileSystemFlag> = [
		FileSystemFlag.READ_AND_WRITE,
		FileSystemFlag.WRITE,
		FileSystemFlag.WRITE_ONLY_NON_EXISTING,
		FileSystemFlag.WRITE_AND_READ,
		FileSystemFlag.WRITE_AND_READ_ONLY_NON_EXISTING
	];

	/**
	 *
	 * An array of all the synchronous writing flags.
	 *
	 * @type {Array<FileSystemFlag>}
	 * @private
	 * @static
	 * @readonly
	 * @since Version 0.1.0
	 *
	 */
	static readonly #SYNCHRONOUS_WRITE_FLAGS: Array<FileSystemFlag> = [
		FileSystemFlag.READ_AND_WRITE_SYNCHRONOUS
	];

	/**
	 *
	 * Private constructor used to create the static file system flag values in the class.
	 *
	 * @param {string}           code A string representing the flag.
	 * @param {string}           text A string representing the flag in readable format.
	 * @param {Nilable<string>} flag A string representing the flag entity. Used by node.
	 * @private
	 * @constructor
	 * @since Version 0.1.0
	 *
	 */
	private constructor(code: string, text: string, flag: Nilable<string>) {
		super(code, text, FileSystemFlag.TYPE);
		this.#flag = flag;
	}

	/**
	 *
	 * Method used to get the FileSystemFlag that corresponds to the provided flag string.
	 *
	 * @param {string} flag The flag string to use to look up the FileSystemFlag with.
	 * @returns {FileSystemFlag} The FileSystemFlag associated with the provided flag. Returns
	 * {@link FileSystemFlag.NULL} if the provided flag is null, or {@link FileSystemFlag.UNKNOWN_FLAG} if an
	 * unknown flag is provided.
	 * @throws {TypeError} An error is thrown if the provided value is not a string.
	 * @since Version 0.1.0
	 *
	 */
	public static getFileSystemFlag(flag: Nilable<string>): FileSystemFlag {
		// Validate
		if (isNullOrUndefined(flag)) {
			return FileSystemFlag.NULL;
		} else if (isNotString(flag)) {
			throw new TypeError(`Cannot get FileSystemFlag with type: ${getType(flag)}; Must be of type string`);
		}

		return this.MAP.get(flag.toLowerCase()) || FileSystemFlag.UNKNOWN_FLAG;
	}

	/**
	 *
	 * Gets al the fields associated with the FileSystemFlag entity.
	 *
	 * @returns {Array<string>} An array of the fields used by the FileSystemFlag class.
	 * @protected
	 * @since Version 0.1.0
	 *
	 */
	protected getFields(): Array<string> {
		return ["code", "text", "type", "string"];
	}

	/**
	 *
	 * Indicates if the flag can perform appending operations.
	 *
	 * @returns {boolean} True if the flag can perform appending operations, otherwise false.
	 * @since Version 0.1.0
	 *
	 */
	public canAppend(): boolean {
		return ((FileSystemFlag.#ASYNCHRONOUS_APPEND_FLAGS.includes(this))
			|| (FileSystemFlag.#SYNCHRONOUS_APPEND_FLAGS.includes(this)));
	}

	/**
	 *
	 * Indicates if the flag can perform reading operations.
	 *
	 * @returns {boolean} True if the flag can perform reading operations, otherwise false.
	 * @since Version 0.1.0
	 *
	 */
	public canRead(): boolean {
		return ((FileSystemFlag.#ASYNCHRONOUS_READ_FLAGS.includes(this))
			|| (FileSystemFlag.#SYNCHRONOUS_READ_FLAGS.includes(this)));
	}

	/**
	 *
	 * Indicates if the flag can perform writing operations.
	 *
	 * @returns {boolean} True if the flag can perform writing operations, otherwise false.
	 * @since Version 0.1.0
	 *
	 */
	public canWrite(): boolean {
		return ((FileSystemFlag.#ASYNCHRONOUS_WRITE_FLAGS.includes(this))
			|| (FileSystemFlag.#SYNCHRONOUS_WRITE_FLAGS.includes(this)));
	}

	/**
	 *
	 * Indicates if the flag is asynchronous.
	 *
	 * @returns {boolean} True if the flag is asynchronous, otherwise false.
	 * @since Version 0.1.0
	 *
	 */
	public isAsynchronous(): boolean {
		return ((FileSystemFlag.#ASYNCHRONOUS_APPEND_FLAGS.includes(this))
			|| (FileSystemFlag.#ASYNCHRONOUS_READ_FLAGS.includes(this))
			|| (FileSystemFlag.#ASYNCHRONOUS_WRITE_FLAGS.includes(this)));
	}

	/**
	 *
	 * Indicates if the flag is synchronous.
	 *
	 * @returns {boolean} True if the flag is synchronous, otherwise false.
	 * @since Version 0.1.0
	 *
	 */
	public isSynchronous(): boolean {
		return ((FileSystemFlag.#SYNCHRONOUS_APPEND_FLAGS.includes(this))
			|| (FileSystemFlag.#SYNCHRONOUS_READ_FLAGS.includes(this))
			|| (FileSystemFlag.#SYNCHRONOUS_WRITE_FLAGS.includes(this)));
	}

	/**
	 *
	 * Indicates if the flag is null or not.
	 *
	 * @returns {boolean} True if the flag is null, otherwise false.
	 * @since Version 0.1.0
	 *
	 */
	public isNull(): boolean { return this === FileSystemFlag.NULL; }

	/**
	 *
	 * Indicates if the flag is unknown or not.
	 *
	 * @returns {boolean} True if the flag is unknown, otherwise false.
	 * @since Version 0.1.0
	 *
	 */
	public isUnknown(): boolean { return this === FileSystemFlag.UNKNOWN_FLAG; }

	/**
	 *
	 * Gets the flag in a format that is usable by node.
	 *
	 * @returns {Nilable<string>}
	 * @since Version 0.1.0
	 *
	 */
	get flag(): Nilable<string> { return this.#flag; }

}
