import { expect } from 'chai';
import { fake } from 'sinon';
import { BroadcastChannel } from 'worker_threads';
import { And, Feature, Given, Scenario, Then, When } from '../../bdd';
import Logs from '../../Logs';
import FileWorker from './FileWorker';

Feature('File Worker.', () => {
	Scenario('Process files.', () => {
		let filesStream: BroadcastChannel;
		let logsStream: BroadcastChannel;
		let worker: FileWorker;

		const logsReceived = fake();
		const result: Logs = {
			id: '56f83bed-3705-4115-9067-73930cbecbc0',
			logs: [{
				id: '89004ef9-e825-4547-a83a-c9e9429e8f95',
				email: 'noah.sanchez@me.com',
				message: 'successfully handled skipped operation.',
			}],
		};

		Given('a "Files" stream that receives the contents of log files', () =>{
			filesStream = new BroadcastChannel('Files');
		});

		And('a "Logs" stream that receives the parsed contents of log files', () => {
			logsStream = new BroadcastChannel('Logs');
			logsStream.onmessage = (message: unknown): void => {
				const logs = (message as MessageEvent<Logs>).data;
				logsReceived(logs);
			};
		});

		And('a file worker that is subscribed to the "Files" stream', () => {
			worker = new FileWorker();
			expect(worker.consumer.stream.name).to.equal('Files');
			expect(worker.producer.stream.name).to.equal('Logs');
		});

		When('an event is posted to the "Files" stream', () => {
			const json = JSON.stringify(result);
			filesStream.postMessage(json);
		});

		Then('the worker parses the contents and posts them into the "Logs" stream.', () => {
			expect(logsReceived.calledWith(result)).to.equal(true);
		});
	});
});