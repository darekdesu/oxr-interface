import React, { Component } from 'react';
import { Grid, Dropdown, Input, Icon, Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { moneyFormat } from '../utils/currency';
import { defaultBaseCurrency } from '../consts/currencyTypes';

export default class ExchangeRatesCurrencyCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseCurrencyValue: 100,
            comparedCurrencyValue: moneyFormat(100 * this.props.exchangeRateValue)
        };

        this.handleChangeComparedCurrency = this.handleChangeComparedCurrency.bind(this);
        this.handleChangeBaseCurrencyValue = this.handleChangeBaseCurrencyValue.bind(this);
        this.handleChangeComparedCurrencyValue = this.handleChangeComparedCurrencyValue.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const isExchangeRateValueChanged = nextProps.exchangeRateValue !== this.props.exchangeRateValue;

        if (isExchangeRateValueChanged) {
            return this.setState({
                baseCurrencyValue: this.state.baseCurrencyValue,
                comparedCurrencyValue: moneyFormat(this.state.baseCurrencyValue * nextProps.exchangeRateValue)
            });
        }

        return true;
    }

    handleChangeComparedCurrency(event, { value }) {
        return this.props.onChangeComparedCurrency(value);
    }

    handleChangeBaseCurrencyValue(event, { value }) {
        return this.setState({
            baseCurrencyValue: value,
            comparedCurrencyValue: moneyFormat(value * this.props.exchangeRateValue)
        });
    }

    handleChangeComparedCurrencyValue(event, { value }) {
        return this.setState({
            baseCurrencyValue: moneyFormat(value / this.props.exchangeRateValue),
            comparedCurrencyValue: value
        });
    }

    render() {
        const {
            isLoading,
            pickedBaseCurrency,
            pickedComparedCurrency,
            availableCurrencyRates,
            exchangeRateValue
        } = this.props;

        const availableCurrencyRatesOptions = availableCurrencyRates.map((rateKey) => ({
            key: rateKey,
            value: rateKey,
            text: rateKey,
            content: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={`currency-flag currency-flag-${rateKey.toLowerCase()}`}/>
                    <span style={{ marginLeft: '1em' }}>{rateKey}</span>
                </div>
            )
        }));

        return (
            <Segment
                stacked
                color="blue"
                disabled={isLoading}
                loading={isLoading}
            >
                <Header as="h3">
                    Kalkulator walut dla wybranej daty
                </Header>

                <Grid textAlign="center" verticalAlign="middle">
                    <Grid.Column mobile={5} textAlign="right">
                        <Icon name={defaultBaseCurrency.toLowerCase()}/> {defaultBaseCurrency}
                    </Grid.Column>
                    <Grid.Column mobile={1}>
                        na
                    </Grid.Column>
                    <Grid.Column mobile={5} textAlign="left">
                        <Dropdown
                            selection
                            search
                            placeholder="Wybierz walutę"
                            value={pickedComparedCurrency}
                            options={availableCurrencyRatesOptions}
                            onChange={this.handleChangeComparedCurrency}
                        />
                    </Grid.Column>
                </Grid>

                <Grid textAlign="center">
                    <Grid.Column>
                        <Header as="h4">
                            Kurs wymiany: {exchangeRateValue}
                        </Header>
                    </Grid.Column>
                </Grid>

                <Grid textAlign="center" verticalAlign="middle">
                    <Grid.Column mobile={4}>
                        <Input
                            label={{ content: pickedBaseCurrency }}
                            labelPosition="right"
                            placeholder=""
                            onChange={this.handleChangeBaseCurrencyValue}
                            value={this.state.baseCurrencyValue}
                        />
                    </Grid.Column>
                    <Grid.Column mobile={2}>
                        <Icon name="exchange" size="big"/>
                    </Grid.Column>
                    <Grid.Column mobile={4}>
                        <Input
                            label={{ content: pickedComparedCurrency }}
                            labelPosition="right"
                            placeholder=""
                            onChange={this.handleChangeComparedCurrencyValue}
                            value={this.state.comparedCurrencyValue}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}

ExchangeRatesCurrencyCalculator.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    pickedBaseCurrency: PropTypes.string.isRequired,
    pickedComparedCurrency: PropTypes.string.isRequired,
    availableCurrencyRates: PropTypes.array.isRequired,
    exchangeRateValue: PropTypes.number.isRequired,
    onChangeComparedCurrency: PropTypes.func.isRequired
};
