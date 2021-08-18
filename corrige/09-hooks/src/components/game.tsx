import * as React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

interface Props {
    game: IGame
    removeGame: (game: IGame) => void
}

export const GameComponent: React.FC<Props> = ({ game, removeGame }) => {
    const dispatch: Dispatch<any> = useDispatch();

    const deleteGame = React.useCallback(
        (game: IGame) => dispatch(removeGame(game)),
        [dispatch, removeGame]
    )

    return (
    <p>
        <h2>Nom du jeu: { game.nomDuJeu }</h2>
        <span>Editeur du jeu: { game.editeur }</span><br />
        <span>Nom du jeu: { game.anneeDeSortie }</span><br />
        <span>Nom du jeu: { game.categorie }</span>
    </p>
    )

};