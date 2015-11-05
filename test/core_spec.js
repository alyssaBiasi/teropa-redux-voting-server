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
    describe('no current vote', () => {
      const state = Map({
        entries: List.of('C', 'D', 'E')
      });

      beforeEach(() => {
        nextState = nextVote(state);
      });

      it('sets the next vote', () => {
        expect(nextState.get('vote')).to.equal(Map({ pair: List.of('C', 'D') }));
      });

      it('removes the vote entries', () => {
        expect(nextState.get('entries')).to.equal(List.of('E'));
      });
    });

    describe('current vote winner', () => {
      const vote = Map({
        pair: List.of('A', 'B'),
        tally: Map({ A: 3, B: 2 })
      });
      const state = Map({
        vote,
        entries: List.of('C', 'D', 'E')
      });

      beforeEach(() => {
        nextState = nextVote(state);
      });

      it('sets the next vote', () => {
        expect(nextState.get('vote')).to.equal(Map({ pair: List.of('C', 'D') }));
      });

      it('appends the winner', () => {
        expect(nextState.get('entries')).to.equal(List.of('E', 'A'));
      });
    });

    describe('current vote draw', () => {
      const vote = Map({
        pair: List.of('A', 'B'),
        tally: Map({ A: 3, B: 3 })
      });
      const state = Map({
        vote,
        entries: List.of('C', 'D', 'E')
      });

      beforeEach(() => {
        nextState = nextVote(state);
      });

      it('sets the next vote', () => {
        expect(nextState.get('vote')).to.equal(Map({ pair: List.of('C', 'D') }));
      });

      it('appends both entries', () => {
        expect(nextState.get('entries')).to.equal(List.of('E', 'A', 'B'));
      });
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

