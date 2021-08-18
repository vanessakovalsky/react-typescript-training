import * as actionTypes from "./actionTypes"

const initGame: IGame = {
  id: 14,
  nomDuJeu: 'Jeu du hook',
  editeur: 'Editeur',
  anneeDeSortie: 2007,
  categorie: 'Expert'
}

export const addGame: GameAction = {
    type: actionTypes.ADD_GAME,
    game: initGame
}

export const removeGame: GameAction = {
    type: actionTypes.REMOVE_GAME,
    game: initGame
}
