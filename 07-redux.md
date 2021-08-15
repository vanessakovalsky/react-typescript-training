# Exercice 7 - Gérer les données avec Redux

## Objectifs 
Cet exercice a pour objectifs : 
* Créer des actions redux permettant d'ajouter un article ou de le supprimer
* De créer un reducteur pour mettre à jour notre state
* De stocker nos données dans un store

## Installation et preparation

* Commençons par installer redux et la passerelle avec react et TS : 
```
npm install redux react-redux redux-thunk
npm install -D @types/react-redux 
```
* Nous allons ensuite refactoriser un peu notre code pour créer un model de donnée. Pour cela créer dans notre dossier src un fichier type.d.ts qui permet de déclarer des nouveaux type à TypeScript
* Ce fichier sert à déclarer notre modèle de donnée pour le réutiliser facilement partout dans notre code.
```typescript
interface IGame {
    id: number
    gameName : string;
    editorName : string;
    gameYear: number;
    category: string;
  }
  
  type GameState = {
    games: IGame[]
  }
  
  type GameAction = {
    type: string
    game: IGame
  }
  
  type DispatchType = (args: GameAction) => GameAction
```

* Nous pouvons maintenant attaquer la suite

## Définition des actions

* Commençons pr créer un dossier store dans le dossier src
* Puis nous allons déclarer les types d'actions dans un fichier store/actionTypes.ts
```typescript
export const ADD_GAME = "ADD_GAME"
export const REMOVE_GAME = "REMOVE_GAME"
```
* Cela permet de rendre disponible ces actions dans le store de Redux et est nécessaire au bon fonctionnement sur les dispatch
* Enquite nous allons déclarer le comportement de chacune de ces actions dans un autre fichier store/actionCreators.ts 
```typescript
import * as actionTypes from "./actionTypes"

export function addGame(game: IGame) {
  const action: GameAction = {
    type: actionTypes.ADD_GAME,
    game,
  }

  return simulateHttpRequest(action)
}

export function removeGame(game: IGame) {
  const action: GameAction = {
    type: actionTypes.REMOVE_GAME,
    game,
  }
  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: GameAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}
```
* Ici on déclare nos deux actions et on simule une requête HTTP (dans la partie Pour aller plus loin de cet exercice, on va ajouter l'appel à une API réelle)

## Définition des reducteurs
* Les reduceurs permettent de mettre à jour l'état du store en utilisant les actions. C'est ce qui permet à React de prendre connaissance des nouveaux états. 
* Créons un fichier store/reducer.ts qui contient une première partie avec la définition de l'état initiale (ici des données d'exemple):
```typescript
import * as actionTypes from "./actionTypes"

const initialState: GameState = {
  games: [
    {
      id: 1,
      gameName: "Nom du jeu", 
      editorName: "Days of wonders", 
      gameYear: 2004 , 
      category: "Familiale"
    },
    {
      id: 2,
      gameName: "7 wonders", 
      editorName: "Repos production", 
      gameYear: 2010 , 
      category: "Familiale" 
    },
  ],
}
```
* Puis une constante qui contient la logique : 
```typescript
const reducer = (
    state: GameState = initialState,
    action: GameAction
  ): GameState => {
    switch (action.type) {
      case actionTypes.ADD_GAME:
        const newGame: IGame = {
          id: Math.random(), // not really unique
          gameName: action.game.gameName,
          editorName: action.game.editorName,
          gameYear: action.game.gameYear,
          category: action.game.category,
        }
        return {
          ...state,
          games: state.games.concat(newGame),
        }
      case actionTypes.REMOVE_GAME:
        const updatedGames: IGame[] = state.games.filter(
          game => game.id !== action.game.id
        )
        return {
          ...state,
          games: updatedGames,
        }
    }
    return state
  }
  
  export default reducer
```
* Tout est prêt côté Redux, il ne reste plus qu'à utiliser nos actions et reducers


## Création du store et utilisation de nos actions dans nos composants
* Nous allons maintenant définir le store pour stocker nos données. Cela se fait au niveau du fichier index.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Store } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer from "./store/reducers"

const store: Store<GameState, GameAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
* Voici les modifications effectuées : 
    * Ajout des imports nécessaires
    * Définition d'une constante store qui va contenir nos données
    * Injection du Provider en parent de App pour passer le  store

* Nous allons maintenant brancher l'affichage de jeu sur le store, en modifiant le fichier components/game.tsx
```typescript
import * as React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

interface Props {
    game: IGame
    removeGame: (game: IGame) => void
}

export const GameComponent: React.FC<Props> = ({ game, removeGame }) => {
    const dispatch: Dispatch<any> = useDispatch();

    const deleteGame = React.useCallback(
        (game: IGame) => dispatch(removeGame(game)),
        [dispatch, removeGame]
    )

    return (
    <p>
        <h2>Nom du jeu: { game.gameName }</h2>
        <span>Editeur du jeu: { game.editorName }</span><br />
        <span>Nom du jeu: { game.gameYear }</span><br />
        <span>Nom du jeu: { game.category }</span>
    </p>
    )

};
```
* Voici les modifications effectuées : 
    * remplacement des propriétés dans Props par un objet IGame
    * ajout de removeGame pour pouvoir supprimer un jeu
    * Ajout de l'utilisation du Dispatch pour pouvoir utiliser les actions de Redux
    * Ajout d'une constante deleteGame pour permettre la suppression avec le dispatch de l'action correspondante
    * Remplacement sur le renvoit de props par l'objet game

* Nous devons également modifier le composant parent App pour permettre le dispatch et la récupération du store. 
```typescript
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
```
* Dans ce fichier App : 
    * remplacement des différents hooks par un appel au store redux pour aller chercher nos objets et actions
    * Au niveau du rendu, boucle avec map sur la liste des jeux, pour appeler le composant jeu en lui passant non plus les différentes propriétés mais directement l'objet concerné et la fonction attendue pour la suppression.

    
* Redux offre de nombreuses possibilités pour stocker et gérer nos données de manières centralisées. 

## Pour aller plus loin : 
* Brancher le submit du formulaire sur redux : https://www.vinta.com.br/blog/2020/integrating-formik-and-redux-an-easy-way-to-do-hard-things-in-react-forms/ 
* Appeler une vrai API avec Axios : https://www.bezkoder.com/react-typescript-api-call/ 

