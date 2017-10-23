import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'babel-polyfill';
import 'whatwg-fetch';
import '../styles/index.scss';

import AppWrapper from './containers/AppWrapper';

import configureStore from './store';
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <AppWrapper/>
    </Provider>,
    document.getElementById('oxr-app')
);
