import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Base Url
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3400/api/v1' : '/api/v1';
const rootReducer = combineReducers({
  auth: authReducer
});

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
