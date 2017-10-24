import { handleActions } from 'redux-actions';
import moment from 'moment';

import * as actionTypes from '../consts/actionTypes';
import { dateFormat } from '../consts/dateTypes';
import { defaultBaseCurrency, defaultComparedCurrency } from '../consts/currencyTypes';

const initialState = {
    apiKey: null,
    values: {},
    isLoading: false,
    isLoadError: false,
    pickedDate: null,
    pickedBaseCurrency: defaultBaseCurrency,
    pickedComparedCurrency: defaultComparedCurrency
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
    [actionTypes.LOAD_EXCHANGE_RATES_SUCCESS]: (state, action) => {
        const formattedDate = moment.unix(action.payload.timestamp).format(dateFormat);

        return {
            ...state,
            isLoading: false,
            values: {
                ...state.value,
                [formattedDate]: action.payload
            },
            pickedDate: formattedDate,
            pickedBaseCurrency: defaultBaseCurrency,
            pickedComparedCurrency: defaultComparedCurrency
        };
    },
    [actionTypes.LOAD_EXCHANGE_RATES_FAILURE]: (state) => ({
        ...state,
        isLoading: false,
        isLoadError: true
    }),
    [actionTypes.CHANGE_EXCHANGE_RATES_API_KEY]: (state, action) => ({
        ...state,
        apiKey: action.payload
    }),
    [actionTypes.CHANGE_EXCHANGE_RATES_PICKED_BASE_CURRENCY]: (state, action) => ({
        ...state,
        pickedBaseCurrency: action.payload
    }),
    [actionTypes.CHANGE_EXCHANGE_RATES_PICKED_COMPARED_CURRENCY]: (state, action) => ({
        ...state,
        pickedComparedCurrency: action.payload
    }),
    [actionTypes.LOGOUT]: () => ({
        ...initialState
    })
}, initialState);
