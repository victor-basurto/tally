import { fake } from 'sinon';
import { expect } from 'chai';
import { BroadcastChannel } from 'worker_threads';
import Consumer from './Consumer';
import { And, Feature, Given, Scenario, Then, When } from '../bdd';

interface DummyEvent {
	foo: string;
}

Feature('Consumer', () => {
	Scenario('Consume events from a stream.', () => {
		let consumer;
		const topic = 'Files';
		const dummyEvent = { foo: 'bar' };
		let handleEvent: ReturnType<typeof fake>;
		
		Given('an event handler', () => {
			handleEvent = fake();
		});

		And('a consumer that is subscribed to a stream', () => {
			consumer = new Consumer<DummyEvent>(topic, { handleEvent });
			expect(consumer.stream.name).to.equal(topic);
		});

		When('an event is posted to the stream', () => {
			const stream = new BroadcastChannel(topic);
			stream.postMessage(dummyEvent);
		});

		Then('the consumer notifies the event handler.', () => {
			expect(handleEvent.calledWith(dummyEvent)).to.equal(true);
		});
	});
});