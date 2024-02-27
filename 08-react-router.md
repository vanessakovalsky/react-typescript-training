# Exercice 8 - Ajout d'un menu avec React Router

## Objectifs : 
Cet exercice a pour objectifs : 
* De créer un menu avec des routes
* De définir des liens avec des paramètres 

## Créer un menu avec des routes
* Nous utilisons react-router qu'il faut commencer par installer :
```
npm install react-router-dom localforage match-sorter sort-by
```
* Commençons par créer un dossier pages dans src
* Puis créons deux pages : 
    * home.tsx : contient la page d'accueil 
    * addGame.tsx : contient le formulaire d'ajout d'un jeu 

* Ensuite on vient remplacer le contenu de App en définissant un routeur qui va contenir à la fois le menus et les routes associées : 
```typescript
import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Home}   from './pages/home'
import {AddGame}  from './pages/addGame';

const App = () =>  {
  return (
    <div className="App">
     <Router>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/addGame">Add Game</Link>
        </nav>
         <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/addGame" element={<AddGame />} />
         </Routes>
     </Router>
    </div>
  );
}

export default App;
```
* Si nous détaillons un peu : 
    * Router permet d'utiliser le composant de router de react-router
    * Link permet de faire des liens (html) vers des routes, en faisant la correspondance entre le to du link et le path de la route
    * Route permet de lier un chemin (path) avec un composant

  * Ajouter une page avec la liste des jeux  et un lien pour accéder à cette page depuis le menu.

## Utiliser les paramètres d'URL

* Pour ajouter un paramètre d'URL, il est nécessaire de l'ajouter au niveau de la route avec la syntaxe :nomduparametre
```typescript
<Route path="/game/:id" element={<Game />} />
```
* et de rajouter le paramètre au niveau du lien également :
```typescript
<Link to="/game/{id}">{nomDuJeu}</Link>
```
* Ajouter une page pour afficher un jeu spécifique à l'aide du composant Game
* Ajouter dans la liste des jeux un lien vers la page correspondante à l'ID

## Pour aller plus loin :

* Voir le tutoriel de react router qui permet notamment :
  * De définir un composant Root racine contenant toutes les routes dans un fichier propre
  * De gérer les pages non trouvées (404)
  * Et bien d'autres choses
  https://reactrouter.com/en/main/start/tutorial 
