import * as actionTypes from "./actionTypes"

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

const reducer = (
    state: GameState = initialState,
    action: GameAction
  ): GameState => {
    switch (action.type) {
      case actionTypes.ADD_GAME:
        const newGame: IGame = {
          id: Math.random(), // not really unique
          nomDuJeu: action.game.nomDuJeu,
          editeur: action.game.editeur,
          anneeDeSortie: action.game.anneeDeSortie,
          categorie: action.game.categorie,
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