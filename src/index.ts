import { resolve } from 'path';
import { Worker } from 'worker_threads';

/**
 * This function is used to pause the execution of an async function for an specified amount of time.
 *
 * @param timeout Number of milliseconds to wait.
 */
function pause(timeout: number): Promise<void> {
	return new Promise<void>((done) => {
		setTimeout(() => done(), timeout);
	});
}

/**
 * Starts all the workers.
 */
async function start() {
	// Start all workers.
	const fileReaderWorker = new Worker('./dist/workers/reader/index.js');
	const tallyWorker = new Worker('./dist/workers/tally/index.js');
	const workers: Worker[] = [
		fileReaderWorker,
		new Worker('./dist/workers/file/index.js'),
		new Worker('./dist/workers/logs/index.js'),
		tallyWorker,
		new Worker('./dist/workers/console/index.js'),
	];

	// Give the workers a second to initialize.
	await pause(1000);

	// Determine the full path to the logs directory and post it to the file reader worker.
	const directory = resolve(__dirname, '..', 'logs');
	fileReaderWorker.postMessage(directory);

	// Give the workers a second to finish processing all the events in the streams.
	await pause(1000);

	// Ask the tally worker to post the global tally and wait a second for the tally to be printed.
	tallyWorker.postMessage('postTally');
	await pause(1000);

	// Terminate all workers.
	for (let i = 0; i < workers.length; i++) {
		await workers[i].terminate();
	}

	process.exit(0);
}

void start();