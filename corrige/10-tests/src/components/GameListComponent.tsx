import React, { useContext } from "react";
import GameItemComponent from "./GameItemComponent";
import axiosInstance from './../http-common';
import { AppContext } from "../context";

interface Props {
    games: IGame[]
}

const GameListComponent  = () => {
    // 1 - On obtient la liste depuis l'API
//   const [games,setGames] = React.useState<Game[]>([]);;
//   React.useEffect(() => {
//       axiosInstance.get<Game[]>('/jeux')
//           .then(response => {
//               setGames(response.data);
//           })
//           .catch(function (error) {
//               // handle error
//               console.log(error);
//           })
//           .then(() => {
//               console.log(games)
//           });

//       }, []);

//       console.log(games)
    // 2. On stocke la liste dans REDUX
    // const games: readonly IGame[] = useSelector(
    //     (state: GameState) => state.games,
    //     shallowEqual
    // )

    // 3 . On stocke la liste avec un Context React
    const { state, dispatch } = useContext(AppContext);

    const newGame : IGame = { 
        id: Math.random(),
        nomDuJeu: "Ajout jeu", 
        editeur: "Asmodée", 
        anneeDeSortie: 2004 , 
        categorie: "Familiale" 
      }

      return (
        <div>
            <button
                onClick={() => dispatch({type: 'ADD_GAME', game: newGame})}
            >Ajouter un jeu</button>
            {state.games.map((game: IGame) => (
            <div key={game.id}>
                <GameItemComponent params={game} />
                <button
                        onClick={() => dispatch({type: 'REMOVE_GAME', game: game})}
                    >Supprimer un jeu
                </button>
            </div>     
        ))}
        </div>
    )
}

export default GameListComponent;