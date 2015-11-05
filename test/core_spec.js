import { List, Map } from 'immutable';
import { expect } from 'chai';
import { setEntries, nextVote, vote } from '../src/core';

describe('core', () => {
  let nextState;

  describe('setEntries()', () => {
    it('adds the entries', () => {
      const state = Map();
      const entries = ['A', 'B'];
      nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({ entries: List(entries) }));
    });
  });

  describe('nextVote()', () => {
    const state = Map({ entries: List.of('A', 'B', 'C') });

    beforeEach(() => {
      nextState = nextVote(state);
    });

    it('sets the next vote', () => {
      expect(nextState.get('vote')).to.equal(Map({ pair: List.of('A', 'B') }));
    });

    it('removes the vote entries', () => {
      expect(nextState.get('entries')).to.equal(List.of('C'));
    });
  });

  describe('vote()', () => {
    const item = 'A';
    const pair = List.of(item, 'B');

    describe('no existing tally', () => {
      const state = Map({
        vote: Map({ pair }),
        entries: List()
      });

      beforeEach(() => {
        nextState = vote(state, item);
      });

      it('starts the tally', () => {
        const expected = Map({ pair, tally: Map({ [item]: 1 }) });
        expect(nextState.get('vote')).to.equal(expected);
      });
    });

    describe('existing tally', () => {
      const tally = Map({ [item]: 3 });
      const state = Map({
        vote: Map({ pair, tally }),
        entries: List()
      });

      beforeEach(() => {
        nextState = vote(state, item);
      });

      it('increments the tally', () => {
        const expected = Map({ pair, tally: Map({ [item]: 4 }) });
        expect(nextState.get('vote')).to.equal(expected);
      });
    });
  });
});

