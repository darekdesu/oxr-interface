import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ExchangeRatesHeader from './ExchangeRatesHeader';
import ExchangeRatesDatePicker from './ExchangeRatesDatePicker';
import ExchangeRatesCurrencyCalculator from './ExchangeRatesCurrencyCalculator';
import ExchangeRatesCurrencyChart from './ExchangeRatesCurrencyChart';

export default class ExchangeRatesComposer extends Component {
    getExchangeRatesForPickedDate() {
        return this.props.exchangeRates.values[this.props.exchangeRates.pickedDate].rates;
    }

    getAvailableCurrenciesRatesListForPickedDate() {
        return Object.keys(this.getExchangeRatesForPickedDate());
    }

    getExchangeRateValueForPickedDateAndComparedCurrency() {
        return this.getExchangeRatesForPickedDate()[this.props.exchangeRates.pickedComparedCurrency];
    }

    render() {
        const {
            exchangeRates,
            onChangeComparedCurrency,
            onChangeDate,
            onLogout
        } = this.props;

        return (
            <div className="exchange-rates-composer">
                <Container>
                    <ExchangeRatesHeader onLogout={onLogout}/>

                    <ExchangeRatesDatePicker
                        isLoading={exchangeRates.isLoading}
                        pickedDate={exchangeRates.pickedDate}
                        onChange={onChangeDate}
                    />

                    <ExchangeRatesCurrencyCalculator
                        isLoading={exchangeRates.isLoading}
                        pickedBaseCurrency={exchangeRates.pickedBaseCurrency}
                        pickedComparedCurrency={exchangeRates.pickedComparedCurrency}
                        onChangeComparedCurrency={onChangeComparedCurrency}
                        availableCurrencyRates={this.getAvailableCurrenciesRatesListForPickedDate()}
                        exchangeRateValue={this.getExchangeRateValueForPickedDateAndComparedCurrency()}
                    />

                    <ExchangeRatesCurrencyChart
                        isLoading={exchangeRates.isLoading}
                        currencyRates={this.getExchangeRatesForPickedDate()}
                    />
                </Container>
            </div>
        );
    }
}

ExchangeRatesComposer.propTypes = {
    exchangeRates: PropTypes.shape({
        apiKey: PropTypes.string.isRequired,
        values: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isLoadError: PropTypes.bool.isRequired,
        pickedDate: PropTypes.string.isRequired,
        pickedBaseCurrency: PropTypes.string.isRequired,
        pickedComparedCurrency: PropTypes.string.isRequired
    }).isRequired,
    onChangeComparedCurrency: PropTypes.func.isRequired,
    onChangeDate: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
};
