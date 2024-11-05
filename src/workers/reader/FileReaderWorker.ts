import { resolve } from 'path';
import { readdir, readFile } from 'fs/promises';
import Producer from '../../streams/Producer';

/**
 * This worker reads log files in the specified directory and posts their contents to the "Files" stream.
 */
export default class FileReaderWorker {
	// Producer for the "Files" stream.
	producer = new Producer<string>('Files');

	/**
	 * Reads all the files in the specified directory and posts their contents to the "Files" stream.
	 *
	 * @param directory Full path to the directory containing the log files.
	 */
	async start(directory: string) {
		const files = await readdir(directory);

		for (const file of files) {
			const fullPath = resolve(directory, file);
			const json = await readFile(fullPath, 'utf-8');

			this.producer.postEvent(json);
		}
	}
}