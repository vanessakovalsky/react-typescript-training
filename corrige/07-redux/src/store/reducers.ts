import * as actionTypes from "./actionTypes"

const initialState: GameState = {
  games: [
    {
      id: 1,
      gameName: "Les aventuriers du rail", 
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