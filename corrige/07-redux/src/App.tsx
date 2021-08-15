import * as React from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from 'redux';
import logo from './logo.svg';
import './App.css';
import { GameComponent, NameEditComponent, EditorEditComponent, YearEditComponent, CategoryEditComponent, GameForm} from './components';
import { addGame, removeGame } from './store/actionCreators';

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {games.map((game: IGame) => (
        <GameComponent key={game.id} game={game} removeGame={removeGame} />
      ))}

    </div>
  );
}

export default App;
