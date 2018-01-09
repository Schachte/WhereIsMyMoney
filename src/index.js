import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { configureStore } from './configuration/store';
import { Router, Route } from 'react-router';
import App from './app';

const store = configureStore();
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>
      , rootElement);
  });
}
