import { createAction } from 'redux-actions';

import reducer from './exchangeRates';
import * as actionTypes from '../consts/actionTypes';

describe('exchangeRates reducer', () => {
    it('should return the initial state', () =>
        expect(reducer(undefined, createAction('OTHER_ACTION')())).toEqual({
            apiKey: null,
            values: {},
            isLoading: false,
            isLoadError: false
        }));
    it('should set isLoading and unset isLoadError on LOAD_EXCHANGE_RATES_REQUEST', () => {
        const previousState = {
            anotherField: 'test-data',
            isLoading: false,
            isLoadError: true
        };

        const expectedState = {
            anotherField: 'test-data',
            isLoading: true,
            isLoadError: false
        };

        expect(reducer(previousState, createAction(actionTypes.LOAD_EXCHANGE_RATES_REQUEST)())).toEqual(expectedState);
    });

    it('should set value and unset isLoading on LOAD_EXCHANGE_RATES_SUCCESS', () => {
        const previousState = {
            anotherField: 'test-data',
            values: {},
            isLoading: true
        };

        const actionPayload = {
            disclaimer: 'Usage subject to terms: https://openexchangerates.org/terms',
            license: 'https://openexchangerates.org/license',
            timestamp: 946746000,
            base: 'USD',
            rates: {
                EUR: 0.760345,
                GBP: 0.509744
            }
        };

        const expectedState = {
            anotherField: 'test-data',
            values: {
                '2000-01-01': {
                    disclaimer: 'Usage subject to terms: https://openexchangerates.org/terms',
                    license: 'https://openexchangerates.org/license',
                    timestamp: 946746000,
                    base: 'USD',
                    rates: {
                        EUR: 0.760345,
                        GBP: 0.509744
                    }
                }
            },
            isLoading: false
        };

        expect(reducer(previousState, createAction(actionTypes.LOAD_EXCHANGE_RATES_SUCCESS)(actionPayload))).toEqual(expectedState);
    });

    it('should unset isLoading and set isLoadError on LOAD_EXCHANGE_RATES_FAILURE', () => {
        const previousState = {
            anotherField: 'test-data',
            isLoading: true,
            isLoadError: false
        };

        const expectedState = {
            anotherField: 'test-data',
            isLoading: false,
            isLoadError: true
        };

        expect(reducer(previousState, createAction(actionTypes.LOAD_EXCHANGE_RATES_FAILURE)())).toEqual(expectedState);
    });

    it('should set apiKey CHANGE_EXCHANGE_RATES_API_KEY', () => {
        const previousState = {
            anotherField: 'test-data',
            apiKey: null
        };

        const actionPayload = '1234-abcd-some-key';

        const expectedState = {
            anotherField: 'test-data',
            apiKey: '1234-abcd-some-key'
        };

        expect(reducer(previousState, createAction(actionTypes.CHANGE_EXCHANGE_RATES_API_KEY)(actionPayload))).toEqual(expectedState);
    });
});
