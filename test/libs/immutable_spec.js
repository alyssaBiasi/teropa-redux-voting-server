import { expect } from 'chai';
import { List, Map } from 'immutable';

describe('immutability', () => {
  describe('number', () => {
    function increment(current) {
      return current + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('list', () => {
    function add(current, newItem) {
      return current.push(newItem);
    }

    it('is immutable', () => {
      let state = List.of('A', 'B');
      let nextState = add(state, 'C');

      expect(nextState).to.equal(List.of('A', 'B', 'C'));
      expect(state).to.equal(List.of('A', 'B'));
    });
  });

  describe('tree', () => {
    function add(current, newItem) {
      return current.update('items', items => items.push(newItem));
    }

    it('is immutable', () => {
      let state = Map({ items: List.of('A', 'B') });
      let nextState = add(state, 'C');

      expect(nextState).to.equal(Map({ items: List.of('A', 'B', 'C') }));
      expect(state).to.equal(Map({ items: List.of('A', 'B') }));
    });
  });
});

