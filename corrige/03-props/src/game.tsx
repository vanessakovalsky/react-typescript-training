import * as React from 'react';

interface Props {
    gameName : string;
    editorName : string;
    gameYear: number;
    category: string;
}

const GameComponent = (props: Props) => (
    <p>
        <h2>Nom du jeu: { props.gameName }</h2>
        <span>Editeur du jeu: { props.editorName }</span><br />
        <span>Nom du jeu: { props.gameYear }</span><br />
        <span>Nom du jeu: { props.category }</span>
    </p>

);

export default GameComponent;