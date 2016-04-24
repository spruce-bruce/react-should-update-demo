/* eslint no-console:0, react/prop-types:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAlbum } from '../../redux/actions/spotify';

const styles = {
  imgStyles: {
    display: 'block',
    float: 'left',
  },
  rightPane: {
    float: 'left',
    fontSize: '25',
    marginLeft: 10,
  },
  h1Styles: {
    marginTop: 0,
    marginBottom: 0,
  },
};

class Album extends Component {
  componentWillMount() {
    this.props.dispatch(getAlbum(this.props.params.albumId));
  }

  renderAlbum() {
    const album = this.props.album.response.album;
    return (
      <div>
        <img style={styles.imgStyles} src = {album.images[0].url} />
        <div style={styles.rightPane}>
          <h1 style={styles.h1Styles} className="h1">{album.name}</h1>
          <div>{album.release_date}</div><br />
          <div>{this.renderTracks(album.tracks)}</div>
        </div>
      </div>
    );
  }

  renderTracks(tracks) {
    const renderedTracks = tracks.map(track => <div key={track.id}>
      <span>{track.track_number}.</span> {track.name}
    </div>);
    return (
      <div>{renderedTracks}</div>
    );
  }

  render() {
    const { album } = this.props;
    const loader = <img src = "/static-media/ajax-loader.gif" />;
    return (
      <div>
        {album.loading ? loader : ''}
        {album.response ? this.renderAlbum() : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  album: state.spotify.album.toJS(),
});

export default connect(mapStateToProps)(Album);
