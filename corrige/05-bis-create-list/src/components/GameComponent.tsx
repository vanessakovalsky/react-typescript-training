import * as React from 'react';

interface Props {
    gameName : string;
}

const GameComponent = (props: Props) => (
    <h2>Nom du jeu: { props.gameName } !</h2>
);

export default GameComponent;