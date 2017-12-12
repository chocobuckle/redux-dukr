import React from 'react';
import ReactDOM from 'react-dom';
import getRoutes from 'config/routes';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import { injectGlobal } from 'styled-components';
import * as reducers from 'ducks';
import { checkIfAuthed } from 'helpers/auth';
import { hashHistory } from 'react-router';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: sans-serif;
    color: #5F5F5F;
  }
`;

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({...reducers, routing: routerReducer}),
  composeEnhancers(applyMiddleware(thunk))
);

const history = syncHistoryWithStore(hashHistory, store);

function checkAuth(nextState, replace) {
  if (store.getState().users.isFetching === true) {
    return;
  }

  const isAuthed = checkIfAuthed(store);
  const nextPathName = nextState.location.pathname;
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed');
    }
  } else if (isAuthed !== true) {
    replace('/auth');
  }
}

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth, history)}
  </Provider>,
document.getElementById('app'));
