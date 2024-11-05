Feature: Console Worker.

	As a log processing streaming platform
	I need a worker that prints stream events to the console
	so stream events can be viewed in the console.

	Scenario: Print stream events to console.
		Given a stream
		And a console worker that is subscribed to the stream
		When an event is posted to the stream
		Then the worker prints the event to the console.