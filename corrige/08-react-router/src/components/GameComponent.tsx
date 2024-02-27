import * as React from 'react';

import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { addGame, removeGame } from './../store/actionCreators';
import { useParams } from "react-router-dom";


interface Props {
    game: IGame,
    removeGame: (game: IGame) => void
}



export const GameComponent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();

    const deleteGame = React.useCallback(
        (game: IGame) => dispatch(removeGame(game)),
        [dispatch, removeGame]
    )
    const params = useParams();

    return (
        <div>
            <span>id du jeu : { params.id } </span>    
        </div>

    );
};