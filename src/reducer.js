import { setEntries, nextVote, vote, INTIAL_STATE } from './core';

export default function reducer(state=INTIAL_STATE, action) {
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

