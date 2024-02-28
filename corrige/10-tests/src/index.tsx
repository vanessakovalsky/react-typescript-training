import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer from "./store/reducer";
import { AppProvider } from './context';

const store = configureStore<GameState, GameAction>({
  reducer})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> -> REDUX*/}
    <AppProvider>
      <App />
    </AppProvider>
    {/* </Provider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();