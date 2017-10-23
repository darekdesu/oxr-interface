import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import exchangeRates from '../reducers/exchangeRates';

const reducers = combineReducers({
    exchangeRates
});

const configureStore = () => {
    const middlewares = [thunk];

    if (process.env.NODE_ENV === 'development') {
        const { createLogger } = require('redux-logger'); // eslint-disable-line global-require
        middlewares.push(createLogger());
    }

    return createStore(
        reducers,
        applyMiddleware(...middlewares)
    );
};

export default configureStore;
