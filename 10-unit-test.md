# Exercice 10 - Test unitaire

## Objectifs

Cet exercice a pour objectifs : 
* De tester nos composants
* De tester le comportement de nos composants
* De simuler (mocker) un composant pour rendre nos tests indépendants les uns des autres

## Tester le composant GameItem

* Il n'y a pas de configuration particulière à faire, puisque create-react-app à créer pour nous les différents fichiers nécessaires à l'éxecution des tests avec Jest
* Nous allons commencer par créer un test pour s'assurer que notre composant GameItem fonctionne.
* Pour cela dans le dossier src, nous creons un dossier __tests__ 
* Dans ce nouveau dossier nous créons un fichier GameItem.test.tsx
```typescript 
import React from "react";

import { render, fireEvent, waitForElement } from "@testing-library/react";


import GameItem from "../components/gameItem";


function renderGameItem() {

    const game: IGame = {
        id: 1,
        nomDuJeu: "Les aventuriers du rail", 
        editeur: "Days of wonders", 
        anneeDeSortie: "2004" , 
        categorie: "Familiale"
    };
  
    return render(<GameItem game={game} />);

  }

describe("<GameItem /> test", () => {

  test("should display a game", async () => {
    const  gameItem = renderGameItem();
    
    expect(gameItem.findByTitle('Nom du jeu: Les aventuriers du rail'));
  
  });

});
```
* Pour expliquer un peu : 
    * describe décrit le cas général de test, il contient plusieurs tests
    * test est la fonction qui va exécuter le test, elle prend un nom et une fonction (asynchrone la plupart du temps)
    * expect est l'assertion que l'on cherche à vérifier (il en existe de nombreuses sorte : https://jestjs.io/docs/expect )
    * la fonction render utilisée dans renderGameItem, permet de générer le rendu du composant à partir des données fictives que nous lui avons injecté.

* Vous pouvez maintenant tester l'intégralité du composant en ajoutant des assertions pour chaque donnée

## Tester le comportement

* Nous allons maintenant tester que l'évènement sur la soumission du formulaire se déclenche correctement. 
* Pour cela nous créons un fichier __tests__/