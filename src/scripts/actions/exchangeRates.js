import { createAction } from 'redux-actions';
import moment from 'moment';

import { getLatestExchangeRates, getHistoricalExchangeRates } from '../utils/oxrApiService';
import * as actionTypes from '../consts/actionTypes';
import { dateFormat } from '../consts/dateTypes';

const changeExchangeRatesApiKey = createAction(actionTypes.CHANGE_EXCHANGE_RATES_API_KEY);
const loadExchangeRatesRequest = createAction(actionTypes.LOAD_EXCHANGE_RATES_REQUEST);
const loadExchangeRatesSuccess = createAction(actionTypes.LOAD_EXCHANGE_RATES_SUCCESS);
const loadExchangeRatesFailure = createAction(actionTypes.LOAD_EXCHANGE_RATES_FAILURE);

const getExchangeRates = (date = null) => (dispatch, getStore) =>
    Promise.resolve()
        .then(() => dispatch(loadExchangeRatesRequest()))
        .then(() => {
            const givenDate = date ? moment(date).format(dateFormat) : moment().format(dateFormat);
            const currentDate = moment().format(dateFormat);
            const isGivenDateHistorical = moment(givenDate).diff(moment(currentDate)) < 0;

            const currentState = getStore();
            const exchangeRatesApiKey = currentState.exchangeRates.apiKey;
            const exchangeRateValues = currentState.exchangeRates.values;
            const isExchangeRatesGivenDateInStore = exchangeRateValues[givenDate] !== undefined;

            if (isGivenDateHistorical && isExchangeRatesGivenDateInStore) {
                return exchangeRateValues[givenDate];
            }

            if (isGivenDateHistorical) {
                return getHistoricalExchangeRates(exchangeRatesApiKey, date);
            }

            return getLatestExchangeRates(exchangeRatesApiKey);
        })
        .then((data) => dispatch(loadExchangeRatesSuccess(data)))
        .catch(() => dispatch(loadExchangeRatesFailure()));

export {
    changeExchangeRatesApiKey,
    getExchangeRates
};
