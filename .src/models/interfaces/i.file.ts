import { Nullable } from "../../types";
import { FileSystemFlag } from "../index";

/**
 *
 * Interface to define the core functionality of a file class.
 *
 * @interface IFile
 * @since Version 0.1.0
 *
 */
export default interface IFile {

	/**
	 *
	 * Creates the file.
	 *
	 * @param {Nullable<any>} content The content to write to the file when it is created.
	 * @returns {Promise<IFile>}
	 * @since Version 0.1.0
	 *
	 */
	create(content?: Nullable<any>): Promise<IFile>;

	/**
	 *
	 * Closes the file.
	 *
	 * @returns {Promise<IFile>}
	 * @since Version 0.1.0
	 *
	 */
	close(): Promise<IFile>;

	/**
	 *
	 * Deletes the file.
	 *
	 * @returns {Promise<void>}
	 * @since Version 0.1.0
	 *
	 */
	delete(): Promise<void>;

	/**
	 *
	 * Moves the file.
	 *
	 * @param {string} location The new file location.
	 * @returns {Promise<IFile>}
	 * @since Version 0.1.0
	 *
	 */
	move(location: string): Promise<IFile>;

	/**
	 *
	 * Opens the file.
	 *
	 * @returns {Promise<IFile>}
	 * @since Version 0.1.0
	 *
	 */
	open(flag: FileSystemFlag): Promise<IFile>;

	/**
	 *
	 * Reads the contents of the file.
	 *
	 * @returns {Promise<IFile>}
	 * @since Version 0.1.0
	 *
	 */
	read(): Promise<IFile>;

	/**
	 *
	 * Renames the file.
	 *
	 * @param {string} fileName The new file name.
	 * @returns {Promise<IFile>}
	 * @since Version 0.1.0
	 *
	 */
	rename(fileName: string): Promise<IFile>;

	/**
	 *
	 * Writes to the file.
	 *
	 * @param {string} content The file content to write.
	 * @returns {Promise<IFile>}
	 * @since Version 0.1.0
	 *
	 */
	write(content: string): Promise<IFile>;

	/**
	 *
	 * Updates the contents of the file.
	 *
	 * @param {string} content The content to update the file with.
	 * @returns {Promise<IFile>}
	 * @since Version 0.1.0
	 *
	 */
	update(content: string): Promise<IFile>;

}
