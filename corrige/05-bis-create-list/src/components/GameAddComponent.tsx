import React from "react";

interface Props {
    nomDuJeu: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GameAddComponent = (props: Props) => (
   <>
        <label>Nom du jeu</label>
        <input value={props.nomDuJeu} onChange={props.onChange}/>
   </> 
);

export default GameAddComponent;