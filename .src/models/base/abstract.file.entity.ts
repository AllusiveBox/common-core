import * as fs from "fs";
import AbstractSystemEntity from "./abstract.system.entity";
import { IFile } from "../interfaces";
import { Nullable } from "../../types";
import { FileSystemError } from "../../errors";
import { FileSystemFlag } from "../index";
import { isNotNullOrUndefined, isNullOrUndefined } from "../../utils/types.util";

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
	 * @param {string} fileName The name of the file that was opened.
	 * @param {number} data     The file descriptor assigned to the file by the system.
	 * @since Version 0.1.0
	 *
	 */
	open: (fileName: string, data?: Nullable<number>) => void;

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
 * @implements IFile
 * @since Version 0.1.0
 *
 */
export default abstract class AbstractFileEntity extends AbstractSystemEntity<AbstractFileEvents>
	implements IFile {

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
	 * The file descriptor used by the file system to differentiate between files.
	 *
	 * @type {Nullable<number>}
	 * @private
	 *
	 */
	#fileNumber: Nullable<number>;

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
	 * Builds the full file path for a file based off location and full name.
	 *
	 * @returns {string}
	 * @private
	 * @since Version 0.1.0
	 *
	 */
	#getFullPath(): string { return `${this.location}/${this.fullName}`}

	/**
	 *
	 * Creates the file in the file system. If any content is provided, it is written into the file.
	 *
	 * @param {Nullable<any>} content The contents of the file that is being created in the system.
	 * @returns {Promise<AbstractFileEntity>} The file after it is created in the system.
	 * @throws {FileSystemError} An error is thrown if the file already exists in the system at the specified location.
	 * @throws {Error} An error is thrown if there process is unable to write to the file system.
	 * @since Version 0.1.0
	 *
	 */
	public async create(content?: Nullable<any>): Promise<AbstractFileEntity> {
		// Validate
		if (this.exists) {
			throw new FileSystemError(`Unable to create ${this.name}; File already exists`);
		}

		fs.writeFile(this.#getFullPath(), content, (error) => {
			if (error)
				throw error;

		});

		this.#content = content;
		this.emit("create", content);

		return this;
	}

	/**
	 *
	 * Closes the file, if it is open.
	 *
	 * @returns {Promise<AbstractFileEntity>}
	 * @throws {FileSystemError} An error is thrown if the file does not exist.
	 * @throws {FileSystemError} An error is thrown if the process is unable to determine the file descriptor.
	 * @throws {Error} An error is thrown if there process is unable to write to the file system.
	 * @since Version 0.1.0
	 *
	 */
	public async close(): Promise<AbstractFileEntity> {
		// Validate
		if ((this.isOpen)
			&& (this.exists)
			&& (isNotNullOrUndefined(this.#fileNumber))) {

			await fs.close(this.#fileNumber, (error) => {
				if (error) throw error;

				this.#fileNumber = null;
			});

			this.emit("close", this.name);
		} else if (!this.exists) {
			throw new FileSystemError(`Unable to close ${this.name}; File does not exist`);
		} else if (isNullOrUndefined(this.#fileNumber)) {
			throw new FileSystemError(`Unable to close ${this.name}; Unable to determine file descriptor`);
		}

		return this;
	}

	/**
	 *
	 * Deletes the file from the system.
	 *
	 * @returns {Promise<void>}
	 * @throws {FileSystemError} An error is thrown if the file is currently open.
	 * @throws {FileSystemError} An error is thrown if the file does not exist.
	 * @throws {Error} An error is thrown if there process is unable to write to the file system.
	 * @since Version 0.1.0
	 *
	 */
	public async delete(): Promise<void> {
		if ((this.isOpen)
			&& (this.exists)) {

			throw new FileSystemError(`Unable to delete ${this.name}; File is currently open`);
		} else if (!this.exists) {
			throw new FileSystemError(`Unable to delete ${this.name}; File does not exist`);
		}

		await fs.unlink(this.#getFullPath(), (error) => {
			if (error) throw error;
		});

		this.emit("delete", this.name);
	}

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
	 * Opens the file, if it exists
	 *
	 * @returns {Promise<AbstractFileEntity>} The file after it has been opened.
	 * @throws {FileSystemError} An error is thrown if the file does not exist.
	 * @throws {Error} An error is thrown if there process is unable to write to the file system.
	 * @since Version 0.1.0
	 *
	 */
	public async open(flag: FileSystemFlag): Promise<AbstractFileEntity> {
		// Validate
		if ((!this.isOpen)
			&& (this.exists)) {

			await fs.open(this.#getFullPath(), flag.flag || "r", (error, file) => {
				if (error) throw error;

				this.fileNumber = file;
			});

			this.emit("open", this.name, this.fileNumber);
		} else if (!this.exists) {
			throw new FileSystemError(`Unable to open ${this.name}; File does not exist`);
		}

		return this;
	}

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
	 * Gets the file number.
	 *
	 * @returns {Nullable<number>}
	 * @protected
	 * @since Version 0.1.0
	 *
	 */
	protected get fileNumber(): Nullable<number> { return this.#fileNumber; }

	/**
	 *
	 * Sets the file number.
	 *
	 * @param {number} arg
	 * @protected
	 * @since Version 0.1.0
	 *
	 */
	protected set fileNumber(arg: Nullable<number>) { this.#fileNumber = arg; }

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
