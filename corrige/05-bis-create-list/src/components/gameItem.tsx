import React from "react";

interface Props {
    game: Game
}

const GameItem : React.FC<Props> = ({game}) => {
    return (
        <div>
            <h2>Nom du jeu: { game.nomDuJeu }</h2>
            <span>Editeur du jeu: { game.editeur }</span><br />
            <span>Nom du jeu: { game.anneeDeSortie }</span><br />
            <span>Nom du jeu: { game.categorie }</span>  
        </div> 
    )
}

export default GameItem;