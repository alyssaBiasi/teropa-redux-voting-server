import { setEntries, nextVote, vote } from './core';

export default function reducer(state, action) {
  switch(action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT_VOTE':
      return nextVote(state);
    case 'VOTE':
      return vote(state, action.entry);
  }

  return state;
}

