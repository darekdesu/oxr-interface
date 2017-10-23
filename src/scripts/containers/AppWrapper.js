import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from '../components/App';

import * as exchangeRates from '../actions/exchangeRates';

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
        ...bindActionCreators(exchangeRates, dispatch)
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppWrapper);
