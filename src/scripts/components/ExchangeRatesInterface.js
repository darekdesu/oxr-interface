import React, { Component } from 'react';
import { Container, Grid, Header, Dropdown, Input, Icon, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { moneyFormat } from '../utils/currency';

export default class ExchangeRatesInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseCurrencyValue: 100,
            comparedCurrencyValue: moneyFormat(100 * this.getExchangeRateValueForPickedDateAndComparedCurrency())
        };

        this.handleChangeComparedCurrency = this.handleChangeComparedCurrency.bind(this);
        this.handleChangeBaseCurrencyValue = this.handleChangeBaseCurrencyValue.bind(this);
        this.handleChangeComparedCurrencyValue = this.handleChangeComparedCurrencyValue.bind(this);
    }

    getExchangeRatesForPickedDate() {
        return this.props.exchangeRates.values[this.props.exchangeRates.pickedDate];
    }

    getExchangeRateValueForPickedDateAndComparedCurrency() {
        return this.getExchangeRatesForPickedDate().rates[this.props.exchangeRates.pickedComparedCurrency];
    }

    handleChangeComparedCurrency(event, { value }) {
        return Promise.resolve()
            .then(() => this.props.changeComparedCurrency(value))
            .then(() => this.setState({
                baseCurrencyValue: this.state.baseCurrencyValue,
                comparedCurrencyValue: moneyFormat(this.state.baseCurrencyValue * this.getExchangeRateValueForPickedDateAndComparedCurrency())
            }));
    }

    handleChangeBaseCurrencyValue(event, { value }) {
        return this.setState({
            baseCurrencyValue: value,
            comparedCurrencyValue: moneyFormat(value * this.getExchangeRateValueForPickedDateAndComparedCurrency())
        });
    }

    handleChangeComparedCurrencyValue(event, { value }) {
        return this.setState({
            baseCurrencyValue: moneyFormat(value / this.getExchangeRateValueForPickedDateAndComparedCurrency()),
            comparedCurrencyValue: value
        });
    }

    render() {
        const { exchangeRates } = this.props;
        const comparedCurrencyOptions = Object
            .keys(this.getExchangeRatesForPickedDate().rates)
            .map((rateKey) => ({
                key: rateKey,
                value: rateKey,
                text: rateKey
            }));

        return (
            <div className="exchange-rates-interface">
                <Container>
                    <Header as="h2" textAlign="center">
                        Interfejs Open Exchange Rates
                    </Header>

                    <Segment stacked>
                        <Grid textAlign="center">
                            <Grid.Column>
                                Wybrana data: {moment(exchangeRates.pickedDate).locale('PL').format('LL')}
                            </Grid.Column>
                        </Grid>

                        <Grid textAlign="center" verticalAlign="middle">
                            <Grid.Column mobile={3} textAlign="right">
                                USD
                            </Grid.Column>
                            <Grid.Column mobile={1}>
                                na
                            </Grid.Column>
                            <Grid.Column mobile={3}>
                                <Dropdown
                                    selection
                                    search
                                    placeholder="Wybierz walutę"
                                    defaultValue={exchangeRates.pickedComparedCurrency}
                                    options={comparedCurrencyOptions}
                                    onChange={this.handleChangeComparedCurrency}
                                />
                            </Grid.Column>
                        </Grid>

                        <Grid textAlign="center">
                            <Grid.Column>
                                Kurs wymiany: {this.getExchangeRateValueForPickedDateAndComparedCurrency()}
                            </Grid.Column>
                        </Grid>

                        <Grid textAlign="center" verticalAlign="middle">
                            <Grid.Column mobile={4}>
                                <Input
                                    label={{ content: exchangeRates.pickedBaseCurrency }}
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
                                    label={{ content: exchangeRates.pickedComparedCurrency }}
                                    labelPosition="right"
                                    placeholder=""
                                    onChange={this.handleChangeComparedCurrencyValue}
                                    value={this.state.comparedCurrencyValue}
                                />
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Container>
            </div>
        );
    }
}

ExchangeRatesInterface.propTypes = {
    exchangeRates: PropTypes.shape({
        apiKey: PropTypes.string.isRequired,
        values: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isLoadError: PropTypes.bool.isRequired,
        pickedDate: PropTypes.string.isRequired,
        pickedBaseCurrency: PropTypes.string.isRequired,
        pickedComparedCurrency: PropTypes.string.isRequired
    }).isRequired,
    changeComparedCurrency: PropTypes.func.isRequired
};
