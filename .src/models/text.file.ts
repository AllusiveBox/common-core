import * as fs from "fs";
import { AbstractFileEntity } from "./base";
import { Nullable } from "../types";
import { FileSystemError } from "../errors";
import { isDate, isNotString, isNullOrUndefined, isObject } from "../utils/types.util";
import { isEmptyString } from "../utils/string.util";

/**
 *
 * Class that represents text files in the operating system.
 *
 * @class TextFile
 * @extends AbstractFileEntity
 * @since Version 0.1.0
 *
 */
export default class TextFile extends AbstractFileEntity {

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
	protected static readonly TYPE: string = "TextFile";

	/**
	 *
	 * The file's type extension.
	 *
	 * @type {string}
	 * @protected
	 * @readonly
	 * @since Version 0.1.0
	 *
	 */
	protected readonly extension: string = ".txt";

	/**
	 *
	 * Creates a new text file in the file system.
	 *
	 * @param {string}           name     The file's name.
	 * @param {Nullable<string>} location The location of the file in the system.
	 * @constructor
	 * @since Version 0.1.0
	 *
	 */
	constructor(
		name: string,
		location?: Nullable<string>
	) {
		super(name, location);
		this.content = "";
	}

	/**
	 *
	 * Creates the file in the file system. If any content is provided, it is written into the file.
	 *
	 * @param {Nullable<any>} content The contents of the file that is being created in the system.
	 * @returns {Promise<AbstractFileEntity>} The file after it is created in the system.
	 * @throws {FileSystemError} If the file already exists in the system at the specified location.
	 * @throws {Error} If the process is unable to write to the file system.
	 * @since Version 0.1.0
	 *
	 */
	public async create(
		content?: Nullable<any>
	): Promise<TextFile> {
		// Validate
		if (this.exists) {
			throw new FileSystemError(`Unable to create ${this.name}; File already exists`);
		}

		fs.writeFile(this.fullPath, content, (error) => {
			if (error)
				throw error;

		});

		this.content = content;
		this.emit("create", content);

		return this;
	}

	/**
	 *
	 * Reads the contents of the file and stores it in memory to be accessed through the `content` property.
	 *
	 * @returns {Promise<TextFile>} The file after it has had its contents read.
	 * @throws {FileSystemError} If the file is not already open.
	 * @throws {FileSystemError} If the file does not exist.
	 * @throws {Error} If the process is unable to read the file for any reason.
	 * @since Version 0.1.0
	 *
	 */
	public async read(): Promise<TextFile> {
		// Validate
		if (!this.isOpen) {
			throw new FileSystemError(`Unable to read ${this.name}; File is not open`);
		} else if (!this.exists) {
			throw new FileSystemError(`Unable to read ${this.name}; File does not exist`);
		}

		await fs.readFile(this.fullPath, (error, data) => {
			if (error) throw error;

			this.content = data.toString();
		});

		this.emit("read", this.name, this.content);
		return this;
	}

	/**
	 *
	 * Writes to the file with the specified content provided and stores the written content in memory.
	 *
	 * @param {Nullable<string>} content The content to write to the file.
	 * @returns {Promise<TextFile>} The file after it has had content written to it.
	 * @throws {FileSystemError} If the file is not open.
	 * @throws {FileSystemError} If the file does not exist.
	 * @throws {Error} If the process is unable to write to the system for any reason.
	 * @since Version 0.1.0
	 *
	 */
	public async write(
		content?: Nullable<string>
	): Promise<TextFile> {
		if (!this.isOpen) {
			throw new FileSystemError(`Unable to write to ${this.name}; File is not open`);
		} else if (!this.exists) {
			throw new FileSystemError(`Unable to write to ${this.name}; File does not exist`);
		}

		let contentString: string;
		if (isNullOrUndefined(content)) {
			contentString = "";
		} else if (isObject(content)) {

			contentString = JSON.stringify(content);
		} else if (isNotString(content)) {

			contentString = `${content}`;
		} else {
			contentString = content;
		}

		// Grab the old content and keep in memory, so it can be included in the event data
		const oldContent = this.content;

		await fs.writeFile(this.fullPath, contentString, "utf-8", (error) => {
			if (error) throw error;

			// Only attempt to assign the content if write operation doesn't fail
			this.content = contentString;
		});

		this.emit("contentChange", this.name, oldContent, this.content);
		return this;
	}

	/**
	 *
	 * Updates the content of a file and stores the updated content in memory.
	 *
	 * @param {string} content The content to write to the file.
	 * @returns {Promise<TextFile>} The file after its contents have been updated.
	 * @throws {FileSystemError} If the file is not open.
	 * @throws {FileSystemError} If the file does not exist.
	 * @throws {FileSystemError} If the content is null, undefined, or an empty string.
	 * @since Version 0.1.0
	 *
	 */
	public async update(
		content: string
	): Promise<TextFile> {
		if (!this.isOpen) {
			throw new FileSystemError(`Unable to update ${this.name}; File is not open`);
		} else if (!this.exists) {
			throw new FileSystemError(`Unable to update ${this.name}; File does not exist`);
		} else if ((isNullOrUndefined(content))
			|| (isEmptyString(content))) {

			throw new FileSystemError(`Unable to update ${this.name}; No content provided`);
		}

		let contentString: string;
		if (isDate(content)) {
			contentString = `${content.toISOString()} `;
		} else if (isObject(content)) {
			contentString = `${JSON.stringify(content)} `;
		} else if (isNotString(content)) {
			contentString = `${content} `;
		} else {
			contentString = content;
		}

		await fs.appendFile(this.fullPath, contentString, "utf-8", (error) => {
			if (error) throw error;

			// Only attempt to update the content if the update operation doesn't fail
			this.content += contentString;
		});

		this.emit("contentUpdated", this.name);
		return this;
	}

	toString(): string { return `${TextFile.TYPE}:${this.fullName}`; }

}
