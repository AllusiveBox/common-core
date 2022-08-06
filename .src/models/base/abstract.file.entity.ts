import * as fs from "fs";
import AbstractSystemEntity from "./abstract.system.entity";
import { Nullable } from "../../types";

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
	 * Abstract method to create a new file in the system and fill it with the supplied content.
	 *
	 * @param {Nullable<any>} contents The contents of the file that is being created in the system.
	 * @returns {Promise<AbstractFileEntity>} The file after it is created in the system.
	 * @abstract
	 * @since Version 0.1.0
	 *
	 */
	public abstract create(contents?: Nullable<any>): Promise<AbstractFileEntity>;


	/**
	 *
	 * Abstract method that closes an opened file.
	 *
	 * @returns {Promise<void>}
	 * @abstract
	 * @since Version 0.1.0
	 *
	 */
	public abstract close(): Promise<void>;

	/**
	 *
	 * Abstract method that deletes a file.
	 *
	 * @returns {Promise<void>}
	 * @abstract
	 * @since Version 0.1.0
	 *
	 */
	public abstract delete(): Promise<void>;

	/**
	 *
	 * Abstract method that moves a file to another location in the file system.
	 *
	 * @param {string} location The location to move the file to.
	 * @returns {Promise<AbstractFileEntity>} The file after it has been moved.
	 * @abstract
	 * @since Version 0.1.0
	 *
	 */
	public abstract move(location: string): Promise<AbstractFileEntity>;

	/**
	 *
	 * Abstract method for opening files.
	 *
	 * @returns {Promise<AbstractFileEntity>} The file after it has been opened.
	 * @abstract
	 * @since Version 0.1.0
	 *
	 */
	public abstract open(): Promise<AbstractFileEntity>;

	/**
	 *
	 * Abstract method for reading the contents of a file.
	 *
	 * @returns {Promise<AbstractFileEntity>} The file after it has been read.
	 * @abstract
	 * @since Version 0.1.0
	 *
	 */
	public abstract read(): Promise<AbstractFileEntity>;

	/**
	 *
	 * Abstract method for renaming a file.
	 *
	 * @param {string} fileName The new name for the file.
	 * @returns {Promise<AbstractFileEntity>} The file after it has been renamed.
	 * @abstract
	 * @since Version 0.1.0
	 *
	 */
	public abstract rename(fileName: string): Promise<AbstractFileEntity>;

	/**
	 *
	 * Writes to a file. Overwrites anything in the file.
	 *
	 * @param {any} content The contents to write to the file.
	 * @returns {Promise<AbstractFileEntity>} The file after it has been written to.
	 * @abstract
	 * @since Version 0.1.0
	 *
	 */
	public abstract write(content: any): Promise<AbstractFileEntity>;

	/**
	 *
	 * Updates the contents of a file.
	 * @param {any} content The content to update the file with.
	 * @returns {Promise<AbstractFileEntity>} The file after it has been updated.
	 * @abstract
	 * @since Version 0.1.0
	 *
	 */
	public abstract update(content: any): Promise<AbstractFileEntity>;

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

	/**
	 *
	 * Sets the file open flag.
	 *
	 * @param {boolean} arg
	 * @protected
	 * @since Version 0.1.0
	 *
	 */
	protected set isOpen(arg: boolean) { this.#isOpen = arg; }

}
