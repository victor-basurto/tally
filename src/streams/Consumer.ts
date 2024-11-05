import { BroadcastChannel } from 'worker_threads';
import EventHandler from './EventHandler';
import Topic from './Topic';

/**
 * Stream consumer.
 */
export default class Consumer<T> {
	/**
	 * The stream that this consumer is subscribed to.
	 */
	stream: BroadcastChannel;

	/**
	 * Initializes the stream and sets up the event callback to notify the event handler.
	 *
	 * @param topic The name of the stream that this consumer should subscribe to.
	 * @param eventHandler The event handler that will handle all the stream events.
	 */
	constructor(topic: Topic, eventHandler: EventHandler<T>) {
		this.stream = new BroadcastChannel(topic);
		this.stream.onmessage = (message: unknown) => {
			const event = (message as MessageEvent<T>).data;
			eventHandler.handleEvent(event);
		};
	}
}