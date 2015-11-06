import { List, Map } from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
};

export function nextVote(state) {
  const vote = state.get('vote');
  const entries = state.get('entries').concat(getWinners(vote));

  if(entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  }

  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
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

