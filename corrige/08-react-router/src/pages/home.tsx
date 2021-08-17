import * as React from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from 'redux';
import { addGame, removeGame } from '../store/actionCreators';
import { GameComponent} from '../components';


export const Home = () => {
    const games: readonly IGame[] = useSelector(
        (state: GameState) => state.games,
        shallowEqual
    )

    const dispatch: Dispatch<any> = useDispatch()

    const saveGame = React.useCallback(
        (game: IGame) => dispatch(addGame(game)),
        [dispatch]
    )
    return (
        <div>
            {games.map((game: IGame) => (
                <GameComponent key={game.id} game={game} removeGame={removeGame} />
            ))}
        </div>
    )
};