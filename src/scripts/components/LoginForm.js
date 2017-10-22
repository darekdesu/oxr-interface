import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

export default class LoginForm extends Component {
    render() {
        return (
            <div className="login-form">
                <Grid textAlign="center">
                    <Grid.Column mobile={16} tablet={8} computer={6}>
                        <Header as="h2" textAlign="center">
                            Logowanie do Open Exchange Rates
                        </Header>
                        <Form size="large">
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon="privacy"
                                    iconPosition="left"
                                    placeholder="Podaj swój klucz API"
                                />
                                <Button primary fluid size="large">Zaloguj</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
