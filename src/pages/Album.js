import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      songs: [],
      favSongs: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    const favSongs = await getFavoriteSongs();

    this.setState({ loading: false, songs, favSongs });
  }

  render() {
    const { songs, loading, favSongs } = this.state;
    const songsArray = [...songs];
    songsArray.shift();
    return (
      <div data-testid="page-album">
        <Header />
        { loading && <Loading />}
        { Boolean(songs.length) && (
          <>
            <img src={ songs[0].artworkUrl100 } alt={ songs[0].collectionName } />
            <h1 data-testid="artist-name">{ songs[0].artistName }</h1>
            <p data-testid="album-name">{ songs[0].collectionName }</p>
          </>
        ) }
        { Boolean(songs.length)
          && songsArray
            .map((song) => (
              <MusicCard
                key={ song.trackId }
                { ...song }
                isFavorite={ favSongs.some((fav) => fav.trackId === song.trackId) }
              />
            )) }
        Album
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default Album;
