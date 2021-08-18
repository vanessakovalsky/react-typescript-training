# Exercice 9 - Utiliser les hooks de React

## Objectifs

Cet exercice a pour objectifs :
* De remplacer Redux par l'API Context et les hooks
* De remplacer react-router par le hook-router

## Remplacer Redux par API Context et les hooks ?
* Pourquoi ? Les hooks et l'API Context permettent de gérer les états de votre application de la même façon que Redux au travers du contexte et des hooks useState et  useReducer notamment. 
* Cependant Redux garde un avantage et doit être envisagé comme option sur les applications avec de nombreuses fonctionnalités qui partagent les données entre elle. Ce n'est pas le cas de notre application d'exemple.
* Nous avons déjà utilisé les hooks useState lors de la définition des données avant d'utiliser Redux, nous allons réutiliser ce hook et nous allons utiliser en complément car nous manipulons des données complexe le hook useReducer qui nous permet notamment de gérer des dispatch.
* Un exemple avec nos jeux dans le composant gameList qui est devenu :
```typescript 
import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';

import GameItem from './gameItem';

import reducer from '../store/reducers';
import { addGame, removeGame } from '../store/actionCreators';

export const GameList = () => {
        const initState = {
            games: [
              {
                id: 1,
                nomDuJeu: "Les aventuriers du rail", 
                editeur: "Days of wonders", 
                anneeDeSortie: 2004 , 
                categorie: "Familiale"
              },
              {
                id: 2,
                nomDuJeu: "7 wonders", 
                editeur: "Repos production", 
                anneeDeSortie: 2010 , 
                categorie: "Familiale" 
              },
            ],
        }
        const [games2, dispatch] = useReducer(reducer, initState );

      return (
        <div>
            <button
                onClick={() => dispatch(addGame)}
            >Ajouter un jeu</button>
            {games2.games.map((game: IGame) =>(
                <div>
                    <GameItem game={game} key={game.id} />
                    <button
                        onClick={() => dispatch(removeGame)}
                    >Supprimer un jeu</button>
                </div>
            ))}
        </div>
      )
}

export default GameList
```
* Ici on utilise le useReducer et le dispatch pour déclencher les actions.
* Le reducer s'appuie sur ce qui avait été fait pour Redux ainsi que les actions types (aucune modification n'a été effectuée dans ces fichiers)
* Les actionsCreators ne sont plus utilisées pour le context. 
* Nous allons maintenant ajouter le contexte qui permet de conserver l'état à un niveau plus haut (comme le store de redux)
* Pour cela nous créons un fichier context.tsx à la racine de src qui va contenir notre contexte : 
```typescript
import React, { createContext, useReducer, Dispatch } from 'react';
import reducer from './store/reducers';


const initialState = {
  games: [
    {
      id: 1,
      nomDuJeu: "Les aventuriers du rail", 
      editeur: "Days of wonders", 
      anneeDeSortie: 2004 , 
      categorie: "Familiale"
    },
    {
      id: 2,
      nomDuJeu: "7 wonders", 
      editeur: "Repos production", 
      anneeDeSortie: 2010 , 
      categorie: "Familiale" 
    },
  ]
}

const AppContext = createContext<{
  state: GameState;
  dispatch: Dispatch<GameAction>;
}>({
  state: initialState,
  dispatch: () => null
});


const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext };
```
* Puis sur notre index, nous supprimons le store et le provider de redux.
* Puis au niveau de App nous fournissons le contexte : 
```typescript
import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home }   from './pages/home'
import { AddGame }  from './pages/addGame';
import { ListGame } from './pages/listGame';
import { ShowGame } from './pages/showGame';
import { AppProvider } from './context';

const App = () =>  {
  return (
    <div className="App">
      <AppProvider>
        <Router>
            <nav>
              <Link to="/home">Home</Link>
              <Link to="/addGame">Add Game</Link>
              <Link to="/listGame">List Games</Link>
            </nav>
            <Route path="/home" component={Home} />
            <Route path="/addGame" component={AddGame} />
            <Route path="/listGame" component={ListGame} />
            <Route path="/game/:id" component={ShowGame} />
        </Router>
     </AppProvider>
    </div>
  );
}

export default App;

```
* Ensuite nous allons utiliser notre contexte dans notre liste de jeux : 
```typescript
import React, { useReducer, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import GameItem from './gameItem';

import axiosInstance from '../http-common';
import reducer from '../store/reducers';
import { addGame, removeGame } from '../store/actionCreators';
import { AppContext } from './../context';

export const GameList = () => {

        const { state, dispatch } = useContext(AppContext);

      return (
        <div>
            <button
                onClick={() => dispatch(addGame)}
            >Ajouter un jeu</button>
            {state.games.map((game: IGame) =>(
                <div>
                    <GameItem game={game} key={game.id} />
                    <button
                        onClick={() => dispatch(removeGame)}
                    >Supprimer un jeu</button>
                </div>
            ))}
        </div>
      )
}

export default GameList
```
* Dans ce cas là on remplace la création de l'état par la récupération du state depuis le contexte.

* Notre application est prête à être utiliser. La variable state est dispo dans tous les composants enfants de App

## Pour aller plus loin :  react router par des hooks

https://blog.logrocket.com/how-react-hooks-can-replace-react-router/