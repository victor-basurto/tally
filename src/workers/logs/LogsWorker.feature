Feature: Logs Worker.

	As a log processing streaming platform
	I need a worker that transforms parsed logs into tally objects
	so that the tallies can be processed by another worker.

	Scenario: Process logs.
		Given a "Logs" stream
		And a "Tallies" stream
		And a logs worker that is subscribed to the "Logs" stream
		When an event is posted to the "Logs" stream
		Then the worker posts a tally object into the "Tallies" stream.