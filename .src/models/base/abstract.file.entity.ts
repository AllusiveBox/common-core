import * as fs from "fs";
import AbstractSystemEntity from "./abstract.system.entity";
import {
	FileSystemFlag,
	Nullable
} from "../../../.src";

/**
 *
 * Interface that describes the events associated with the {@link AbstractFileEvents} class.
 *
 * @interface AbstractFileEvents
 * @since Version 0.1.0
 *
 */
interface AbstractFileEvents {

	/**
	 *
	 * Event fired when a file is created.
	 *
	 * @event AbstractFileEntity#create
	 * @param {string}        fileName The name of the file that was created.
	 * @param {Nullable<any>} data     The data inserted into the file on creation. If a file was simply created and
	 * nothing was added, this will be null.
	 * @returns {void}
	 * @since Version 0.1.0
	 *
	 */
	create: (fileName: string, data?: Nullable<any>) => void;

	/**
	 *
	 * Event fired when a file is closed.
	 *
	 * @event AbstractFileEntity#close
	 * @param {string} fileName The name of the file that was closed.
	 * @returns {void}
	 * @since Version 0.1.0
	 *
	 */
	close: (fileName: string) => void;

	/**
	 *
	 * Event fired when a file has its content changed.
	 *
	 * @event AbstractFileEntity#contentChange
	 * @param {string} fileName   The name of the file that was changed.
	 * @param {any}    oldContent The old content in the file.
	 * @param {any}    newContent The new content in the file.
	 * @returns {void}
	 * @since Version 0.1.0
	 *
	 */
	contentChange:(fileName: string, oldContent: any, newContent: any) => void;

	/**
	 *
	 * Event fired when a file is deleted.
	 *
	 * @event AbstractFileEntity#delete
	 * @param {string} fileName The name of the file that was deleted.
	 * @returns {void}
	 * @since Version 0.1.0
	 *
	 */
	delete: (fileName: string) => void;

	/**
	 *
	 * Event fired when a file is moved.
	 *
	 * @event AbstractFileEntity#fileMoved
	 * @param {string} fileName
	 * @param {string} oldLocation
	 * @param {string} newLocation
	 * @returns {void}
	 * @since Version 0.1.0
	 *
	 */
	fileMoved: (fileName: string, oldLocation: string, newLocation: string) => void;

	/**
	 *
	 * Event fired when a file is renamed.
	 *
	 * @event AbstractFileEntity#fileRenamed
	 * @param {string} oldFileName The file's old name.
	 * @param {string} newFileName The file's new name.
	 * @returns {void}
	 * @since Version 0.1.0
	 *
	 */
	fileRenamed: (oldFileName: string, newFileName: string) => void;

	/**
	 *
	 * Event fired when a file is opened.
	 *
	 * @event AbstractFileEntity#open
	 * @param {string}        fileName The name of the file that was opened.
	 * @param {Nullable<any>} data     The contents of the file. If the file has no contents, this will be null.
	 * @since Version 0.1.0
	 *
	 */
	open: (fileName: string, data?: Nullable<any>) => void;

	/**
	 *
	 * Event fired when a file is read.
	 *
	 * @event AbstractFileEntity#read
	 * @param {string}        fileName The name of the file that is being read.
	 * @param {Nullable<any>} content  The contents of the file. If the file is empty, this will be null.
	 * @since Version 0.1.0
	 *
	 */
	read: (fileName: string, content: Nullable<any>) => void;

}

/**
 *
 * Interface that describes the object used by the {@link AbstractFileEntity#operate} method.
 *
 * @interface OperationOptions
 * @since Version 0.1.0
 *
 */
export interface OperationOptions {

	/**
	 *
	 * The system flag to use when performing the operation.
	 *
	 * @type {Nullable<FileSystemFlag>}
	 * @since Version 0.1.0
	 *
	 */
	flag?: Nullable<FileSystemFlag>;

