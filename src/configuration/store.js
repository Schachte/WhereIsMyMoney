import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export function configureStore(){
  // Use redux dev tools if available, otherwise use default composition;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
  ));

  return store;
}
