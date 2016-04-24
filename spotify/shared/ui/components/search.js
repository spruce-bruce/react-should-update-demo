import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { search } from '../../redux/actions/spotify';
import AlbumListItem from './album-list-item';

const styles = {
  searchInput: {
    fontSize: 30,
    float: 'left',
  },
  searchButton: {
    marginLeft: 10,
    width: 100,
    height: 40,
    float: 'left',
  },
};

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
        <div style={{ marginBottom: 10 }}>
          <input
            style={styles.searchInput}
            type="text"
            value={this.state.query}
            onChange={this.queryChange}
          />

          <button style={styles.searchButton}>Search</button>
          <div style={{ clear: 'both' }} />
        </div>

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
