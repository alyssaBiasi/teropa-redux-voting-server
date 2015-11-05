import { List, Map } from 'immutable';
import { expect } from 'chai';
import { setEntries } from '../src/core';

describe('core', () => {
  describe('setEntries()', () => {
    it('adds the entries', () => {
      const state = Map();
      const entries = ['A', 'B'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({ entries: List(entries) }));
    });
  });
});

