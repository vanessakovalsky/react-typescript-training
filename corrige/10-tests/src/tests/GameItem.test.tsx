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