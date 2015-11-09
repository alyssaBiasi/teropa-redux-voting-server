import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import makeStore from '../src/store';

describe('store', () => {
  let store;

  beforeEach(() => {
    store = makeStore();
  });

  it('configures the store', () => {
    expect(store.getState()).to.equal(Map());
  });

  describe('dispatching', () => {
    const entries = ['A', 'B'];

    beforeEach(() => {
      const action = { type: 'SET_ENTRIES', entries };
      store.dispatch(action);
    });

    it('handles actions', () => {
      expect(store.getState()).to.equal(fromJS({ entries }));
    });
  });
});

