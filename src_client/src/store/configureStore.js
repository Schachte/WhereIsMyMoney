import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState){
  // Use redux dev tools if available, otherwise use default composition;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  ));

  return store;
}
