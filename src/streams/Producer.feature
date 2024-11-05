Feature: Producer.

	As a streaming platform
	I need a Producer
	so that I can post events to streams.

	Scenario: Post events to a stream.
		Given a Producer for a stream
		When it's used to post an event
		Then the event is posted to the stream.