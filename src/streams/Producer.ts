import { BroadcastChannel } from 'worker_threads';
import Topic from './Topic';

/**
 * Stream producer.
 */
export default class Producer<T> {
	/**
	 * The stream that this producer will post events into.
	 */
	stream: BroadcastChannel;

	/**
	 * Initializes the stream.
	 *
	 * @param topic The name of the stream.
	 */
	constructor(topic: Topic) {
		this.stream = new BroadcastChannel(topic);
	}

	/**
	 * Posts an event into the producer's stream.
	 *
	 * @param event The event to post into the stream.
	 */
	postEvent(event: T): void {
		this.stream.postMessage(event);
	}
}