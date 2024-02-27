import React from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from 'redux';
import logo from './logo.svg';
import './App.css';
import {GameComponent} from './components/GameComponent';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/LoginComponent';
import GameAddComponent from './components/GameAddComponent';
import GameListComponent from './components/GameListComponent';
import Reservation from './DemoForm';
import GameForm from './components/GameForm';
import { TestFormComponent } from './components/TestFormComponent';
import DemoMaterial from './components/DemoMaterial';
import { addGame, removeGame } from './store/actionCreators';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  const games: readonly IGame[] = useSelector(
    (state: GameState) => state.games,
    shallowEqual
  )

  const dispatch: Dispatch<any> = useDispatch()

  const saveGame = React.useCallback(
    (game: IGame) => dispatch(addGame(game)),
    [dispatch]
  )

  return (
    <div className="App">
      <HeaderComponent logo = {logo} />
      <Router>
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/liste">Liste des jeux</Link>
          <Link to="/ajout">Ajouter un jeu</Link>
          <Link to="/game/42">Voir le jeu 42</Link>
        </nav>
        <Routes>
          <Route path="/" element={<GameListComponent />} />
          <Route path="/liste" element={<GameListComponent />} />  
          <Route path="/ajout" element={<GameForm />} />
          <Route path="/game/:id" element={<GameComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
