import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';
import './search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      searchValue: '',
      button: true,
      loading: false,
      result: [],
      request: false,
    };
  }

  disabledButton = () => {
    const { search } = this.state;
    if (search.length > 1) {
      this.setState({ button: false });
    }
  }

  handleFilter = ({ target }) => {
    const { value } = target;
    this.setState({ search: value }, () => this.disabledButton());
  }

  buttonSearch = async () => {
    this.setState({ loading: true });
    const { search } = this.state;
    const resulte = await searchAlbumsAPI(search);
    this.setState({
      searchValue: search, search: '', loading: false, request: true, result: resulte });
  }

  render() {
    const { button, search, loading, request, result, searchValue } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading && <Loading /> }
        { !loading && (
          <div className="container-album">
            <div className="search-container">
              <input
                id="search"
                value={ search }
                data-testid="search-artist-input"
                onChange={ this.handleFilter }
                placeholder="Nome do artista ou banda"
              />
              <button
                id="search-button"
                type="button"
                data-testid="search-artist-button"
                disabled={ button }
                onClick={ this.buttonSearch }
              >
                Pesquisar
              </button>
            </div>
            { (request) && (result.length > 0
              ? <p id="search-result">{`Resultado de álbuns de: ${searchValue}`}</p>
              : <p>Nenhum álbum foi encontrado</p>
            ) }
            { Boolean(result.length) && result.map((album) => (
              <AlbumCard
                key={ album.collectionId }
                { ...album }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
