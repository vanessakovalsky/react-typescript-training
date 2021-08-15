# Exercice 4 - Etat (State) et évènement

## Objectifs

Cet exercice a pour objectifs : 
* d'utiliser le state pour gérer les données 
* d'interagir sur les évènements utilisateurs

Pour démarrer, si nécessaire repartir du corrigé de l'exercice 3 

## Présentation du composant App et définition du state 

* Lors de la génération de notre application, un composant App a été généré. 
* Celui-ci a plusieurs rôle :
    * Contenir l'ensemble des composants de notre application
    * Définir les données utiles à tous les composants
    * Définir les routes et bien d'autres éléments. 
* Dans notre cas, nous avons déjà ajouté les composants Welcome et Game à celui-ci. 
* Voyons comment définir des données et les utiliser : 
```typescript
import * as React from "react";

import { GameComponent } from "./game";

export const App = () => {
  const [name, setName] = React.useState('defaultGameName');
  return <GameComponent gameName={name} />;
};
```
* Si on analyse ce qui est fait : 
    * On définit une constante qui prend le nom du state (name dans notre exemple) et la fonction qui va permettre de mettre à jour la donnée. Cela est possible avec les hooks qui seront expliquées plus tard.
    * On utilise notre state "name" pour passer la donnée à notre composant

* Ajouter les autres données à notre composant App.

## Mettre à jour le nom du jeu lors de la saisie de l'utilisateur

* Nous allons maintenant ajouter un composant qui permet à l'utilsiateur de modifier le nom du jeu. 
* Créer un composant nameEdit 
```typescript
import * as React from "react";

interface Props {
  gameName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default const NameEditComponent = (props: Props) => (
  <>
    <label>Update game name:</label>
    <input value={props.gameName} onChange={props.onChange} />
  </>
);
```
* Si l'on détaille ce qui est fait en plus sur ce composant : 
    * Dans les Props on a ajouter un appel à l'évènement onChange qui permet d'associer une fonction à un évènement)
    * Dans le JSX on a aussi ajouter l'élément onChange pour déclencher l'appel à la fonction

* Au niveau du composant app, nous associons l'évènement à la définition du state : 
```typescript
import * as React from "react";
import { GameComponent } from "./game";
import { NameEditComponent } from './nameEdit';


export const App = () => {
  const [name, setName] = React.useState("defaultGameName");

    const setGamenameState = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    }

      return (
        <>
          <GameComponent gameName={name} />
          <NameEditComponent gameName={name} onChange={setGamenameState} />
        </>
      );
;
```
* Ici on récupère la valeur saisie dans le input pour mettre à jour la donnée (state) de "name" 

* Ajouter les mise à jour pour l'ensemble des données