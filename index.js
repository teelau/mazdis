import { AppRegistry } from 'react-native';
import React from 'react';
import Main from './src/main';
import rootReducer from './src/reducers/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

let store = createStore(rootReducer, applyMiddleware(thunk, logger));

const App = () => (
    <Provider store={store}>
        <Main />
    </Provider>
);

AppRegistry.registerComponent('Mazdis', () => App);
