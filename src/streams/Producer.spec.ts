import { fake } from 'sinon';
import { expect } from 'chai';
import { BroadcastChannel } from 'worker_threads';
import { Feature, Given, Scenario, Then, When } from '../bdd';
import Producer from './Producer';

interface DummyEvent {
	foo: string;
}

Feature('Producer', () => {
	Scenario('Post events to a stream.', () => {
		let producer: Producer<DummyEvent>;
		const topic = 'Files';
		const dummyEvent = { foo: 'bar' };

		// Setup a BroadcastChannel and listen for messages/events.
		const callback = fake();
		const stream = new BroadcastChannel(topic);
		stream.onmessage = (message: unknown): void => {
			const event = (message as MessageEvent<DummyEvent>).data;
			callback(event);
		};

		Given('a Producer for a stream', () => {
			producer = new Producer<DummyEvent>(topic);
			expect(producer.stream.name).to.equal(topic);
		});

		When('it\'s used to post an event', () => {
			producer.postEvent(dummyEvent);
		});

		Then('the event is posted to the stream', () => {
			expect(callback.calledWith(dummyEvent)).to.equal(true);
		});
	});
});