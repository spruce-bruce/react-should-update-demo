import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { search } from '../../redux/actions/spotify';
import AlbumListItem from './album-list-item';

class Search extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.queryChange = this.queryChange.bind(this);

    this.state = {
      query: '',
    };
  }

  submit(e) {
    e.preventDefault();
    this.props.dispatch(search(this.state.query));
  }

  queryChange(e) {
    this.setState({
      query: e.target.value,
    });
  }

  renderAlbums() {
    const { searchResults } = this.props;
    return searchResults.response.albums.map(album => <AlbumListItem
      key = {album.id}
      id = {album.id}
      name = {album.name}
      image = {album.images[0].url}
    />);
  }

  render() {
    const { searchResults } = this.props;
    const loader = <img src = "/static-media/ajax-loader.gif" />;
    return (
      <form onSubmit={this.submit}>
        <input type="text" value={this.state.query} onChange={this.queryChange} />
        <button>Search</button>
        {searchResults.loading ? loader : ''}
        {searchResults.response ? this.renderAlbums() : ''}
      </form>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func,
  searchResults: PropTypes.object,
};

const mapStateToProps = state => ({ searchResults: state.spotify.search.toJS() });
export default connect(mapStateToProps)(Search);
