import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
  let nextState;

  describe('set entries', () => {
    const entries = ['A'];
    const action = { type: 'SET_ENTRIES', entries };
    const state = Map();

    it('sets the entries', () => {
      expect(reducer(state, action)).to.equal(fromJS({ entries }));
    });

    describe('undefined state', () => {
      it('intialises the state', () => {
        expect(reducer(undefined, action)).to.equal(fromJS({ entries }));
      });
    });
  });

  describe('next vote', () => {
    const entries = ['A', 'B'];
    const action = { type: 'NEXT_VOTE' };
    const state = fromJS({ entries });

    it('gets the vote', () => {
      const vote = { pair: entries };
      expect(reducer(state, action)).to.equal(fromJS({ vote, entries: [] }));
    });
  });

  describe('vote', () => {
    const entries = ['A', 'B'];
    const vote = { pair: entries };
    const action = { type: 'VOTE', entry: 'A' };
    const state = fromJS({ vote, entries: [] });

    it('sets the vote', () => {
      const vote = { pair: entries, tally: { A: 1 } };
      expect(reducer(state, action)).to.equal(fromJS({ vote, entries: [] }));
    });
  });
});

