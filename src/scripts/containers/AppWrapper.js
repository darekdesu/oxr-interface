import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from '../components/App';

import * as commonActions from '../actions/common';
import * as exchangeRatesActions from '../actions/exchangeRates';

class AppWrapper extends Component {
    render() {
        return (
            <App {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => ({
    exchangeRates: state.exchangeRates
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        ...bindActionCreators(commonActions, dispatch),
        ...bindActionCreators(exchangeRatesActions, dispatch)
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppWrapper);
