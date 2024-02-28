import React from "react";

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GameAddComponent = (props: Props) => (
   <>
        <label>Nom du jeu</label>
        <input onChange={props.onChange}/>
   </> 
);

export default GameAddComponent;