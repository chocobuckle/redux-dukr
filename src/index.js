import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from 'ducks';
import './index.css';
import App from './App';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const storeWithHMREnabled = createStore(
    combineReducers({...reducers}),
    composeEnhancers(applyMiddleware(thunk))
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./ducks', () => {
        storeWithHMREnabled.replaceReducer(combineReducers({...reducers}));
      });
    }
  }

  return storeWithHMREnabled;
};

export const store = configureStore();

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      rootEl
    );
  });
}
