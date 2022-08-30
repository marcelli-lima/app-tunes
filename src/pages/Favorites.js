import React from 'react';
import Header from '../components/Header';

class Favorite extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorite
      </div>
    );
  }
}

export default Favorite;
