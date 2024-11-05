import Tally, { EmailTally } from '../../Tally';
import Consumer from '../../streams/Consumer';
import EventHandler from '../../streams/EventHandler';
import Producer from '../../streams/Producer';

/**
 * This worker listens for events posted into the "Tallies" stream.
 * For each event posted into the stream, this worker updates its internal global tally.
 * The global tally can be posted to the "Global Tally" stream by calling the `postTally` method.
 */
export default class TallyWorker implements EventHandler<Tally> {
	// Consumer of the "Tallies" stream.
	consumer = new Consumer<Tally>('Tallies', this);

	// Producer for the "Global Tally" stream.
	producer = new Producer<Tally>('Global Tally');

	/**
	 * Global tally. This variable maps email addresses (keys) to their corresponding totals (values).
	 */
	totals = new Map<string, number>();

	/**
	 * Update the global tally every time a new event (from the "Tallies" stream) is received.
	 *
	 * @param data A `Tally` object.
	 */
	handleEvent(data: Tally): void {
		const { tally } = data;

		// For each `email` in the `tally` array, update its corresponding total in the `totals` map.
		tally.forEach((emailTally) => {
			const { email, total } = emailTally;
			const currentTotal = this.totals.get(email) || 0;
			const newTotal = currentTotal + total;

			this.totals.set(email, newTotal);
		});
	}
	
	/**
	 * Posts the current global tally into the "Global Tally" stream.
	 */
	postTally(): void {
		// Convert entries in the `totals` map into an array of `EmailTally` objects.
		const tally: EmailTally[] = [...this.totals].map((entry) => {
			// Each `entry` is an array of key/value pairs.
			const [email, total] = entry;
	
			return { email, total };
		});
	
		// Post the result to the "Global Tally" stream.
		const result: Tally = { tally };
		this.producer.postEvent(result);
	}
}