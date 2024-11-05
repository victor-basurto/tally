import { parentPort } from 'worker_threads';
import TallyWorker from './TallyWorker';

const worker = new TallyWorker();

parentPort.on('message', (message) => {
	if (message === 'postTally') {
		worker.postTally();
	}
});