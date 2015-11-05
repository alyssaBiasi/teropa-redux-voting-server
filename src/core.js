import { List, Map } from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
};

export function nextVote(state) {
  const entries = state.get('entries');
  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
  });
};

export function vote(state, entry) {
  const path = ['vote', 'tally', entry];
  return state.updateIn(path, 0, tally => tally + 1);
}