	/**
	 *
	 * The data to use when performing the operation.
	 *
	 * @type {Nullable<any>}
	 * @since Version 0.1.0
	 *
	 */
	data?: Nullable<any>;

	/**
	 *
	 * Indicates the type of event being performed.
	 *
	 * @type {keyof AbstractFileEvents}
	 * @since Version 0.1.0
	 *
	 */
	event: keyof AbstractFileEvents;

}

/**
 *
 * Abstract class for file based entities in the operating system.
 *
 * @class AbstractFileEntity
 * @extends AbstractSystemEntity
 * @since Version 0.1.0
 *
 */
export default abstract class AbstractFileEntity extends AbstractSystemEntity<AbstractFileEvents> {

	/**
	 *
	 * Static string indicating the typing information for the entity.
	 *
	 * @type {string}
	 * @protected
	 * @static
	 * @readonly
	 * @since Version 0.1.0
	 *
	 */
	protected static readonly TYPE: string = "File";

	/**
	 *
	 * The file's extension.
	 *
	 * @type {string}
	 * @protected
	 * @abstract
	 * @readonly
	 * @since Version 0.1.0
	 *
	 */
	 protected abstract readonly extension: string;

	/**
	 *
	 * The content of the file.
	 *
	 * @type {any}
	 * @private
	 * @since Version 0.1.0
	 *
	 */
	#content: any;

	/**
	 *
	 * Flag indicating if the file is open.
	 *
	 * @type {boolean}
	 * @private
	 * @since Version 0.1.0
	 *
	 */
	#isOpen: boolean;

	/**
	 *
	 * Abstract constructor. Sets the {@link fullName} for the file entity.
	 *
	 * @param {string}           name     The file's name.
	 * @param {Nullable<string>} location The location of the file in the system.
	 * @protected
	 * @constructor
	 * @since Version 0.1.0
	 *
	 */
	protected constructor(
		name: string,
		location?: Nullable<string>
	) {
		super(name, location);

		/*
			The content should be null until:
				* The file is created and content is added on creation.
				* It's read in using the read method.
				* Set with the write method.
				* It is updated with the update method.
		 */
		this.#content = null;
		this.#isOpen = false;
	}

