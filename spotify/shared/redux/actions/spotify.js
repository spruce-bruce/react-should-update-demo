/* eslint no-unused-vars:0 */
import Client from 'synapi-client';

const client = new Client({ url: 'http://spotify.vm/api' });

export function search(query) {
  return (dispatch) => {
    dispatch({
      type: 'SEARCH_START',
      query,
    });

    client.get(`search?query=${query}`)
      .then(response => response.json())
      .then(response => dispatch({
        type: 'SEARCH_SUCCESS',
        response,
      }));
  };
}

export function getAlbum(id) {
  return (dispatch) => {
    dispatch({
      type: 'GET_ALBUM_START',
      id,
    });

    client.get(`album/${id}`)
      .then(response => response.json())
      .then(response => dispatch({
        type: 'GET_ALBUM_SUCCESS',
        response,
      }));
  };
}
