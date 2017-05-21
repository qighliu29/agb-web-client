import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import agbApp from '../reducers';
import App from './app';

const store = createStore(
    agbApp,
    applyMiddleware(thunk)
);

const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default Root;