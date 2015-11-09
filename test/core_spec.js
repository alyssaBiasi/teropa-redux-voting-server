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
    context('no current vote', () => {
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

    context('current vote winner', () => {
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

    context('current vote draw', () => {
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

    context('one entry left', () => {
      const vote = Map({
        pair: List.of('A', 'B'),
        tally: Map({ A: 4, B: 3 })
      });
      const state = Map({
        vote,
        entries: List()
      });

      beforeEach(() => {
        nextState = nextVote(state);
      });

      it('makrs the overall winner', () => {
        expect(nextState).to.equal(Map({ winner: 'A' }));
      });
    });
  });

  describe('vote()', () => {
    const item = 'A';
    const pair = List.of(item, 'B');

    context('no existing tally', () => {
      const state = Map({ pair });

      beforeEach(() => {
        nextState = vote(state, item);
      });

      it('starts the tally', () => {
        const expected = Map({ pair, tally: Map({ [item]: 1 }) });
        expect(nextState).to.equal(expected);
      });
    });

    context('existing tally', () => {
      const tally = Map({ [item]: 3 });
      const state = Map({ pair, tally });

      beforeEach(() => {
        nextState = vote(state, item);
      });

      it('increments the tally', () => {
        const expected = Map({ pair, tally: Map({ [item]: 4 }) });
        expect(nextState).to.equal(expected);
      });
    });
  });
});

