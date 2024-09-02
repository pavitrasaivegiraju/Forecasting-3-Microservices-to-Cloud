import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App, Requirement1, Requirement2, Requirement3, Requirement4, Requirement5, Requirement6, Requirement8_1,
Requirement8_2, Requirement8_3, Requirement8_4, Requirement8_5, Requirement8_6, Requirement8_7, Requirement8_8, Requirement8_9, Requirement8_10} from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Requirement1/>
    <Requirement2/>
    <Requirement3/>
    <Requirement4/>
    <Requirement5/>
    <Requirement6/>
    <h1>LSTM, StatsModel and Prophet Forecasting</h1>
    <Requirement8_1/>
    <Requirement8_2/>
    <Requirement8_3/>
    <Requirement8_4/>
    <Requirement8_5/>
    <Requirement8_6/>
    <Requirement8_7/>
    <Requirement8_8/>
    <Requirement8_9/>
    <Requirement8_10/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
