import { Button, TextField, Grid } from "@material-ui/core";
import * as React from "react";
import { Formik, Form, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup'

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
        validationSchema={Yup.object().shape({
            gameName: Yup.string()
                .matches(
                    /^([A-Z]*)([a-z]*)([0-9]*)\S$/
                )
                .required(
                    'Please valid game name. Only letter and number are allowed'
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
                        isSubmitting,
                    } = props
        return (
        <Form>
            <Grid
                container
                justifyContent="space-around"
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
                onChange={handleChange}
                onBlur={handleBlur}
                />
          </Grid>
          <div>
            <TextField
              name="editorName"
              placeholder="editor name"
              type="text"
            />
          </div>
          <div>
            <TextField 
                name="year" 
                placeholder="year"
                type="number"
            />
          </div>
          <div>
            <TextField 
                name="category" 
                placeholder="category"
                type="text" 
            />
          </div>
          <Button type="submit">submit</Button>
          </Grid>
        </Form>
        )
    }}
    </Formik>
  );
};