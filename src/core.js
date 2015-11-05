import { List, Map } from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
};

export function nextVote(state) {
  const entries = state.get('entries');
  const vote = state.get('vote');

  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2).concat(getWinners(vote))
  });
};

export function vote(state, entry) {
  const path = ['vote', 'tally', entry];
  return state.updateIn(path, 0, tally => tally + 1);
}

function getWinners(vote) {
  if(!vote) {
    return [];
  }

  const [a, b] = vote.get('pair');
  const aCount = vote.getIn(['tally', a], 0);
  const bCount = vote.getIn(['tally', b], 0);

  if(aCount > bCount) {
    return [a];
  } else if(aCount < bCount) {
    return [b];
  }

  return [a,b];
}

