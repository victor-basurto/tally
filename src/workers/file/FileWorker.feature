Feature: File Worker.

	As a log processing streaming platform
	I need a worker that parses the contents of log files
	so that the logs can be processed by another worker.

	Scenario: Process files.
		Given a "Files" stream that receives the contents of log files
		And a "Logs" stream that receives the parsed contents of log files
		And a file worker that is subscribed to the "Files" stream
		When an event is posted to the "Files" stream
		Then the worker parses the contents and posts them into the "Logs" stream.