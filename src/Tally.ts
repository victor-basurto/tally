/**
 * Email tally.
 */
export interface EmailTally {
	email: string;
	total: number;
}

/**
 * This interface represents a tally of all the logs for each unique email address.
 */
export default interface Tally {
	logsId?: string;
	tally: EmailTally[];
}