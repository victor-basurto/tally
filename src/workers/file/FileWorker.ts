import Logs from '../../Logs';
import Consumer from '../../streams/Consumer';
import EventHandler from '../../streams/EventHandler';
import Producer from '../../streams/Producer';

/**
 * This worker processes the raw contents (strings) of log files.
 */
export default class FileWorker implements EventHandler<string> {
	// Consumer of the "Files" stream.
	consumer = new Consumer<string>('Files', this);

	// Producer for the "Logs" stream.
	producer = new Producer<Logs>('Logs');

	/**
	 * Parse the contents of a log file and post it into the "Logs" stream.
	 *
	 * @param json Contents of log files.
	 */
	handleEvent(json: string): void {
		const logs = JSON.parse(json) as Logs;
		this.producer.postEvent(logs);
	}
}