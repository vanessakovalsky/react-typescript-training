# Exercice 5 - Callback, Composant enfant et refactorisation

## Objectifs 

Cet exercice a pour objectifs : 
* de refactoriser le code pour utiliser un callback pour la MAJ
* d'utiliser un composant enfant pour faciliter la réutilisation et la séparation du code

## Utilisation d'un callback

* Afin d'éviter la mise à jour à chaque touche de clavier, notamment pour des questions de performances, nous souhaitons mettre en place un bouton qui déclenchera la mise à jour
* Pour cela, on modifie le composant NameEdit de la façon suivante :
```typescript
import * as React from "react";

interface Props {
  initialGameName: string;
  onNameUpdate: (newName: string) => any;
}

const NameEditComponent = (props: Props) => {
    const [editingName, setEditingName] = React.useState(props.initialGameName);
    
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setEditingName(e.target.value);
    }
    
    const onNameSubmit = (event: any): any => {
       props.onNameUpdate(editingName);
    }
    
    return (
        <>
            <label>Update game name:</label>
            <input value={editingName} onChange={onChange} />
            <button onClick={onNameSubmit}>Change</button>
        </>
    );
};

export default NameEditComponent;
```
* Ici on a
    * ajouter une variable contenant la donnée initiale
    * remplacer l'action de l'évènement onChange par l'action déclenchée par l'évènement onClick qui est une fonction en charge de mettre à jour la variable

* On va également faire les modifications dans le App.tsx pour refleter ce nouveau mode de fonctionnement : 
```typescript
import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameComponent from './game';
import NameEditComponent from './nameedit';

function App() {

  const [name, setName] = React.useState("Les aventuriers du rail");

  const setGamenameState = (newName: string) => {
    setName(newName);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <GameComponent gameName={name} />
      <NameEditComponent initialGameName={name} onNameUpdate={setGamenameState} />

    </div>
  );
}

export default App;
```
* Dans le app : 
    * on remplace l'utilisation de l'évènement onChange par l'appel à une fonction 
    * on remplace dans l'appel au composant la variable a appelé et l'évènement déclenché.

* Faite de même avec les autres données

## Refactoriser pour permettre la MAJ depuis d'autres composants

* Imaginer que vos données doivent également être mise à jour par un autre composant, comme un appel API qui a lieu périodiquement.
* On va alors avoir un problème pour car les données ne sont mise à jour depuis le parent que lors de l'initialisation de l'état. Et donc si un autre composant vient mettre à jour nos données dans App, nos composant EditNames et les autres ne seront pas au courant et ne récupèrerons pas ces nouvelles données. 
* Pour résoudre ce problème il existe deux solutions : 
    * La première est de continuer ce que l'on a fait et de remonter d'un niveau dans app le nom initial de sorte à ce qu'il soit redescendu à tous les enfant lorsqu'il est mis à jour. Cette approche bien que fonctionnelle est un peu lourde et signifie que notre composant parent le plus "haut" va porter beaucoup de données
    * La seconde approche, demande à changer de paradygme : le composant parent porte alors la fonctionnalité de mise à jour de la donnée (ici le name), et les composants enfant demanderont une mise à jour via un callback. Cela présente deux avantages : 
        * Le composant enfant garde un role de présentation uniquement
        * Les mise à jour ne sont faite qu'à un seul endroit, et on peut les contrôler. Exemple, si l'utilisateur a commencé à taper dans le champs, on empêche la mise à jour depuis l'appel AJAX. 
        --> Nous allons donc utiliser cette seconde approche.

* On va donc commencer par rajouter le nom modifié dans App :
```typescript
...
function App() {

  const [name, setName] = React.useState("Les aventuriers du rail");

  const [editingName, setEditingName] = React.useState("Les aventuriers du rail");

  // Fonction qui simule un appel asynchrone toutes les 500ms
  const loadGamename = () => {
    setTimeout(() => {
      setName("name from async call");
      setEditingName("name from async call");
    }, 500);
  };

  React.useEffect(() => {
    loadGamename();
  },
  []);

  const setGamenameState = () => {
    setName(editingName);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <GameComponent gameName={name} editorName={editor} gameYear={year} category={category} />
      <NameEditComponent 
        initialGameName={name} 
        editingName={editingName}
        onNameUpdate={setGamenameState}
        onEditingNameUpdated={setEditingName}
      />
...
```
* On a donc : 
    * Ajouter une variable editingName et son etat
    * Ajouter une fonction qui met à jour périodiquement le nom
    * Changer la fonction de mise à jour de l'état du nom pour utiliser notre variable contenant la donnée mise à jour
    * Ajouter les variables à l'appel de notre composant

* Côté composant NameEdit : 
```typescript
import * as React from "react";

interface Props {
  initialGameName: string;
  editingName: string;
  onNameUpdate: () => any;
  onEditingNameUpdated: (newEditingName: string) => any;
}

const NameEditComponent = (props: Props) => {
    
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        props.onEditingNameUpdated(e.target.value)
    }
    
    const onNameSubmit = (event: any): any => {
       props.onNameUpdate();
    }
    
    return (
        <>
            <label>Update game name:</label>
            <input value={props.editingName} onChange={onChange} />
            <button onClick={onNameSubmit}>Change</button>
        </>
    );
};

export default NameEditComponent;
```
* Voici le détail de ce qui a été modifié : 
    * Ajout des props manquantes
    * Suppression de la constante d'edition (puisqu'elle est remontée au niveau du parent)
    * Ajustement des fonctions onSubmit et onChange
    * Ajustement des valeurs de l'input, on récupère la valeur du parent avec props de nouveau

* Vous pouvez faire la même refactorisation pour les autres données