import React from "react";
import GameItemComponent from "./GameItemComponent";
import axiosInstance from './../http-common';

const GameListComponent = () => {
  const [games,setGames] = React.useState<Game[]>([]);;
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
        {games.map((game: any) => (
            <div key={game.id}>
                <GameItemComponent params={game} />
            </div>     
        ))}
        </div>
    )
}

export default GameListComponent;