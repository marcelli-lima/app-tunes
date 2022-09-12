import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './albumCard.css';

class AlbumCard extends Component {
  render() {
    const {
      collectionId,
      artistName,
      collectionName,
      artworkUrl100,
    } = this.props;

    return (
      <section>
        <div className="container-card">
          <img src={ artworkUrl100 } alt={ `${collectionName} - ${artistName}` } />
          <Link
            data-testid={ `link-to-album-${collectionId}` }
            to={ `/album/${collectionId}` }
          >
            { collectionName }
          </Link>
          <p>{ artistName }</p>
        </div>
      </section>
    );
  }
}

AlbumCard.propTypes = {
  collectionId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default AlbumCard;
