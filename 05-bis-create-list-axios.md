# Créer une liste et appeler une API

## Objectifs

Cet exercice a pour objectifs :
* De créer une liste de jeux
* D'appeler l'API pour récupérer la liste

## Créer la liste de jeux

* Créer un composant gameList.tsx 
* Le composant va servir a obtenir la liste des jeux et à l'afficher
```typescript
import * as React from "react";

export const GameList = () => {
    const games = [
        {
          id: 1,
          gameName: "Les aventuriers du rail", 
          editorName: "Days of wonders", 
          gameYear: 2004 , 
          category: "Familiale"
        },
        {
          id: 2,
          gameName: "7 wonders", 
          editorName: "Repos production", 
          gameYear: 2010 , 
          category: "Familiale" 
        },
      ];
    return (
        <div>
        {games.map((game: any) => (
            <div>
        <h2>Nom du jeu: { game.gameName }</h2>
        <span>Editeur du jeu: { game.editorName }</span><br />
        <span>Nom du jeu: { game.gameYear }</span><br />
        <span>Nom du jeu: { game.category }</span>  
        </div>     
        ))}
        </div>
    )
}
```
* Créer un second composant GameItem qui contiendra le détail d'un jeu et mettre à jour le composant de liste pour utiliser ce sous-composant.

## Récupération des données via l'API

* Nous allons utiliser axios :
``` 
npm install axios
npm install prop-types
npm install react-axios --legacy-peer-deps
```
* Puis nous créons un fichier http-common.ts dans src qui contient les paramètres par défaut d'appel à notre API : 
```typescript
import axios from "axios";

export default axios.create({
  baseURL: "https://virtserver.swaggerhub.com/vanessakovalsky/BoardgamesV3/1.1.3",
  headers: {
    "Content-type": "application/json"
  }
});
```
* Ensuite dans notre composant gameList nous allons faire un appel à l'API : 
```typescript
const [games,setGames] = useState<Game[]>([]);;
    React.useEffect(() => {
        axiosInstance.get<Game[]>('/jeux')
            .then(response => {
                setGames(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(() => {
                console.log(games)
            });

        }, []);
```
* Nous utilisons le hook useEffect qui sera détaillé plus tard.
* Nous utilisons également l'instance axios que nous avons crées, puis utilisons la fonction get sur cette instance. Les méthodes utilisables par axios sont documentées ici : https://github.com/axios/axios  
* Afin de faire correspondre notre modele à l'API, nous avons défini une interface dans le fichier react-app-env.d.ts (créé à l'initialisation de l'app) : 
```typescript
interface Game {
    id: number
    nomDuJeu: string
    editeur: string
    anneeDeSortie: number
    categorie: string  
}

interface Games {
    list: Game[]
}
```
* Cet interface dans ce fichier nous permet de ne pas redéclarer notre modèle et de faire prendre connaissance à typescript de notre type de données spécifiques

## Pour aller plus loin 
* Sorter l'affichage d'un jeu dans un composant dédié 
* Ajouter des boutons pour trier les jeux par titre et / ou date de sorties et / ou editeurs
* Ajouter un bouton en face de chaque jeu pour supprimer le jeu depuis son ID
