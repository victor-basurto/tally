/**
 * This interface represents an individual log event.
 */
export interface Log {
	id: string;
	email: string;
	message: string;
}

/**
 * This interface represents a collection of logs.
 */
export default interface Logs {
	id: string;
	logs: Log[];
}