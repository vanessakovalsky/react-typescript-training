import React, { useReducer, useState, useContext } from 'react';
import GameItem from './gameItem';

import axiosInstance from '../http-common';
import { addGame, removeGame } from '../store/actionCreators';
import { AppContext } from './../context';

export const GameList = () => {
    const [games,setGames] = useState<Game[]>([]);;
    React.useEffect(() => {
        axiosInstance.get<Game[]>('/jeux')
            .then(response => {
                setGames(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(() => {
                console.log(games)
            });

        }, []);

        console.log(games)

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