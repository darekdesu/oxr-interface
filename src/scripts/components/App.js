import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';
import ExchangeRatesComposer from './ExchangeRatesComposer';
import Credentials from './Credentials';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
    }

    handleLoginFormSubmit(apiKey) {
        return Promise.resolve()
            .then(() => this.props.actions.changeExchangeRatesApiKey(apiKey))
            .then(() => this.props.actions.getExchangeRates());
    }

    render() {
        const { exchangeRates, actions } = this.props;
        const exchangeRatesValuesList = Object.keys(exchangeRates.values);

        const showLoginForm = exchangeRatesValuesList.length === 0;
        const showExchangeRatesComposer = exchangeRatesValuesList.length > 0;

        return (
            <div>
                {showLoginForm && <LoginForm
                    isLoading={exchangeRates.isLoading}
                    isLoadError={exchangeRates.isLoadError}
                    onSubmit={this.handleLoginFormSubmit}
                />}
                {showExchangeRatesComposer && <ExchangeRatesComposer
                    exchangeRates={exchangeRates}
                    onChangeComparedCurrency={actions.changeExchangeRatesPickedComparedCurrency}
                    onChangeDate={actions.getExchangeRates}
                    onLogout={actions.logout}
                />}

                <Credentials/>
            </div>
        );
    }
}

App.propTypes = {
    exchangeRates: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
};
