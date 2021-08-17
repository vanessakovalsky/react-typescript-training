import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import GameItem from './gameItem';

import axiosInstance from '../http-common';

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

      return (
        <div>
            {games.map((game: Game) =>(
                <Link to={'/game/'+ game.id}>
                    <GameItem game={game} />
                </Link>
            ))}
        </div>
      )
}

export default GameList