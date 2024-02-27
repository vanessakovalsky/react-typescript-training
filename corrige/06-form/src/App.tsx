import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameComponent from './components/GameComponent';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/LoginComponent';
import GameAddComponent from './components/GameAddComponent';
import GameListComponent from './components/GameListComponent';
import Reservation from './DemoForm';
import GameForm from './components/GameForm';
import { TestFormComponent } from './components/TestFormComponent';
import DemoMaterial from './components/DemoMaterial';

function App() {
  const [nomDuJeu, setName] = React.useState('defaultGameName');
  
  const setGameNameState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  return (
    <div className="App">
      <HeaderComponent logo = {logo} />
      {/* <LoginComponent /> */}
      {/* <GameAddComponent nomDuJeu={nomDuJeu} onChange={setGameNameState} /> */}
      {/* <GameComponent gameName={nomDuJeu} /> */}
      <GameListComponent />
      <GameForm />
      <TestFormComponent />
      <DemoMaterial />
    </div>
  );
}

export default App;
