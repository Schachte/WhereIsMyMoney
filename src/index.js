/* eslint-disable no-console */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import {loadBudgets} from './actions/budgetActions';
import './styles/styles.css';
import './styles/vendor/bootstrap/css/bootstrap.min.css';
import './styles/vendor/font-awesome/css/font-awesome.min.css';
import './styles/vendor/datatables/dataTables.bootstrap4.css';
import './styles/sb-admin.css';

const store = configureStore();
store.dispatch(loadBudgets());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
