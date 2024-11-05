/**
 * Event handler interface.
 */
export default interface EventHandler<T> {
	handleEvent(event: T): void;
}