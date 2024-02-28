import React from 'react'
import {render, screen, waitFor, fireEvent, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GameForm from '../components/GameForm'

test('rendering and submitting a basic Formik form', async () => {
    const mock = jest.fn();
    const gameForm = render(<GameForm />)

    const nomDuJeu = await waitFor(() => screen.getByTestId('inputNomDuJeu'));
    const button = await waitFor(() => screen.getByTestId('submitAjoutJeu'));

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