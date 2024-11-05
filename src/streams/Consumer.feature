Feature: Consumer.

	As a streaming platform
	I need a Consumer
	so that streams can be consumed.

	Scenario: Consume events from a stream.
		Given an event handler
		And a consumer that is subscribed to a stream
		When an event is posted to the stream
		Then the consumer notifies the event handler.