import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
      update: false,
      isDisabled: true,
    };
  }

  async componentDidMount() {
    const userLogado = await getUser();
    this.setState({ ...userLogado, loading: false });
  }

  handleFilter = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.enableButton());
  }

  handleSaveButton = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({ loading: false, update: true });
  }

  enableButton = () => {
    const { name, email, image, description } = this.state;
    const re = /\S+@\S+\.\S+/;
    if (name.length && email.length
      && image.length && description.length
      && re.test(email)) {
      this.setState({ isDisabled: false });
    }
  }

  render() {
    const { isDisabled, name, email, image, description, loading, update } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { update && <Redirect to="/profile" /> }
        { loading && <Loading /> }
        { !loading
           && (
             <form>
               <label htmlFor="edit-input-image">
                 Editar Foto:
                 <input
                   name="image"
                   value={ image }
                   data-testid="edit-input-image"
                   id="edit-input-image"
                   onChange={ this.handleFilter }
                   type="text"
                 />
               </label>
               <label htmlFor="edit-input-name">
                 Name:
                 <input
                   id="edit-input-name"
                   name="name"
                   data-testid="edit-input-name"
                   type="text"
                   value={ name }
                   onChange={ this.handleFilter }
                 />
               </label>
               <label htmlFor="edit-input-email">
                 Email:
                 <input
                   id="edit-input-email"
                   name="email"
                   data-testid="edit-input-email"
                   type="text"
                   defaultValue={ email }
                   onChange={ this.handleFilter }
                 />
               </label>
               <label htmlFor="edit-input-description">
                 Descrição:
                 <input
                   id="edit-input-description"
                   name="description"
                   data-testid="edit-input-description"
                   type="text"
                   defaultValue={ description }
                   onChange={ this.handleFilter }
                 />
               </label>
               <button
                 disabled={ isDisabled }
                 type="button"
                 data-testid="edit-button-save"
                 onClick={ this.handleSaveButton }
               >
                 Salvar alterações
               </button>
             </form>
           )}
      </div>
    );
  }
}

export default ProfileEdit;
