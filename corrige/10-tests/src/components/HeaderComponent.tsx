import * as React from 'react';

interface Props {
    logo : string;
}
const HeaderComponent = (props: Props) => (
    <header className="App-header">
      <img src={props.logo} className="App-logo" alt="logo" />
      <ul>
        <li>Mon compte</li>
        <li>Mes jeux</li>
        <li>Ajouter un jeu</li>
      </ul>
  </header>
);

export default HeaderComponent;