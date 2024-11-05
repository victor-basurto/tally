// eslint-disable-next-line import/no-extraneous-dependencies
import { AsyncFunc, Func, Suite, Test } from 'mocha';

/**
 * Defines and executes a BDD "Feature" test callback.
 *
 * @param msg Description of the feature.
 * @param fn Feature test callback.
 */
export const Feature = (msg: string, fn: (this: Suite) => void): Suite => describe(`Feature: ${ msg }`, fn);

/**
 * Defines and executes a BDD "Scenario" test callback.
 *
 * @param msg Description of the scenario.
 * @param fn Scenario test callback.
 */
export const Scenario = (msg: string, fn?: (this: Suite) => void): Suite => context(`Scenario: ${ msg }`, fn);

/**
 * Test function for a "Given" step in BDD.
 */
export const Given = (msg: string, fn?: Func | AsyncFunc): Test => specify(`Given ${ msg }`, fn);

/**
 * Test function for a "When" step in BDD.
 */
export const When = (msg: string, fn?: Func | AsyncFunc): Test => specify(`When ${ msg }`, fn);

/**
 * Test function for a "Then" step in BDD.
 */
export const Then = (msg: string, fn?: Func | AsyncFunc): Test => it(`Then ${ msg }`, fn);

/**
 * Test function for an "And" step in BDD.
 */
export const And = (msg: string, fn?: Func | AsyncFunc): Test => specify(`And ${ msg }`, fn);

/**
 * Defines a BDD "Feature" test callback that is still pending (not implemented yet).
 *
 * @param msg Description of the feature.
 * @param fn Feature test callback.
 */
export const PendingFeature = (msg: string, fn: (this: Suite) => void): Suite | void => xdescribe(`Feature: ${ msg }`, fn);

/**
 * Defines a BDD "Scenario" test callback that is still pending (not implemented yet).
 *
 * @param msg Description of the scenario.
 * @param fn Scenario test callback.
 */
export const PendingScenario = (msg: string, fn?: (this: Suite) => void): Suite | void => xcontext(`Scenario: ${ msg }`, fn);

/**
 * Test function for a "Given" step in BDD that is still pending (not implemented yet).
 */
export const PendingGiven = (msg: string, fn?: Func | AsyncFunc): Test => xspecify(`Given ${ msg }`, fn);

/**
 * Test function for a "When" step in BDD that is still pending (not implemented yet).
 */
export const PendingWhen = (msg: string, fn?: Func | AsyncFunc): Test => xspecify(`When ${ msg }`, fn);

/**
 * Test function for a "Then" step in BDD that is still pending (not implemented yet).
 */
export const PendingThen = (msg: string, fn?: Func | AsyncFunc): Test => xit(`Then ${ msg }`, fn);

/**
 * Test function for an "And" step in BDD that is still pending (not implemented yet).
 */
export const PendingAnd = (msg: string, fn?: Func | AsyncFunc): Test => xspecify(`And ${ msg }`, fn);
