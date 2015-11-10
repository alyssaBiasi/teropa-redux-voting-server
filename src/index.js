import makeStore from './store';
import startServer from './server';

export const store = makeStore();
startServer(store);

const entries = require('./data/entries.json');
store.dispatch({ type: 'SET_ENTRIES', entries });
store.dispatch({ type: 'NEXT_VOTE' });

