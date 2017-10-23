import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';

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
        const { exchangeRates } = this.props;
        const showExchangeRatesInterface = Object.keys(exchangeRates.values).length > 0;

        return (
            <div>
                {!showExchangeRatesInterface && <LoginForm
                    isLoading={exchangeRates.isLoading}
                    isLoadError={exchangeRates.isLoadError}
                    onSubmit={this.handleLoginFormSubmit}
                />}
                {showExchangeRatesInterface && 'Tutaj będzie panel dostęony po zalogowaniu się.'}
            </div>
        );
    }
}

App.propTypes = {
    exchangeRates: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
};
