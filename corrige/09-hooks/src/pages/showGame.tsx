import React from "react"
import {RouteComponentProps } from "react-router-dom"
import axiosInstance from '../http-common';

import { GameItem } from "../components"

type TParams = {
    id: string
}

export const ShowGame = ({ match }: RouteComponentProps<TParams>) => {
    const demoGame: Game = {
        id: 42,
        nomDuJeu: "Nom du jeu demo",
        editeur: "Editeur",
        anneeDeSortie: 2007,
        categorie: "Expert"
    }
    const [game,setGame] = React.useState<Game>(demoGame);
    React.useEffect(() => {
        axiosInstance.get<Game>('/jeux/'+ match.params.id)
            .then(response => {
                setGame(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(() => {
            });

        }, []);
        console.log(game)
    return (
        <div>
            <GameItem game={game} />

        </div>
    );
}