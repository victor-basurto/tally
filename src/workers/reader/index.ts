import { parentPort } from 'worker_threads';
import FileReaderWorker from './FileReaderWorker';

const worker = new FileReaderWorker();

// The message received here is the full path to the directory containing logs.
parentPort.on('message', (directory: string) => {
	void worker.start(directory);
});