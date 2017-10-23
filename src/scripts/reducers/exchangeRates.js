import { handleActions } from 'redux-actions';
import moment from 'moment';

import * as actionTypes from '../consts/actionTypes';
import { dateFormat } from '../consts/dateTypes';

const initialState = {
    apiKey: null,
    values: {},
    isLoading: false,
    isLoadError: false
};

export default handleActions({
    [actionTypes.CHANGE_EXCHANGE_RATES_API_KEY]: (state, action) => ({
        ...state,
        apiKey: action.payload
    }),
    [actionTypes.LOAD_EXCHANGE_RATES_REQUEST]: (state) => ({
        ...state,
        isLoading: true,
        isLoadError: false
    }),
    [actionTypes.LOAD_EXCHANGE_RATES_SUCCESS]: (state, action) => ({
        ...state,
        isLoading: false,
        values: {
            ...state.value,
            [moment.unix(action.payload.timestamp).format(dateFormat)]: action.payload
        }
    }),
    [actionTypes.LOAD_EXCHANGE_RATES_FAILURE]: (state) => ({
        ...state,
        isLoading: false,
        isLoadError: true
    }),
    [actionTypes.CHANGE_EXCHANGE_RATES_API_KEY]: (state, action) => ({
        ...state,
        apiKey: action.payload
    })
}, initialState);
