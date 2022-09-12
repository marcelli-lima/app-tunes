import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        { !user && <Loading />}
        { user && (
          <>
            <div className="container-user">
              <p>tera uma imagem</p>
              <h3 id="user" data-testid="header-user-name">
                { user.name }
              </h3>
            </div>
            <div className="container-links">
              <Link
                className="links"
                to="/search"
                data-testid="link-to-search"
              >
                Search

              </Link>
              <Link
                className="links"
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favoritos

              </Link>
              <Link
                className="links"
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil

              </Link>
            </div>
          </>
        )}
      </header>
    );
  }
}
