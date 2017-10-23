import * as httpClient from '../utils/httpClient';

export const getLatestExchangeRates = (apiKey) => httpClient.get(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`);

export const getHistoricalExchangeRates = (apiKey, date) => httpClient.get(`https://openexchangerates.org/api/historical/${date}.json?app_id=${apiKey}`);
