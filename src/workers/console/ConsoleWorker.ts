import Consumer from '../../streams/Consumer';
import EventHandler from '../../streams/EventHandler';
import Topic from '../../streams/Topic';

/**
 * This worker listens for events posted into the specified stream.
 * Each event posted into the stream is printed out to the console.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class ConsoleWorker<T = any> implements EventHandler<T> {
	consumer: Consumer<T>;
	
	/**
	 * @param topic Name of the stream.
	 */
	constructor(topic: Topic) {
		this.consumer = new Consumer<T>(topic, this);
	}

	/**
	 * Prints the event to the console.
	 *
	 * @param event The stream event.
	 */
	handleEvent(event: T): void {
		console.log(event);
	}
}