# Exercice 3 - Définir des variables (props)

## Objectifs : 

Cet exercice a pour objectifs : 
* De définir des variables 
* D'utiliser nos variables dans notre composant

Si nécessaire repartir du corrige de l'exercice 2 pour avoir un point de départ

## Ajouter des propriétés

* Créer un Composant Jeu (voir exercice précédent si nécessaire)
* Déclarer les propriétés suivantes :  
    * Nom du jeu : chaine de caractère
    * Editeur : chaine de caractère
    * Année : entier
    * Catégorie : chaine de caractère 

* exemple avec le nom du jeu 
```typescript
import * as React from 'react';

interface Props {
    gameName : string;
}

const GameComponent = (props: Props) => (
    <h2>Nom du jeu: { props.gameName } !</h2>
);

export default GameComponent;
```
* Ici on utilise l'interface Props pour définir notre variable
* Puis on appel l'objet props et sa propriétés que l'on a déclarés dans notre composant entre { }
* De la même façon ajouter les autres propriétés

## Utiliser notre composant et injecter les valeurs

* Nous importons notre composant et l'appelons comme pour le composant Welcome
```typescript
...
import WelcomeComponent from './welcome';
...
      <GameComponent gameName="Les aventuriers du rail" />
...
```
* La différence est que nous passons un paramètre à notre composant en lui précisant une valeur pour notre variable (props) au nom de gameName
* Ajouter également les valeurs pour les autres propriétés