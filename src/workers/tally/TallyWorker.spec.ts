import { expect } from 'chai';
import { fake } from 'sinon';
import { BroadcastChannel } from 'worker_threads';
import { And, Feature, Given, Scenario, Then, When } from '../../bdd';
import Tally from '../../Tally';
import TallyWorker from './TallyWorker';

Feature('Tally Worker.', () => {
	Scenario('Process tallies.', () => {
		let talliesStream: BroadcastChannel;
		let globalTallyStream: BroadcastChannel;
		let worker: TallyWorker;

		const callback = fake();
		const firstTally: Tally = {
			logsId: '56f83bed-3705-4115-9067-73930cbecbc0',
			tally: [{
				email: 'noah.sanchez@me.com',
				total: 2,
			}, {
				email: 'isabella.jackson@amerisave.com',
				total: 1,
			}],
		};
		const secondTally: Tally = {
			logsId: '149db178-845a-4640-b55a-949441357a05',
			tally: [{
				email: 'nicholas.allen@microsoft.com',
				total: 2,
			}, {
				email: 'abigail.smith@amerisave.com',
				total: 1,
			}, {
				email: 'noah.sanchez@me.com',
				total: 2,
			}, {
				email: 'isabella.jackson@amerisave.com',
				total: 3,
			}],
		};
		const result: Tally = {
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

		Given('a "Tallies" stream', () =>{
			talliesStream = new BroadcastChannel('Tallies');
		});

		And('a "Global Tally" stream', () => {
			globalTallyStream = new BroadcastChannel('Global Tally');
			globalTallyStream.onmessage = (message: unknown): void => {
				const tally = (message as MessageEvent<Tally>).data;
				callback(tally);
			};
		});

		And('a tally worker that is subscribed to the "Tallies" stream', () => {
			worker = new TallyWorker();
			expect(worker.consumer.stream.name).to.equal('Tallies');
			expect(worker.producer.stream.name).to.equal('Global Tally');
		});

		When('events are posted to the "Tallies" stream', () => {
			talliesStream.postMessage(firstTally);
			talliesStream.postMessage(secondTally);
		});

		And('the worker is asked to post its global tally', () => {
			worker.postTally();
		});

		Then('the worker posts the global tally object into the "Global Tally" stream.', () => {
			expect(callback.calledWith(result)).to.equal(true);
		});
	});
});