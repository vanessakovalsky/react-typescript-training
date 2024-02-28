import React, { createContext, useReducer, Dispatch} from 'react';

import reducer from './store/reducer';


const initialState: GameState = {
    games: [
      {
        id: 1,
        nomDuJeu: "Nom du jeu", 
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

  const AppContext = createContext<{
    state: GameState;
    dispatch: Dispatch<GameAction>;
  }>({
    state: initialState,
    dispatch: () => null
  });

  const AppProvider: React.FC<{children: any}> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
  }

  export { AppProvider, AppContext}