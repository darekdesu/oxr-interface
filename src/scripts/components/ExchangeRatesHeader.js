import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Grid, Button } from 'semantic-ui-react';

export default class ExchangeRatesHeader extends Component {
    constructor(props) {
        super(props);

        this.handleClickLogout = this.handleClickLogout.bind(this);
    }

    handleClickLogout() {
        return this.props.onLogout();
    }

    render() {
        return ([
            <Grid key={1}>
                <Grid.Column mobile={8}>
                    <Header as="h1">
                        Konwerter walut
                    </Header>
                </Grid.Column>
                <Grid.Column mobile={8} textAlign="right">
                    <Button primary size="large" onClick={this.handleClickLogout}>Wyloguj</Button>
                </Grid.Column>
            </Grid>,
            <Divider key={2}/>
        ]);
    }
}

ExchangeRatesHeader.propTypes = {
    onLogout: PropTypes.func.isRequired
};
