import { combineReducers } from 'redux';

function search(state = {}, action) {
  if (action.type === 'SPOTIFY_SEARCH') {
    console.log('spotify search reducer');
  }
  return state;
}

const searchReducers = combineReducers({
  search,
});

export default searchReducers;
