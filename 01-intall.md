# Exercice 1 - Installation et creation du template

Ce premier exercice a pour objectifs : 
* D'installer react sur sa machine 
* De créer notre template d'application

## Pré-requis
* Pour réaliser cet exercice vous aurez besoin :
* * D'installer nodeJS : https://nodejs.org/fr/download/
* * D'installer un éditeur de code comme visual studio code : https://code.visualstudio.com/download 

## Installation de react et creation de l'application
* Commencer par installer react : 
``` 
npm install create-react-app
```
* Créer la première application react en utilisant le template TypeScript :
```
npx create-react-app kingoludo --template typescript
```
- L'arborescence crée est alors celle-ci :
```
├── README.md
├── package.json
├── tsconfig.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   └── react-app-env.d.ts
│   └── reportWebVitals.ts
│   └── setupTests.ts
└── yarn.lock
```
* Le point d'entrée de l'application est index.tsx
* Un premier composant appelé App.tsx a été généré dans le dossier src
* Lancer l'application
```
npm start
```
* Que voyez-vous dans votre navigateur (s'il ne sait pas ouvert, l'application est accessible à l'url : http://localhost:3000 )


## Présentation du projet

Tout au long de ces exerices nous allons enrichir une application qui permet de gérer une ludothèque : 
* CRUD sur les jeux pour que chaque utilisateur puisse renseigner sa collection de jeux de sociétés
* Gestion des utilisateurs et des connexions 
* Statistiques et tableaux de bord 

Ce projet s'appuie sur une API qui est décrite ici : https://app.swaggerhub.com/apis/vanessakovalsky/BoardgamesV3/1.0.0 

Chaque exercice est accompagné d'un répertoire de correction qui est l'état dans lequel on arrive à la fin (le votre peut être légèrement différent, vu qu'il existe parfois plusieurs façons de faire la même chose en programmation). 
Il y aura à certains moments des exercices bonus avec un titre "Pour aller plus loin", ceux-ci sont facultatifs et vous permettent d'enrichir votre application ou de continuer à travailler en autonomie par la suite.