import * as React from "react";
import { Formik, Form, Field, FormikHelpers, FormikProps} from 'formik';
import * as Yup from 'yup';
import {TextField} from '@mui/material';
import { addGame} from './../store/actionCreators';
import { useDispatch } from "react-redux"
import { Dispatch } from 'redux';

interface Values {
    nomDuJeu: string
    editeur: string
    anneeDeSortie: number
    categorie: string
}
const GameForm = () => {
    const dispatch: Dispatch<any> = useDispatch()

    return (
        <Formik 
            initialValues={{
                nomDuJeu: "Nom du jeu",
                editeur: 'Edition',
                anneeDeSortie: 2024,
                categorie: 'test'
            }}
        onSubmit= {( values: Values, {setSubmitting }: FormikHelpers<Values>) => {
            setTimeout(() =>  {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 500); 
            let game : IGame = {...values, id: Math.random()}    
            dispatch(addGame(game));
        }}
        validationSchema={Yup.object().shape({
            nomDuJeu: Yup.string()
                .matches(
                    /^([A-Z]*)([a-z]*)([0-9]*)\S$/
                )
                .required(
                    'Merci de saisir le nom d\'un jeu'
                )
        })
    }
        >
        {(props: FormikProps<Values>) => {
            const {
                values,
                touched,
                errors,
                handleBlur,
                handleChange,
                isSubmitting
            } = props
            return(
                <Form>
                <TextField 
                    id="nomDuJeu"
                    name="nomDuJeu"
                    placeholder="nomDuJeu"
                    type="text"
                    value={values.nomDuJeu}
                    helperText={
                        errors.nomDuJeu && touched.nomDuJeu
                            ? errors.nomDuJeu
                            : 'Entrer le nom du jeu'
                    }
                    error={
                        errors.nomDuJeu && touched.nomDuJeu
                            ? true
                            :false
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Field 
                    id="anneeDeSortie"
                    name="anneeDeSortie"
                    placeholder="anneeDeSortie"
                    type="number"
                />
                <button type="submit">Envoyer</button>
            </Form>
            )
        }}
           
        </Formik>

    );
}

export default GameForm