export function search(query) {
  return {
    type: 'SPOTIFY_SEARCH',
    query,
  };
}
