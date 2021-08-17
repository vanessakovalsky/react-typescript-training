# Exercice 6 - Formulaires

## Objectifs : 
Cet exercice a pour objectifs : 
* De créer un formulaire permettant d'ajouter / modifier un jeu
* D'apprendre à utiliser des bibliothèque pour accélerer le développement
* De valider les données saisies dans le formulaire

## Refactorisation 

* On va commencer par reorganiser un peu notre dossier src : 
    * créer dans le dossier src un dossier components
    * créer dans le dossier src un dossier models
    * déplacer tous les composants sauf app dans le dossier components 
* Nous allons ensuite créer un fichier index.tsx dans le dossier src/components qui permet de réorganiser les fichiers plus tard sans avoir besoin de toucher aux imports de ces composants
```typescript
export * from "./game";
export * from "./nameEdit";
```
* Dans chaque composant il est également nécessaire de déplacer l'export, supprimer l'export par défaut de la dernière ligne et mettre l'export directement sur la constante qui contient le composant : 
```typescript
...
export const NameEditComponent = (props: Props) => {
...
```
* Puis nous allons remanier l'import dans le fichier App.tsx en remplaçant les différentes lignes d'import pas l'import depuis le fichier index
```typescript
import { GameComponent, NameEditComponent, EditorEditComponent, YearEditComponent, CategoryEditComponent} from './components';
```

--> Le code est maintenant organisé un peu plus proprement.

## Création du formulaire

* Afin de gagner du temps sur la création de formulaire, nous allons ajouter une dépendance spécifique au formulaire qui est formik, l'un des outils les plus utilisés : https://formik.org/
```
npm install formik --save
```
* Créer un composant de formulaire pour notre jeu, nous l'appelons GameForm 
```typescript
import { Button, TextField } from "@material-ui/core";
import * as React from "react";
import { Formik, Form, Field, FormikHelpers } from 'formik';

interface Values {
    gameName : string;
    editorName : string;
    gameYear: number;
    category: string;
}

export const GameForm = () => {
  return (
    <Formik
      initialValues={{ 
          gameName: "Nom du jeu", 
        }}
      onSubmit={(values: Values, {setSubmitting }: FormikHelpers<Values>) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      render={() => (
        <Form>
          <div>
            <Field
              id="gameName"
              name="gameName"
              placeholder="gameName"
              type="text"
            />
          </div>
          <button type="submit">submit</button>
        </Form>
      )}
    />
  );
};
```
* Si l'on détaille un peu : 
    * Le composant Formik est le parent qui contient différents éléments : les valeurs initiales, le comportement et le rendu du formulaire
    * Le composant Form contient le rendu du formulaire
    * Celui-ci est composé de champs qui utilise le composant Field qui permet de rendre générique la déclaration de champs d'un formulaire

* Ajouter les 3 autres données et champs à notre formulaire

## Amélioration des composants de formulaires avec Material UI 

* Afin de se faciliter la vie d'un point de vue présentation et de ne pas recréer des composants utiles sur l'ensemble ou presque des applications, nous avons choisi d'utiliser Material UI : https://material-ui.com/ 
* En résumé : c'est un ensemble de composant qui facilite et accélère le développement 
* Pour commencer, installons material ui : 
```
npm install @material-ui/core 
```
* Il est maintenant prêt à être utiliser :) pour les composant comme les champs ou les boutons.
* On va donc modifier le formulaire comme suit en utilisant les possibilité de Material UI :
```typescript
import { Button, TextField, Grid } from "@material-ui/core";
import * as React from "react";
import { Formik, Form, FormikHelpers, FormikProps } from 'formik';

interface Values {
    gameName : string;
    editorName : string;
    gameYear: number;
    category: string;
}

export const GameForm = () => {
  return (
    <Formik
      initialValues={{ 
          gameName: "Nom du jeu", 
          editorName: "Asmodée", 
          gameYear: 2004 , 
          category: "Familiale" 
        }}
      onSubmit={(values: Values, {setSubmitting }: FormikHelpers<Values>) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
    >
    {(props: FormikProps<Values>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                    } = props
        return (
        <Form>
            <Grid
                container
                justify="space-around"
                direction="row"
            >
            <Grid
                item
                lg={10}
                md={10}
                sm={10}
                xs={10}
                className='champtext'
            >
                <TextField
                id="gameName"
                name="gameName"
                placeholder="gameName"
                type="text"
                value={values.gameName}
                onChange={handleChange}
                onBlur={handleBlur}
                />
          </Grid>
          <Button type="submit">submit</Button>
          </Grid>
        </Form>
        )
    }}
    </Formik>
  );
};
```
* Quelques explications : 
    * On a ajouté les imports de certains éléments : Grid, TextField, Button de Material UI
    * On a sorti le rendu du formulaire de formik et donc utilisé une paire de balise oubrante/fermante pour Formik
    * Les champs Field ont été remplacé par des champs TextField
    * On a ajouté la valeur dans chaque champ
    * On ajoute également le comportement sur chaque champs pour que ceux-ci restent modifiables
    * On récupère les props de Formik pour pouvoir afficher la valeur courante de la donnée
    * Les champs sont positionnés dans le composant à l'aide d'une grille qui prend de nombreux paramètres d'affichage
    * On utilise le composant Boutton également à la place du bouton standard de JSX

* Ajouter les autres champs à l'aide de material ui (vous pouvez par exemple aller chercher un champ Select pour la catégorie)

## Validation des formulaires

* Il est possible de valider ses données de différentes façons : 
    * avec React et TS directement
    * avec Formik via validate et validationSchema : https://formik.org/docs/guides/validation 
    * avec un outil dédié comme Yup : https://github.com/jquense/yup
* Nous avons choisis la dernière solution car c'est celle qui permet d'avoir le code le plus concis et clair possible.
* Commençons par l'installer 
```
npm install -S yup
```
* On va donc rajouter une validation pour s'assurer que le nom de notre jeu ne contient que des lettres et des chiffres par exemple : 
```typescript
...
import * as Yup from 'yup'
...
validationSchema={Yup.object().shape({
 gameName: Yup.string()
                        .matches(
                            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S$/
                        )
                        .required(
                            'Please valid game name. Only letter and number are allowed'
                        ),
...
```
* Cela s'ajoute directement dans la déclaration du composant Formik, sans oublier de l'importer également .
* On peut alors définir des règles de validation pour chaque champs, comme le type de chaine, ou une regex ou le fait qu'un champ soit obligatoire (l'ensemble des fonction de validation est disponible ici: https://github.com/jquense/yup#api)
* On peut également au niveau du champs ajouter l'afffichage du message d'erreur en cas de non validation : 
```typescript
...
                helperText={
                    errors.gameName && touched.gameName
                        ? errors.gameName
                        : 'Enter your game name.'
                }
                error={
                    errors.gameName && touched.gameName
                        ? true
                        : false
                }
...
```

* On a alors un formulaire fonctionnel qui vérifie les saisies et récupère bien les données
* Ajouter la validation sur les 3 autres champs

## Pour aller plus loin
* Ajouter l'appel POST sur le formulaire sur la soumission du formulaire
* Dans la liste des jeux, ajouter un bouton de modification pour arriver sur le formulaire avec les bonnes données
 