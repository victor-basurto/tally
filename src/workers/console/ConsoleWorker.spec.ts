import { expect } from 'chai';
import { stub } from 'sinon';
import { BroadcastChannel } from 'worker_threads';
import { And, Feature, Given, Scenario, Then, When } from '../../bdd';
import Tally from '../../Tally';
import ConsoleWorker from './ConsoleWorker';

Feature('Console Worker.', () => {
	Scenario('Print stream events to console.', () => {
		let globalTallyStream: BroadcastChannel;
		let worker: ConsoleWorker<Tally>;

		const print = stub(console, 'log');
		const globalTally: Tally = {
			tally: [{
				email: 'noah.sanchez@me.com',
				total: 4,
			}, {
				email: 'isabella.jackson@amerisave.com',
				total: 4,
			}, {
				email: 'nicholas.allen@microsoft.com',
				total: 2,
			}, {
				email: 'abigail.smith@amerisave.com',
				total: 1,
			}],
		};

		after(() => {
			print.restore();
			worker.consumer.stream.close();
		});

		Given('a stream', () => {
			globalTallyStream = new BroadcastChannel('Global Tally');
		});

		And('a console worker that is subscribed to the stream', () => {
			worker = new ConsoleWorker<Tally>('Global Tally');
			expect(worker.consumer.stream.name).to.equal('Global Tally');
		});

		When('an event is posted to the stream', () => {
			globalTallyStream.postMessage(globalTally);
		});

		Then('the worker prints the event to the console.', () => {
			expect(print.callCount).to.equal(1);
			expect(print.calledWith(globalTally)).to.equal(true);
		});
	});
});