import React from "react";

interface Props {
    nom: string;
    ville: string;
    age: number;
}

function Demo(props: Props){
    return <h3>Coucou depuis le composant demob de { props.nom} !</h3>;
}

export default Demo;