import React from "react";

interface Props {
    params: IGame
}

const GameItemComponent : React.FC<Props> = ({params}) => {
    return (
        <div>
            <h2>Nom du jeu: { params.nomDuJeu }</h2>
            <span>Editeur du jeu: { params.editeur }</span><br />
            <span>Nom du jeu: { params.anneeDeSortie }</span><br />
            <span>Nom du jeu: { params.categorie }</span>  
        </div> 
    )
}

export default GameItemComponent;