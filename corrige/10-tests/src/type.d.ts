interface IGame {
    id: number
    nomDuJeu : string;
    editeur : string;
    anneeDeSortie: number;
    categorie: string;
  }
  
  type GameState = {
    games: IGame[]
  }
  
  type GameAction = {
    type: string
    game: IGame
  }
  
  type DispatchType = (args: GameAction) => GameAction