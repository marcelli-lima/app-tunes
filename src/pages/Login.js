import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      buttonDisabled: true,
      loading: false,
      userCreated: false,
    };
  }

  handleFilter = ({ target }) => {
    const { value } = target;
    this.setState({ name: value }, () => this.disabledButton());
  }

handleCreateUser = async () => {
  this.setState({ loading: true });

  const { name } = this.state;
  await createUser({ name });

  this.setState({
    userCreated: true,
  });
}

  disabledButton = () => {
    const { name } = this.state;
    if (name.length > 2) {
      this.setState({ buttonDisabled: false });
    }
  }

  render() {
    const { buttonDisabled, name, loading, userCreated } = this.state;
    return (
      <div data-testid="page-login">
        {userCreated && <Redirect to="/search" />}
        {loading && <Loading />}
        {!loading && (
          <form>
            <input
              valeu={ name }
              onChange={ this.handleFilter }
              data-testid="login-name-input"
              placeholder="nome"
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ buttonDisabled }
              onClick={ this.handleCreateUser }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
