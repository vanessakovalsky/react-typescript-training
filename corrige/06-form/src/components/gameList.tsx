import React, { useState } from 'react';

import GameItem from './gameItem';

import axiosInstance from '../http-common';

const GameList = () => {
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
                <GameItem game={game} />
            ))}
        </div>
      )
}

export default GameList