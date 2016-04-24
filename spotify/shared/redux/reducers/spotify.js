/* eslint no-param-reassign:0 */

import { combineReducers } from 'redux';
import { Map as map } from 'immutable';

const defaultResponse = map({
  loading: false,
  response: false,
});

function search(state = defaultResponse, action) {
  switch (action.type) {
    case 'SEARCH_START':
      state = map({ loading: true, response: false });
      break;
    case 'SEARCH_SUCCESS':
      state = map({ loading: false, response: action.response });
      break;
    default:
  }
  return state;
}

function album(state = defaultResponse, action) {
  switch (action.type) {
    case 'GET_ALBUM_START':
      state = map({ loading: true, response: false });
      break;
    case 'GET_ALBUM_SUCCESS':
      state = map({ loading: false, response: action.response });
      break;
    default:
  }
  return state;
}

const searchReducers = combineReducers({
  search,
  album,
});

export default searchReducers;
