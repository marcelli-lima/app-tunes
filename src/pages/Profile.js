import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {},
    };
  }

  async componentDidMount() {
    const userLogado = await getUser();
    this.setState({ user: userLogado, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    console.log(user);
    return (
      <div data-testid="page-profile">
        <Header />
        { loading
          ? <Loading />
          : (
            <div>
              <img data-testid="profile-image" alt={ user.name } src={ user.image } />
              <h3>Nome:</h3>
              <p>{ user.name }</p>
              <h3>Email:</h3>
              <p>{ user.email }</p>
              <h3>Descrição:</h3>
              <p>{ user.description }</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>)}
      </div>
    );
  }
}

export default Profile;
