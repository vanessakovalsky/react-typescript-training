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