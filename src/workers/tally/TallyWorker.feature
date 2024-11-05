Feature: Tally Worker.

	As a log processing streaming platform
	I need a worker that keeps a global tally of all the email addresses in the logs
	so that the global tally can be processed by another worker.

	Scenario: Process tallies.
		Given a "Tallies" stream
		And a "Global Tally" stream
		And a tally worker that is subscribed to the "Tallies" stream
		When events are posted to the "Tallies" stream
		And the worker is asked to post its global tally
		Then the worker posts the global tally object into the "Global Tally" stream.