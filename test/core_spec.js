import { List, Map } from 'immutable';
import { expect } from 'chai';
import { setEntries, nextVote } from '../src/core';

describe('core', () => {
  describe('setEntries()', () => {
    it('adds the entries', () => {
      const state = Map();
      const entries = ['A', 'B'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({ entries: List(entries) }));
    });
  });

  describe('nextVote()', () => {
    const state = Map({ entries: List.of('A', 'B', 'C') });
    let nextState;

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
});

