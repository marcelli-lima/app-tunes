import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      button: true,
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

  render() {
    const { button, search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          value={ search }
          data-testid="search-artist-input"
          onChange={ this.handleFilter }
          placeholder="Nome do artista ou banda"
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ button }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
