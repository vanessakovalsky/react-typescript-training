# Exercice 10 - Test unitaire

## Objectifs

Cet exercice a pour objectifs : 
* De tester nos composants
* De tester le comportement de nos composants

## Tester le composant GameItem

* Il n'y a pas de configuration particulière à faire, puisque create-react-app à créer pour nous les différents fichiers nécessaires à l'éxecution des tests avec Jest
* Nous allons commencer par créer un test pour s'assurer que notre composant GameItem fonctionne.
* Pour cela dans le dossier src, nous creons un dossier __tests__ 
* Dans ce nouveau dossier nous créons un fichier GameItemComponent.test.tsx
```typescript 
import React from "react";

import { render, fireEvent } from "@testing-library/react";


import GameItemComponent from "../components/GameItemComponent";


function renderGameItem() {

    const game: IGame = {
        id: 1,
        nomDuJeu: "Les aventuriers du rail", 
        editeur: "Days of wonders", 
        anneeDeSortie: 2004 , 
        categorie: "Familiale"
    };
  
    return render(<GameItemComponent params={game} />);

  }

describe("<GameItemComponent /> test", () => {

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
* Pour lancer vos tests :
```
npm test
```
* Vous pouvez maintenant tester l'intégralité du composant en ajoutant des assertions pour chaque donnée

## Tester le comportement

* Nous allons maintenant tester que l'évènement sur la soumission du formulaire se déclenche correctement. 
* Pour cela nous créons un fichier __tests__/GameForm.test.tsx avec le contenu suivant :

```typescrit
import React from 'react'
import {render, screen, waitFor, fireEvent, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GameForm from '../components/GameForm'

test('rendering and submitting a basic Formik form', async () => {
    const mock = jest.fn();
    const gameForm = render(<GameForm />)

    const nomDuJeu = await waitFor(() => screen.getByRole('input', {name: /nomDuJeu/i}));
    const button = await waitFor(() => screen.getByRole('submit'));


    fireEvent.change(nomDuJeu, {
        target: {
          value: 'TestJeu',
        },
      });
  
      fireEvent.click(button);

      waitFor(() => {
        expect(mock).toBeCalled();
        expect(mock.mock.calls[0][0].name).toBe('TestJeu');
      });
})
``̀`

* En détail :
    * on mock une fonction pour vérifier qu'elle est appelé (ici celle du onSubmit)
    * on fait le rendu du jeu
    * on définit le champ à remplir et le bouton de submit
    * on rempli le champs avec fireEvent.change
    * on déclenche le clic
    * on vérifie le résultat.

* N'hésitez pas à commenter la partie Redux pour faire votre test dans un premier temps, puis à mocker le store pour compléter le test :)

## Pour aller plus loin :

* Afin de compléter les tests il est possible de mocker un composant : https://robertmarshall.dev/blog/how-to-mock-a-react-component-in-jest/
* Voici quelques tests à écrire pour cette application : https://github.com/vanessakovalsky/react-ts-kingoludo/blob/main/test_a_faire.md
    
