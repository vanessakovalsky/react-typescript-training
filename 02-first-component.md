# Exercice 2 - Premier composant

## Objectifs

Cet exercice a pour objectifs : 
* de créer un composant
* de l'afficher dans l'application

## Création du composant

* Pour déclarer un nouveau composant, créer un fichier welcome.tsx dans le dossier src (le nom du fichier doit être le nom du composant en minuscule)
* Ce fichier contient le code suivant :
``` typescript
import * as React from "react";

const WelcomeComponent = () => {
  return <h2>Welcome component !</h2>;
};

export default WelcomeComponent;
```
* Etudions en détail ce fichier : 
    * l'import permet d'indiquer que l'on utilise React
    * ensuite nous déclarons sous forme de constante un composant 
    * Cette constante contient une fonction anonyme qui contient notre code
    * Dans notre cas on renvoit seulement du HTML
    * Puis nous exportons notre constante pour pouvoir l'utiliser


## Utilisation de notre composant

* Afin d'afficher notre composant, nous devons l'appeler
* Pour cela on modifie le fichier App.tsx
* On va importer notre composant
* Puis l'appeler au sein de la fonction de rendu
``` typescript
import React from 'react';
import logo from './logo.svg';
import './App.css';
import WelcomeComponent from './welcome';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <WelcomeComponent />
    </div>
  );
}

export default App;
```

* Ici nous avons ajouter notre composant après le header 