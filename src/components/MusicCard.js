import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import './musiccard.css';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    const { isFavorite } = props;

    this.state = {
      favorite: isFavorite,
      loading: false,
    };
  }

  handleSave = async ({ target: { checked } }) => {
    const currSong = { ...this.props };
    this.setState({
      loading: true,
    });
    if (checked) {
      await addSong(currSong);
    } else {
      await removeSong(currSong);
    }
    this.setState({
      loading: false,
      favorite: checked,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favorite } = this.state;

    return (
      <section>
        { loading && <Loading /> }
        { !loading && (
          <>
            <h3>{trackName}</h3>
            <audio src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label className="core" htmlFor={ trackName }>
              <input
                id={ trackName }
                type="checkbox"
                checked={ favorite }
                onChange={ this.handleSave }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          </>
        ) }
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  trackId: PropTypes.number.isRequired,

};

export default MusicCard;
