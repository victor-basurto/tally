import { expect } from 'chai';
import { fake } from 'sinon';
import { BroadcastChannel } from 'worker_threads';
import { And, Feature, Given, Scenario, Then, When } from '../../bdd';
import Logs from '../../Logs';
import Tally from '../../Tally';
import LogsWorker from './LogsWorker';

Feature('Logs Worker.', () => {
	Scenario('Process logs.', () => {
		let logsStream: BroadcastChannel;
		let talliesStream: BroadcastChannel;
		let worker: LogsWorker;

		const tallyReceived = fake();
		const logs: Logs = {
			id: '56f83bed-3705-4115-9067-73930cbecbc0',
			logs: [{
				id: '89004ef9-e825-4547-a83a-c9e9429e8f95',
				email: 'noah.sanchez@me.com',
				message: 'successfully handled skipped operation.',
			}, {
				id: 'ebec25ac-9abb-410c-9785-d3f814fcdb96',
				email: 'isabella.jackson@amerisave.com',
				message: 'successfully handled skipped operation.',
			}, {
				id: 'd8f967bd-8a64-4e3b-9a51-b94a8bcb2c5a',
				email: 'noah.sanchez@me.com',
				message: 'successfully handled skipped operation.',
			}],
		};
		const result: Tally = {
			logsId: '56f83bed-3705-4115-9067-73930cbecbc0',
			tally: [{
				email: 'noah.sanchez@me.com',
				total: 2,
			}, {
				email: 'isabella.jackson@amerisave.com',
				total: 1,
			}],
		};

		Given('a "Logs" stream', () =>{
			logsStream = new BroadcastChannel('Logs');
		});

		And('a "Tallies" stream', () => {
			talliesStream = new BroadcastChannel('Tallies');
			talliesStream.onmessage = (message: unknown): void => {
				const tally = (message as MessageEvent<Tally>).data;
				tallyReceived(tally);
			};
		});

		And('a logs worker that is subscribed to the "Logs" stream', () => {
			worker = new LogsWorker();
			expect(worker.consumer.stream.name).to.equal('Logs');
			expect(worker.producer.stream.name).to.equal('Tallies');
		});

		When('an event is posted to the "Logs" stream', () => {
			logsStream.postMessage(logs);
		});

		Then('the worker posts a tally object into the "Tallies" stream.', () => {
			expect(tallyReceived.calledWith(result)).to.equal(true);
		});
	});
});