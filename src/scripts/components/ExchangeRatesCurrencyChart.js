import React, { Component } from 'react';
import { Segment, Header, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { defaultChartCurrencies } from '../consts/currencyTypes';

export default class ExchangeRatesCurrencyChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedCurrencies: defaultChartCurrencies
        };

        this.handleChangePickedCurrencies = this.handleChangePickedCurrencies.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const isCurrencyRatesChanged = nextProps.currencyRates !== this.props.currencyRates;

        if (isCurrencyRatesChanged) {
            return this.setState({
                pickedCurrencies: defaultChartCurrencies
            });
        }

        return true;
    }

    handleChangePickedCurrencies(event, { value }) {
        return this.setState({ pickedCurrencies: value });
    }

    render() {
        const { isLoading, currencyRates } = this.props;
        const { pickedCurrencies } = this.state;

        const pickCurrenciesOptions = Object
            .keys(currencyRates)
            .map((rateKey) => ({
                key: rateKey,
                text: rateKey,
                value: rateKey,
                content: (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={`currency-flag currency-flag-${rateKey.toLowerCase()}`}/>
                        <span style={{ marginLeft: '1em' }}>{rateKey}</span>
                    </div>
                )
            }));

        const barChartData = pickedCurrencies
            .map((pickedCurrency) => ({
                name: pickedCurrency,
                rate: currencyRates[pickedCurrency]
            }));

        return (
            <Segment
                stacked
                color="blue"
                disabled={isLoading}
                loading={isLoading}
            >
                <Header as="h3">
                    Wykres kursu wymiany względem wartości USD dla wybranej daty
                </Header>

                <Dropdown
                    placeholder="Wybierz waluty do porównania na wykresie"
                    fluid
                    multiple
                    selection
                    search
                    options={pickCurrenciesOptions}
                    onChange={this.handleChangePickedCurrencies}
                    value={pickedCurrencies}
                />

                <BarChart
                    width={800}
                    height={300}
                    data={barChartData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5
                    }}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="rate" fill="#8884d8"/>
                </BarChart>
            </Segment>
        );
    }
}

ExchangeRatesCurrencyChart.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    currencyRates: PropTypes.object.isRequired
};
