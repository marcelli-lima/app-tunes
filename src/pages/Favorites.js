import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorite extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.requestFavoriteSongs();
  }

  requestFavoriteSongs = async () => {
    this.setState({ loading: true });
    const songs = await getFavoriteSongs();
    this.setState({ favorites: songs, loading: false });
  }

  render() {
    const { loading, favorites } = this.state;
    console.log('renderizou');
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading && <Loading /> }
        {
          favorites.map((song) => (
            <MusicCard
              key={ song.trackId }
              { ...song }
              isFavorite
              updateFavSongs={ this.requestFavoriteSongs }
            />
          ))
        }
      </div>
    );
  }
}

export default Favorite;
