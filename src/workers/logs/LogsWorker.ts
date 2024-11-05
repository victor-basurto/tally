import Tally, { EmailTally } from '../../Tally';
import Logs from '../../Logs';
import Consumer from '../../streams/Consumer';
import EventHandler from '../../streams/EventHandler';
import Producer from '../../streams/Producer';

/**
 * This worker listens for events posted into the "Logs" stream. For each event posted into the stream,
 * this worker creates and posts a tally object into the "Tallies" stream.
 */
export default class LogsWorker implements EventHandler<Logs> {
	// Consumer of the "Logs" stream.
	consumer = new Consumer<Logs>('Logs', this);

	// Producer for the "Tallies" stream.
	producer = new Producer<Tally>('Tallies');

	/**
	 * Create a tally object of all the email addresses in the logs data and post it to the "Tallies" stream.
	 *
	 * @param data The parsed contents of a logs file.
	 */
	handleEvent(data: Logs): void {
		const { id, logs } = data;
		// This variable will map email addresses (keys) to their corresponding totals (values).
		const totals = new Map<string, number>();

		// For each `email` in the `logs` array, increment its corresponding total in the `totals` map.
		logs.forEach((log) => {
			const { email } = log;
			const total = totals.get(email) || 0;

			totals.set(email, total + 1);
		});

		// Convert entries in the `totals` map into an array of `EmailTally` objects.
		const tally: EmailTally[] = [...totals].map((entry) => {
			// Each `entry` is an array of key/value pairs.
			const [email, total] = entry;

			return { email, total };
		});

		// Post the result to the "Tallies" stream.
		const result: Tally = { logsId: id, tally };
		this.producer.postEvent(result);
	}
}