	/**
	 *
	 * Checks if the file exists.
	 *
	 * @returns {boolean} True if the file exists, otherwise false.
	 * @private
	 * @since Version 0.1.0
	 *
	 */
	#checkIfFileExists(): boolean {
		return fs.existsSync(`${this.location}/${this.fullName}`);
	}

	/**
	 *
	 * Builds the full name for a file based off the file name and the extension.
	 *
	 * @returns {string}
	 * @private
	 * @since Version 0.1.0
	 *
	 */
	#getFullName(): string { return this.name + this.extension; }

	/**
	 *
	 * Abstract method to handle file operations.
	 *
	 * @param {OperationOptions} options The options to use when performing the operation.
	 * @returns {Promise<void>} Returns the results of the operation.
	 * @protected
	 * @abstract
	 * @template T
	 * @since Version 0.1.0
	 *
	 */
	protected abstract operate(options: OperationOptions): Promise<void>;

	/**
	 *
	 * Creates a new file in the system and fills it with the supplied content, if any.
	 *
	 * @param {Nullable<any>} contents The contents of the file that is being created in the system.
	 * @returns {Promise<AbstractFileEntity>} The file after it is created in the system.
	 * @since Version 0.1.0
	 *
	 */
	public async create(contents?: Nullable<any>): Promise<AbstractFileEntity> {
		await this
			.operate({ event: "create", data: contents, flag: FileSystemFlag.WRITE_ONLY_NON_EXISTING });
		return this;
	}


	/**
	 *
	 * Closes an opened file.
	 *
	 * @returns {Promise<void>}
	 * @since Version 0.1.0
	 *
	 */
	public async close(): Promise<void> {
		await this.operate({ event: "close" });
		this.#isOpen = false;
	}

	/**
	 *
	 * Deletes a file from the system, as well as all the contents of the instance.
	 *
	 * @returns {Promise<void>}
	 * @since Version 0.1.0
	 *
	 */
	public async delete(): Promise<void> {
		await this.operate({ event: "delete" });
	}

	/**
	 *
	 * Moves a file to another location in the file system.
	 *
	 * @param {string} location The location to move the file to.
	 * @returns {Promise<AbstractFileEntity>} The file after it has been moved.
	 * @since Version 0.1.0
	 *
	 */
	public async move(location: string): Promise<AbstractFileEntity> {
		await this
			.operate({ event: "fileMoved", data: location, flag: FileSystemFlag.WRITE_ONLY_NON_EXISTING });
		return this;
	}

	/**
	 *
	 * Opens an existing file.
	 *
	 * @returns {Promise<AbstractFileEntity>} The file after it has been opened.
	 * @since Version 0.1.0
	 *
	 */
	public async open(): Promise<AbstractFileEntity> {
		await this.operate({ event: "open" });
		this.#isOpen = true;
		return this;
	}

	/**
	 *
	 * Reads from an existing file. Sets the {@link content} field with the results.
	 *
	 * @returns {Promise<AbstractFileEntity>} The file after it has been read.
	 * @since Version 0.1.0
	 *
	 */
	public async read(): Promise<AbstractFileEntity> {
		await this.operate({ event: "read", flag: FileSystemFlag.READ });
		return this;
	}

	/**
	 *
	 * Renames a file in the file system.
	 *
	 * @param {string} fileName The new name for the file.
	 * @returns {Promise<AbstractFileEntity>} The file after it has been renamed.
	 * @since Version 0.1.0
	 *
	 */
	public async rename(fileName: string): Promise<AbstractFileEntity> {
		await this.operate({ event: "fileRenamed", data: fileName });
		return this;
	}

	/**
	 *
	 * Writes to a file. Overwrites anything in the file.
	 *
	 * @param {any} content The contents to write to the file.
	 * @returns {Promise<AbstractFileEntity>} The file after it has been written to.
	 * @since Version 0.1.0
	 *
	 */
	public async write(content: any): Promise<AbstractFileEntity> {
		await this.operate({ event: "contentChange", data: content, flag: FileSystemFlag.WRITE });
		return this;
	}

	/**
	 *
	 * Updates the contents of a file.
	 * @param {any} content The content to update the file with.
	 * @returns {Promise<AbstractFileEntity>} The file after it has been updated.
	 * @since Version 0.1.0
	 *
	 */
	public async update(content: any): Promise<AbstractFileEntity> {
		await this.operate({ event: "contentChange", data: content, flag: FileSystemFlag.APPEND_ONLY_EXISTING });
		return this;
	}

	/**
	 *
	 * Gets the content of the file.
	 *
	 * @returns {any}
	 * @since Version 0.1.0
	 *
	 */
	get content(): any { return this.#content; }

	/**
	 *
	 * Sets the content of the file.
	 * @param {any} arg
	 * @protected
	 * @since Version 0.1.0
	 *
	 */
	protected set content(arg: any) { this.#content = arg; }

	/**
	 *
	 * Gets if the file exists in the file system.
	 *
	 * @returns {boolean} True if the file exists in the file system, otherwise false.
	 * @since Version 0.1.0
	 *
	 */
	get exists(): boolean { return this.#checkIfFileExists(); }

	/**
	 *
	 * Gets the file name plus the file extension.
	 *
	 * @returns {string}
	 * @since Version 0.1.0
	 *
	 */
	get fullName(): string { return this.#getFullName(); }

	/**
	 *
	 * Indicates if the file is open or not
	 *
	 * @returns {boolean}
	 * @since Version 0.1.0
	 *
	 */
	get isOpen(): boolean { return this.#isOpen; }

}
